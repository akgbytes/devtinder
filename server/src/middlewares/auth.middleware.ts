import { logger } from "@/config/logger";
import { ApiError, asyncHandler } from "@/utils/core";
import { verifyAccessToken } from "@/utils/token";
import { StatusCodes } from "http-status-codes";

export const authMiddleware = asyncHandler(async (req, res, next) => {
  const { accessToken } = req.cookies;
  if (!accessToken) {
    logger.warn("No access token provided", {
      path: req.path,
      ip: req.ip,
    });
    throw new ApiError(
      StatusCodes.UNAUTHORIZED,
      "Authentication required. Please log in."
    );
  }

  try {
    const user = verifyAccessToken(accessToken);
    req.user = user;
    next();
  } catch (error: any) {
    if (error.name === "TokenExpiredError") {
      logger.info("Expired token", { error: error.message });
      throw new ApiError(
        StatusCodes.UNAUTHORIZED,
        "Your session has expired. Please log in again."
      );
    }

    if (error.name === "JsonWebTokenError") {
      logger.warn("Invalid token", { error: error.message });
      throw new ApiError(
        StatusCodes.UNAUTHORIZED,
        "Invalid authentication token. Please log in again."
      );
    }

    logger.error("Authentication error", { error: error.message });
    throw new ApiError(
      StatusCodes.INTERNAL_SERVER_ERROR,
      "Authentication failed. Please try again."
    );
  }
});
