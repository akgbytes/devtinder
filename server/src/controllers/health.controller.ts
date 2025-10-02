import { StatusCodes } from "http-status-codes";
import { Request, RequestHandler, Response } from "express";
import { ApiResponse } from "@/utils/core";

export const checkHealth: RequestHandler = (req: Request, res: Response) => {
  const response = new ApiResponse(StatusCodes.OK, "Health check passed", null);
  res.status(response.statusCode).json(response);
};
