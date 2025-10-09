import { User } from "@/types/express";
import { ApiError, asyncHandler } from "@/utils/core";
import { verifyAccessToken } from "@/utils/token";
import { StatusCodes } from "http-status-codes";
import jwt from "jsonwebtoken";

export const isLoggedIn = asyncHandler(async (req, res, next) => {
  const { accessToken } = req.cookies;
  if (!accessToken)
    throw new ApiError(
      StatusCodes.UNAUTHORIZED,
      "Authentication required. Please login"
    );

  const user = verifyAccessToken(accessToken);
  req.user = user;
  next();
});
