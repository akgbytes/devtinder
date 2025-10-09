import { env } from "@/config/env";
import { TokenPayload } from "@/types";
import { User } from "@/types/express";
import { SignOptions } from "jsonwebtoken";
import jwt from "jsonwebtoken";
import { ApiError } from "./core";
import { StatusCodes } from "http-status-codes";

export const generateAccessToken = (user: User) => {
  const payload: TokenPayload = {
    _id: user._id,
    email: user.email,
  };

  const secret = env.ACCESS_TOKEN_SECRET;
  const expiresIn = env.ACCESS_TOKEN_EXPIRY as SignOptions["expiresIn"];

  return jwt.sign(payload, secret, { expiresIn });
};

export const generateRefreshToken = (user: User) => {
  const payload: TokenPayload = {
    _id: user._id,
    email: user.email,
  };

  const secret = env.REFRESH_TOKEN_SECRET;
  const expiresIn = env.REFRESH_TOKEN_EXPIRY as SignOptions["expiresIn"];

  return jwt.sign(payload, secret, { expiresIn });
};

export const verifyAccessToken = (token: string): TokenPayload => {
  const payload = jwt.verify(token, env.ACCESS_TOKEN_SECRET);
  return payload as TokenPayload;
};

export const verifyRefreshToken = (token: string): TokenPayload => {
  try {
    const payload = jwt.verify(token, env.REFRESH_TOKEN_SECRET);
    return payload as TokenPayload;
  } catch (error: any) {
    if (error.name === "TokenExpiredError") {
      throw new ApiError(StatusCodes.UNAUTHORIZED, "Refresh token has expired");
    }
    throw new ApiError(StatusCodes.UNAUTHORIZED, "Invalid refresh token");
  }
};
