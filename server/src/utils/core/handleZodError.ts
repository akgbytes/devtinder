import { ApiError } from "./ApiError";
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

  const issue = result.error?.issues[0] as Issue;
  const path = issue.path[0] || "";
  const message = issue.message;

  throw new ApiError(StatusCodes.BAD_REQUEST, "Validation failed", [
    { field: path, message },
  ]);
};
