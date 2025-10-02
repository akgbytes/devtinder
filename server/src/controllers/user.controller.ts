import { User } from "@/models/user.model";
import { ApiError, ApiResponse, asyncHandler } from "@/utils/core";
import { StatusCodes } from "http-status-codes";

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
