import { ApiError, ValidationError } from "./ApiError";
import { StatusCodes } from "http-status-codes";
import { ZodSafeParseResult } from "zod";

type Issue = {
  expected: string;
  code: string;
  path: string[];
  message: string;
};

export const handleZodError = <T>(result: ZodSafeParseResult<T>) => {
  if (result.success && result.data) return result.data;

  const errors: ValidationError[] = (result.error?.issues as Issue[]).map(
    (issue) => {
      return {
        field: issue.path[0] || "",
        message: issue.message,
      };
    }
  );

  throw new ApiError(
    StatusCodes.BAD_REQUEST,
    "Invalid input data. Please check your details and try again.",
    errors
  );
};
