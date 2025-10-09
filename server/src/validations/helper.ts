import * as z from "zod";

export const createFieldError = (
  fieldName: string,
  type: string = "string"
) => ({
  error: (issue: any) =>
    issue.input === undefined
      ? `${fieldName} is required`
      : `${fieldName} must be a ${type}`,
});

export const passwordSchema = z
  .string(createFieldError("Password"))
  .min(6, "Password must be at least 6 characters long")
  .max(128, "Password must not exceed 128 characters")
  .regex(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])/,
    "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"
  );

export const emailSchema = z
  .email({
    error: (issue: any) =>
      issue.input === undefined ? "Email is required" : "Invalid email address",
  })
  .toLowerCase()
  .trim();

export const nameSchema = z
  .string(createFieldError("Name"))
  .trim()
  .min(3, "Name must be at least 3 characters long")
  .max(50, "Name must not exceed 50 characters")
  .regex(/^[a-zA-Z\s]+$/, "Name can only contain letters and spaces");

export const dateOfBirthSchema = z.iso.datetime().refine(
  (date) => {
    const dob = new Date(date);
    const eighteenYearsAgo = new Date();
    eighteenYearsAgo.setFullYear(eighteenYearsAgo.getFullYear() - 18);
    return dob <= eighteenYearsAgo;
  },
  { message: "You must be at least 18 years old" }
);
