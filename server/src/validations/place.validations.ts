import * as z from "zod";
import { createFieldError } from "./helper";

const autoCompleteInputSchema = z.object({
  input: z
    .string(createFieldError("Search query"))
    .trim()
    .min(3, { error: "Search query must be at least 3 characters long" })
    .max(200, "Search query is too long. Maximum 200 characters.")
    .toLowerCase(),
});

export const validateAutocompleteInput = (data: unknown) =>
  autoCompleteInputSchema.safeParse(data);
