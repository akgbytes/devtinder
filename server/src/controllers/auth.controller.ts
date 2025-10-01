import { User } from "@/models/user.model";
import { ApiResponse } from "@/utils/core/ApiResponse";
import { handleZodError } from "@/utils/core/handleZodError";
import { validateSignup } from "@/validations/auth.validations";
import { Request, Response, RequestHandler } from "express";
import { StatusCodes } from "http-status-codes";

export const signup: RequestHandler = async (req: Request, res: Response) => {
  try {
    const data = handleZodError(validateSignup(req.body));

    const user = await User.create({ ...data });

    console.log("User created: ", user);

    res
      .status(StatusCodes.CREATED)
      .json(new ApiResponse(StatusCodes.CREATED, "Signup successfully", user));
  } catch (error: any) {
    console.log("Error while creating user: ", error);
  }
};
