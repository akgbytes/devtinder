import { logger } from "@/config/logger";
import { ConnectionRequest } from "@/models/connectionRequest.model";
import { Skill } from "@/models/skill.model";
import { User } from "@/models/user.model";
import { FeedCursor, FullUser } from "@/types";
import { getCache, setCache } from "@/utils/cache";
import { ConnectionRequestStatus } from "@/utils/constants";
import { setAuthCookies } from "@/utils/cookies";
import {
  ApiError,
  ApiResponse,
  asyncHandler,
  handleZodError,
} from "@/utils/core";
import { getGeocodes } from "@/utils/google-maps";
import { generateHash, validateObjectId } from "@/utils/helper";
import { generateAccessToken, generateRefreshToken } from "@/utils/token";
import {
  validateAbout,
  validateCompleteProfile,
  validateProfilePicture,
  validateSkills,
} from "@/validations/user.validations";
import { LatLngLiteral } from "@googlemaps/google-maps-services-js";

import { StatusCodes } from "http-status-codes";
import mongoose, { Types } from "mongoose";

export const completeProfile = asyncHandler(async (req, res) => {
  const {
    email,
    name,
    about,
    profilePicture,
    location,
    dateOfBirth,
    gender,
    skills,
  } = handleZodError(validateCompleteProfile(req.body));

  logger.info("Profile completion attempt", { email });

  // Find user
  const user = await User.findOne({ email });
  if (!user) {
    logger.warn("Profile completion failed - user not found", { email });
    throw new ApiError(
      StatusCodes.NOT_FOUND,
      "No account found with this email address. Please register first."
    );
  }

  // Check if email is verified
  if (!user.isEmailVerified) {
    logger.warn("Profile completion failed - email not verified", {
      userId: user._id,
    });
    throw new ApiError(
      StatusCodes.FORBIDDEN,
      "Please verify your email before completing your profile"
    );
  }

  // Check if onboarding already completed
  if (user.onboardingCompleted) {
    logger.info("Profile already completed", { userId: user._id });
    throw new ApiError(
      StatusCodes.BAD_REQUEST,
      "Your profile has already been completed"
    );
  }

  // Validate skills exist (if provided)
  const validatedSkills = skills.map((skill) => {
    validateObjectId(skill._id, "Skill");
    return skill._id as unknown as Types.ObjectId;
  });

  // Verify that skill IDs actually exist in the Skills collection
  const existingSkills = await Skill.find({ _id: { $in: validatedSkills } });
  console.log("exist", existingSkills);
  if (existingSkills.length !== validatedSkills.length) {
    throw new ApiError(
      StatusCodes.BAD_REQUEST,
      "One or more skill IDs are invalid"
    );
  }

  // Can i do something to check if place_id exists in redis if not then it means it is not valid place_id bcuz it must be store in redis as it was returned from there, it can save geoocodes api calls

  // Get geocoding coordinates
  let geocodes: LatLngLiteral | undefined;
  const cacheKey = `geocodes:${location.placeId}`;

  // Check cache first
  const cached = await getCache<LatLngLiteral>(cacheKey);

  if (cached) {
    logger.info("Geocodes cache hit", { placeId: location.placeId });
    geocodes = cached;
  } else {
    logger.info("Geocodes cache miss", { placeId: location.placeId });
    geocodes = await getGeocodes(location.placeId);

    if (!geocodes) {
      logger.error("Invalid geocodes received", {
        placeId: location.placeId,
        geocodes,
      });
      throw new ApiError(
        StatusCodes.BAD_REQUEST,
        "The selected location is invalid. Please choose a different location."
      );
    }

    // Store cache
    await setCache(cacheKey, geocodes);
    logger.info("Geocodes cached", { placeId: location.placeId });
  }

  // Update user profile
  const session = await User.startSession();
  session.startTransaction();
  try {
    user.name = name;
    user.about = about;
    user.skills = validatedSkills;
    user.profilePicture = profilePicture;
    user.gender = gender;
    user.dateOfBirth = new Date(dateOfBirth);
    user.location = {
      city: location.city,
      state: location.state,
      country: location.country,
      coords: {
        type: "Point",
        coordinates: [Number(geocodes.lng), Number(geocodes.lat)],
      },
    };
    user.onboardingCompleted = true;

    // Generate auth tokens
    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);

    // Save user
    user.refreshToken = generateHash(refreshToken);
    await user.save({ session });
    await session.commitTransaction();

    logger.info("Profile completed successfully", { userId: user._id });

    // Set auth cookies
    setAuthCookies(res, accessToken, refreshToken);

    const response = new ApiResponse(
      StatusCodes.OK,
      "Profile completed successfully! Welcome aboard",
      user
    );

    return res.status(response.statusCode).json(response);
  } catch (error) {
    await session.abortTransaction();
    logger.error("Profile completion failed", {
      userId: user._id,
      error: error instanceof Error ? error.message : "Unknown error",
    });
    throw error;
  } finally {
    session.endSession();
  }
});

export const getProfile = asyncHandler(async (req, res) => {
  const userId = req.user._id;

  logger.info("Profile fetch request", { userId });

  // Find user
  const user = await User.findById(userId).populate("skills");

  if (!user) {
    logger.error("User not found during profile fetch", { userId });
    throw new ApiError(StatusCodes.NOT_FOUND, "User profile not found");
  }

  logger.info("Profile fetched successfully", { userId });

  const response = new ApiResponse(
    StatusCodes.OK,
    "Profile retrieved successfully",
    user
  );

  res.status(response.statusCode).json(response);
});

export const updateProfilePicture = asyncHandler(async (req, res) => {
  const { profilePicture } = handleZodError(validateProfilePicture(req.body));

  const updatedUser = await User.findByIdAndUpdate(req.user._id, {
    profilePicture,
  });

  if (!updatedUser) {
  }

  const response = new ApiResponse(
    StatusCodes.OK,
    "Profile picture updated",
    updatedUser
  );

  res.status(response.statusCode).json(response);
});

export const updateSkills = asyncHandler(async (req, res) => {
  const { skills } = handleZodError(validateSkills(req.body));

  const updatedUser = await User.findByIdAndUpdate(req.user._id, {
    skills,
  });

  if (!updatedUser) {
  }

  const response = new ApiResponse(StatusCodes.OK, "Updated", updatedUser);

  res.status(response.statusCode).json(response);
});

export const updateAbout = asyncHandler(async (req, res) => {
  const { about } = handleZodError(validateAbout(req.body));

  const updatedUser = await User.findByIdAndUpdate(req.user._id, {
    about,
  });

  if (!updatedUser) {
  }

  const response = new ApiResponse(StatusCodes.OK, "Updated", updatedUser);

  res.status(response.statusCode).json(response);
});

export const getReceivedRequests = asyncHandler(async (req, res) => {
  const userId = req.user._id;

  logger.info("Fetching received connection requests", { userId });

  const requests = await ConnectionRequest.find({
    toUserId: userId,
    status: ConnectionRequestStatus.INTERESTED,
  })
    .populate("fromUserId")
    .sort({ createdAt: -1 });

  logger.info("Received requests fetched", {
    userId,
  });

  const formattedRequests = requests.map((request) => ({
    requestId: request._id,
    user: request.fromUserId,
  }));

  const response = new ApiResponse(
    StatusCodes.OK,
    "Connection requests retrieved successfully",
    formattedRequests
  );

  res.status(response.statusCode).json(response);
});

export const getConnections = asyncHandler(async (req, res) => {
  const userId = req.user._id;

  logger.info("Fetching connections", { userId });

  const connections = await ConnectionRequest.find({
    status: ConnectionRequestStatus.ACCEPTED,
    $or: [{ fromUserId: userId }, { toUserId: userId }],
  })
    .populate("fromUserId")
    .populate("toUserId")
    .sort({ updatedAt: -1 });

  logger.info("Connections fetched", {
    userId,
  });

  const set = new Set([
    ...connections.map((c: any) => c.fromUserId),
    ...connections.map((c: any) => c.toUserId),
  ] as unknown as FullUser[]);

  let currentUser = Array.from(set).find(
    (c) => c._id.toString() === userId.toString()
  );

  const uniqueUsers = Array.from(set).filter((u) => u._id !== currentUser?._id);

  const response = new ApiResponse(
    StatusCodes.OK,
    "Connections retrieved successfully",
    uniqueUsers
  );

  res.status(response.statusCode).json(response);
});

export const getUserFeed = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  const cursor = req.query.cursor
    ? JSON.parse(req.query.cursor as string)
    : null;
  let limit = parseInt(req.query.limit as string) || 20;
  limit = limit > 50 ? 50 : limit;

  logger.info("Fetching user feed", { userId, limit, cursor });

  // Get current user's full data
  const currentUser = await User.findById(userId).lean();
  if (!currentUser) {
    throw new ApiError(StatusCodes.NOT_FOUND, "User not found");
  }

  // Get all existing connections of user
  const existingConnections = await ConnectionRequest.find({
    $or: [{ fromUserId: userId }, { toUserId: userId }],
  }).select("fromUserId toUserId");

  // Exclude existing connections and user's self from feed
  const excludedUserIds = new Set([userId.toString()]);
  existingConnections.forEach((connection) => {
    excludedUserIds.add(connection.fromUserId.toString());
    excludedUserIds.add(connection.toUserId.toString());
  });

  const MATCH_WEIGHTS = {
    sharedSkills: 5,
    location: 50,
    ageRange: 10,
  };

  // Distance thresholds in km
  const DISTANCE_THRESHOLDS = {
    veryClose: 10,
    close: 50,
    moderate: 100,
    far: 500,
    veryFar: 1000,
  };

  // Pipeline for personalized feed
  const users = await User.aggregate([
    // Stage 1: Add geospatial distance calculation
    {
      $geoNear: {
        near: {
          type: "Point",
          coordinates: currentUser.location.coords.coordinates,
        },
        distanceField: "distance",
        maxDistance: 100_000_000, // in meters
        spherical: true,
        key: "location.coords",
      },
    },

    // Stage 2: Filter out excluded users and incomplete profiles
    {
      $match: {
        _id: {
          $nin: Array.from(excludedUserIds).map(
            (id) => new mongoose.Types.ObjectId(id)
          ),
        },
        onboardingCompleted: true,
        isEmailVerified: true,
      },
    },

    // Stage 3: Add fields for matching calculations
    {
      $addFields: {
        distanceKm: {
          $divide: ["$distance", 1000],
        },
        now: new Date(),
      },
    },

    // Stage 4: Calculate match score

    {
      $addFields: {
        matchScore: {
          $add: [
            // Shared Skills Score
            {
              $multiply: [
                {
                  $size: {
                    $setIntersection: ["$skills", currentUser.skills || []],
                  },
                },
              ],
            },

            // Location Proximity Score
            {
              $switch: {
                branches: [
                  {
                    case: {
                      $lte: ["$distanceKm", DISTANCE_THRESHOLDS.veryClose],
                    },
                    then: MATCH_WEIGHTS.location,
                  },
                  {
                    case: { $lte: ["$distanceKm", DISTANCE_THRESHOLDS.close] },
                    then: MATCH_WEIGHTS.location * 0.8,
                  },
                  {
                    case: {
                      $lte: ["$distanceKm", DISTANCE_THRESHOLDS.moderate],
                    },
                    then: MATCH_WEIGHTS.location * 0.6,
                  },
                  {
                    case: { $lte: ["$distanceKm", DISTANCE_THRESHOLDS.far] },
                    then: MATCH_WEIGHTS.location * 0.3,
                  },
                  {
                    case: {
                      $lte: ["$distanceKm", DISTANCE_THRESHOLDS.veryFar],
                    },
                    then: MATCH_WEIGHTS.location * 0.1,
                  },
                ],
                default: 0,
              },
            },

            // Age Range Score
            {
              $cond: {
                if: { $ne: ["$dateOfBirth", null] },
                then: {
                  $let: {
                    vars: {
                      userAge: {
                        $divide: [
                          {
                            $subtract: ["$now", "$dateOfBirth"],
                          },
                          31536000000, // milliseconds in a year
                        ],
                      },
                      currentUserAge: {
                        $divide: [
                          {
                            $subtract: [
                              new Date(),
                              currentUser.dateOfBirth || new Date(),
                            ],
                          },
                          31536000000,
                        ],
                      },
                    },
                    in: {
                      $switch: {
                        branches: [
                          {
                            case: {
                              $lte: [
                                {
                                  $abs: {
                                    $subtract: [
                                      "$$userAge",
                                      "$$currentUserAge",
                                    ],
                                  },
                                },
                                3,
                              ],
                            },
                            then: MATCH_WEIGHTS.ageRange, // 10 points for ±3 years
                          },
                          {
                            case: {
                              $lte: [
                                {
                                  $abs: {
                                    $subtract: [
                                      "$$userAge",
                                      "$$currentUserAge",
                                    ],
                                  },
                                },
                                5,
                              ],
                            },
                            then: MATCH_WEIGHTS.ageRange * 0.7, // 7 points for ±5 years
                          },
                          {
                            case: {
                              $lte: [
                                {
                                  $abs: {
                                    $subtract: [
                                      "$$userAge",
                                      "$$currentUserAge",
                                    ],
                                  },
                                },
                                10,
                              ],
                            },
                            then: MATCH_WEIGHTS.ageRange * 0.4, // 4 points for ±10 years
                          },
                        ],
                        default: 0,
                      },
                    },
                  },
                },
                else: 0,
              },
            },

            // Same location boost (city/state/country match)
            {
              $add: [
                {
                  $cond: [
                    {
                      $and: [
                        { $ne: ["$location.city", ""] },
                        { $eq: ["$location.city", currentUser.location.city] },
                      ],
                    },
                    15, // 15 bonus points for same city
                    0,
                  ],
                },
                {
                  $cond: [
                    {
                      $and: [
                        { $ne: ["$location.state", ""] },
                        {
                          $eq: ["$location.state", currentUser.location.state],
                        },
                      ],
                    },
                    10, // 10 bonus points for same state
                    0,
                  ],
                },
                {
                  $cond: [
                    {
                      $and: [
                        { $ne: ["$location.country", ""] },
                        {
                          $eq: [
                            "$location.country",
                            currentUser.location.country,
                          ],
                        },
                      ],
                    },
                    5, // 5 bonus points for same country
                    0,
                  ],
                },
              ],
            },
          ],
        },
      },
    },

    // Stage 5: Filter out users before cursor

    ...(cursor && mongoose.isValidObjectId(cursor._id)
      ? [
          {
            $match: {
              $or: [
                { matchScore: { $lt: cursor.matchScore } },
                {
                  matchScore: cursor.matchScore,
                  distanceKm: { $gt: cursor.distanceKm },
                },
                {
                  matchScore: cursor.matchScore,
                  distanceKm: cursor.distanceKm,
                  _id: { $gt: new mongoose.Types.ObjectId(cursor._id) },
                },
              ],
            },
          },
        ]
      : []),

    // Stage 6: Sort by match score
    {
      $sort: {
        matchScore: -1,
        distanceKm: 1,
        _id: 1,
      },
    },

    // Stage 7: Pagination
    { $limit: limit + 1 }, // +1 to determine hasMore

    // Stage 8: Project only safe fields
    {
      $project: {
        name: 1,
        email: 1,
        profilePicture: 1,
        about: 1,
        location: {
          city: 1,
          state: 1,
          country: 1,
        },
        gender: 1,
        skills: 1,
        createdAt: 1,
        dateOfBirth: 1,
        distanceKm: 1,
        matchScore: 1,
      },
    },

    // Stage 9: Populate skills
    {
      $lookup: {
        from: "skills",
        localField: "skills",
        foreignField: "_id",
        as: "skills",
      },
    },
  ]);

  const hasMore = users.length > limit;
  const usersToReturn = hasMore ? users.slice(0, limit) : users;
  const nextCursor = hasMore
    ? JSON.stringify({
        matchScore: usersToReturn[usersToReturn.length - 1].matchScore,
        distanceKm: usersToReturn[usersToReturn.length - 1].distanceKm,
        _id: usersToReturn[usersToReturn.length - 1]._id.toString(),
      })
    : null;

  console.log(users);

  const countResult = await User.aggregate([
    {
      $match: {
        _id: {
          $nin: Array.from(excludedUserIds).map(
            (id) => new mongoose.Types.ObjectId(id)
          ),
        },
        onboardingCompleted: true,
        isEmailVerified: true,
      },
    },
    { $count: "total" },
  ]);

  const total = countResult[0]?.total || 0;

  const response = new ApiResponse(
    StatusCodes.OK,
    "User feed retrieved successfully.",
    {
      users: usersToReturn,
      pagination: {
        cursor: nextCursor,
        limit,
        total,
        hasMore,
      },
    }
  );

  res.status(response.statusCode).json(response);
});
