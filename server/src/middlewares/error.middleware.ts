import { ApiError } from "@/utils/core/ApiError";
import { ErrorRequestHandler, Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";

export const errorHandler: ErrorRequestHandler = (
  err: Error | ApiError,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  let error: ApiError;

  if (err instanceof ApiError) {
    error = err;
  } else {
    const statusCode = StatusCodes.INTERNAL_SERVER_ERROR;
    const message = err.message || "Something went wrong";
    error = new ApiError(statusCode, message);
  }

  const response = error.toJSON();

  console.log("Error \n: ", response);

  res.status(error.statusCode).json(response);
};
