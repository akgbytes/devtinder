import { User } from "@/models/user.model";
import { ApiError } from "@/utils/core/ApiError";
import { ApiResponse } from "@/utils/core/ApiResponse";
import asyncHandler from "@/utils/core/asyncHandler";
import { handleZodError } from "@/utils/core/handleZodError";
import { validateSignup } from "@/validations/auth.validations";
import { Request, Response, RequestHandler } from "express";
import { StatusCodes } from "http-status-codes";

export const signup = asyncHandler(async (req: Request, res: Response) => {
  const data = handleZodError(validateSignup(req.body));
  const user = await User.create({ ...data });
  console.log("User created: ", user);

  const response = new ApiResponse(
    StatusCodes.CREATED,
    "Signup successfully",
    user
  );

  res.status(response.statusCode).json(response);
});
