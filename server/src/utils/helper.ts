import { StatusCodes } from "http-status-codes";
import mongoose from "mongoose";
import { ApiError } from "./core";

export const validateObjectId = (id: string, entityName: string): void => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new ApiError(StatusCodes.BAD_REQUEST, `Invalid ${entityName} ID`);
  }
};
