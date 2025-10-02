import { User } from "@/models/user.model";
import {
  ApiError,
  ApiResponse,
  asyncHandler,
  handleZodError,
} from "@/utils/core";
import { validateSignup } from "@/validations/auth.validations";
import { StatusCodes } from "http-status-codes";
import { SignOptions } from "jsonwebtoken";

export const register = asyncHandler(async (req, res) => {
  const { firstname, lastname, email, password } = handleZodError(
    validateSignup(req.body)
  );

  const existingUser = await User.findOne({ email });

  if (existingUser)
    throw new ApiError(
      StatusCodes.CONFLICT,
      "An account with this email already exists"
    );

  const user = await User.create({ firstname, lastname, email, password });

  const token = user.generateJWT();

  res.cookie("token", token, {
    maxAge: 60 * 60 * 1000, // 1 hour
  });

  const response = new ApiResponse(
    StatusCodes.CREATED,
    "User registered successfully",
    user
  );

  res.status(response.statusCode).json(response);
});

export const login = asyncHandler(async (req, res) => {
  const response = new ApiResponse(StatusCodes.OK, "Login successful", null);
  res.status(response.statusCode).json(response);
});
