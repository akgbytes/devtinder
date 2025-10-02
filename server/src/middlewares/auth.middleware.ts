import { User } from "@/types/express";
import { ApiError, asyncHandler } from "@/utils/core";
import { StatusCodes } from "http-status-codes";
import jwt from "jsonwebtoken";

export const isLoggedIn = asyncHandler(async (req, res, next) => {
  const { token } = req.cookies;
  if (!token)
    throw new ApiError(
      StatusCodes.UNAUTHORIZED,
      "Authentication required. Please login"
    );

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
    req.user = decoded as User;
    next();
  } catch (error) {
    throw new ApiError(
      StatusCodes.BAD_REQUEST,
      "Invalid or expired authentication token"
    );
  }
});
