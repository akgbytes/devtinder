import { StatusCodes } from "http-status-codes";
import mongoose from "mongoose";
import { ApiError } from "./core";
import crypto from "crypto";

export const validateObjectId = (id: string, entityName: string): void => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new ApiError(StatusCodes.BAD_REQUEST, `Invalid ${entityName} ID`);
  }
};

export const generateHash = (val: string) => {
  return crypto.createHash("sha256").update(val).digest("hex");
};
