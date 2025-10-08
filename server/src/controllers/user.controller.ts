import { logger } from "@/config/logger";
import { ConnectionRequest } from "@/models/connectionRequest.model";
import { User } from "@/models/user.model";
import { getCache, setCache } from "@/utils/cache";
import { onboardingSteps } from "@/utils/constants";
import { setAuthCookies } from "@/utils/cookies";
import {
  ApiError,
  ApiResponse,
  asyncHandler,
  handleZodError,
} from "@/utils/core";
import { getGeocodes } from "@/utils/google-maps";
import { validateObjectId } from "@/utils/helper";
import { validateCompleteProfile } from "@/validations/user.validations";
import { LatLngLiteral } from "@googlemaps/google-maps-services-js";

import { StatusCodes } from "http-status-codes";
import { ObjectId } from "mongoose";
import { Types } from "mongoose";

const SAFE_USER_DATA = [
  "-password",
  "-__v",
  "-createdAt",
  "-updatedAt",
  "-_id",
];

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
      "Please verify your email before completing your profile. Check your inbox for the verification code."
    );
  }

  // Check if onboarding already completed
  if (user.onboardingCompleted) {
    logger.info("Profile already completed", { userId: user._id });
    throw new ApiError(
      StatusCodes.BAD_REQUEST,
      "Your profile has already been completed. You can update it from your account settings."
    );
  }

  // Validate skills exist (if provided)
  const validatedSkills = skills.map((skill) => {
    validateObjectId(skill._id, "Skill");
    return skill._id as unknown as Types.ObjectId;
  });

  // TODO: Verify that skill IDs actually exist in the Skills collection
  // const existingSkills = await Skill.find({ _id: { $in: validatedSkills } });
  // if (existingSkills.length !== validatedSkills.length) {
  //   throw new ApiError(StatusCodes.BAD_REQUEST, "One or more skill IDs are invalid");
  // }

  // check if place_id exists in redis if not then it means it is not valid place_id bcuz it must be store in redis as it was returned from there

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

  // Update user profile in a transaction
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
      city: location.city || "",
      state: location.state || "",
      country: location.country || "",
      coords: {
        type: "Point",
        coordinates: [Number(geocodes.lng), Number(geocodes.lat)],
      },
    };

    // Mark onboarding as complete
    user.advanceOnboarding();
    const onboarding = user.getOnboardingProgress();

    // Save user
    await user.save({ session });
    await session.commitTransaction();

    logger.info("Profile completed successfully", { userId: user._id });

    // Generate auth tokens
    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();

    // Set auth cookies
    setAuthCookies(res, accessToken, refreshToken);

    const response = new ApiResponse(
      StatusCodes.OK,
      "Profile completed successfully! Welcome aboard. You're all set to start using the platform.",
      {
        user: {
          _id: user._id,
          name: user.name,
          email: user.email,
          isEmailVerified: user.isEmailVerified,
          about: user.about,
          profilePicture: user.profilePicture,
          location: user.location,
          dateOfBirth: user.dateOfBirth,
          gender: user.gender,
          skills: user.skills,
          createdAt: user.createdAt,
          updatedAt: user.updatedAt,
        },
        onboarding,
      }
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
  const userId = req.user?._id;

  const user = await User.findById(userId);

  if (!user) throw new ApiError(StatusCodes.NOT_FOUND, "User not found");

  const response = new ApiResponse(
    StatusCodes.OK,
    "User profile retrieved successfully",
    user
  );

  res.status(response.statusCode).json(response);
});

export const updateProfile = asyncHandler(async (req, res) => {
  const response = new ApiResponse(
    StatusCodes.OK,
    "Profile updated successfully",
    null
  );

  res.status(response.statusCode).json(response);
});

export const changePassword = asyncHandler(async (req, res) => {});

export const getReceivedRequests = asyncHandler(async (req, res) => {
  const userId = req.user._id;

  const requests = await ConnectionRequest.find({
    toUserId: userId,
    status: "interested",
  })
    .populate("fromUserId", SAFE_USER_DATA)
    .sort({ createdAt: -1 });

  const response = new ApiResponse(
    StatusCodes.OK,
    "Connection requests fetched successfully",
    requests
  );

  res.status(response.statusCode).json(response);
});

export const getConnections = asyncHandler(async (req, res) => {
  const userId = req.user._id;

  const connections = await ConnectionRequest.find({
    status: "accepted",
    $or: [{ fromUserId: userId }, { toUserId: userId }],
  })
    .populate("fromUserId", SAFE_USER_DATA)
    .populate("toUserId", SAFE_USER_DATA)
    .sort({ updatedAt: -1 });

  const response = new ApiResponse(
    StatusCodes.OK,
    "Connections fetched successfully.",
    connections
  );

  res.status(response.statusCode).json(response);
});

export const getUserFeed = asyncHandler(async (req, res) => {});
