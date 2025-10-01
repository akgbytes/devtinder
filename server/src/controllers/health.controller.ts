import { StatusCodes } from "http-status-codes";
import { Request, RequestHandler, Response } from "express";
import { ApiResponse } from "@/utils/core/ApiResponse";

export const checkHealth: RequestHandler = (req: Request, res: Response) => {
  res
    .status(StatusCodes.OK)
    .json(new ApiResponse(StatusCodes.OK, "Health check passed", null));
};
