import { ApiError } from "@/utils/core";
import { ErrorRequestHandler, Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";
import { MongooseError } from "mongoose";

export const errorHandler: ErrorRequestHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  console.log("err from middleware \n", err);
  let error: ApiError;

  if (err instanceof ApiError) {
    error = err;
  } else if (err.code === 11000) {
    const field = Object.keys(err?.keyValue)[0];
    error = new ApiError(
      StatusCodes.CONFLICT,
      `Duplicate value for field: ${field}`
    );
  } else {
    error = new ApiError(
      StatusCodes.INTERNAL_SERVER_ERROR,
      "Something went wrong"
    );
  }

  const response = error.toJSON();

  res.status(error.statusCode).json(response);
};
