import { ConnectionRequest } from "@/models/connectionRequest.model";
import { User } from "@/models/user.model";
import { ApiError, ApiResponse, asyncHandler } from "@/utils/core";
import { StatusCodes } from "http-status-codes";

const SAFE_USER_DATA = [
  "-password",
  "-__v",
  "-createdAt",
  "-updatedAt",
  "-_id",
];

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
