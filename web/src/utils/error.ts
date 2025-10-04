import type { ApiError } from "@/types/api";
import type { SerializedError } from "@reduxjs/toolkit";
import { type FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { customToast } from "./customToast";

export function isFetchBaseQueryError(
  error: unknown
): error is FetchBaseQueryError {
  return typeof error === "object" && error != null && "status" in error;
}

export function isErrorWithMessage(
  error: unknown
): error is { message: string } {
  return (
    typeof error === "object" &&
    error != null &&
    "message" in error &&
    typeof (error as any).message === "string"
  );
}

export function handleApiError(
  error: FetchBaseQueryError | SerializedError | null
) {
  if (!error) return;
  console.log("Error handler: ", error);
  if (isFetchBaseQueryError(error)) {
    const errMsg =
      "error" in error
        ? error.error
        : (error.data as ApiError)?.message || "Unknown error occured";
    customToast(errMsg, "error");
  } else if (isErrorWithMessage(error)) {
    customToast(error.message, "error");
  }
}
