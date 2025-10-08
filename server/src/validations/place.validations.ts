import * as z from "zod";

const autoCompleteInputSchema = z.object({
  input: z
    .string({
      error: (issue) =>
        issue.input === undefined
          ? "Input is required"
          : "Input must be a string",
    })
    .trim()
    .min(3, { error: "Input must be at least 3 characters long" })
    .toLowerCase(),
});

export const validateAutocompleteInput = (data: unknown) =>
  autoCompleteInputSchema.safeParse(data);
