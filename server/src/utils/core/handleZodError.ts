import { SafeParseResult } from "zod/v4/core/util.cjs";
import { ApiError } from "./ApiError";
import { StatusCodes } from "http-status-codes";

export const handleZodError = <T>(result: SafeParseResult<T>) => {
  if (result.success && result.data) return result.data;

  const issue = result.error?.issues[0];
  const path = issue?.path.join(".");
  const isMissing = issue?.code === "invalid_type" && issue.input === undefined;

  throw new ApiError(
    isMissing ? StatusCodes.BAD_REQUEST : StatusCodes.UNPROCESSABLE_ENTITY,
    isMissing
      ? path
        ? `Missing '${path}' field`
        : "Missing required fields"
      : `${issue?.message}: ${path}` || "Invalid input data"
  );
};
