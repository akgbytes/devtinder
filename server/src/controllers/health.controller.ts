import { StatusCodes } from "http-status-codes";
import { Request, Response } from "express";
import { ApiResponse } from "@/utils/core/ApiResponse";

export const checkHealth = (req: Request, res: Response) => {
  res
    .status(StatusCodes.OK)
    .json(new ApiResponse(StatusCodes.OK, "Health check passed", null));
};
