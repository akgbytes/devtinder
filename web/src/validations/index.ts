import { Gender } from "@/constants";
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

export const registerSchema = z.object({
  name: nameSchema,
  email: emailSchema,
  password: passwordSchema,
});

export const loginSchema = z.object({
  email: emailSchema,
  password: z
    .string(createFieldError("Password"))
    .nonempty("Password is required"),
});

const verifyEmailSchema = z.object({
  email: emailSchema,
  otp: z
    .string(createFieldError("OTP"))
    .trim()
    .length(6, "OTP must be exactly 6 digits")
    .regex(/^\d{6}$/, "OTP must contain only numbers"),
});

export const resendOtpSchema = z.object({
  email: emailSchema,
});

export const completeProfileSchema = z.object({
  name: nameSchema,
  about: z
    .string(createFieldError("About"))
    .trim()
    .min(10, "About must be at least 10 characters long")
    .max(1000, "About must not exceed 1000 characters"),

  profilePicture: z.url({
    error: (issue) =>
      issue.input === undefined
        ? "Profile picture is required"
        : "Profile picture must be a valid URL",
  }),

  gender: z.enum(Gender, {
    error: (issue) =>
      issue.input === undefined
        ? "Gender is required"
        : `Invalid gender value. Must be one of: ${Object.values(Gender).join(
            ", "
          )}`,
  }),

  dateOfBirth: z.date({
    error: (issue) =>
      issue.input === undefined
        ? "Date of birth is required"
        : "Date of birth must be a valid date",
  }),

  location: z
    .string(createFieldError("Location"))
    .trim()
    .min(2, { error: "Location must be at least 3 characters long" }),

  skills: z.string().optional(),
});

export type RegisterFormValues = z.infer<typeof registerSchema>;
export type LoginFormValues = z.infer<typeof loginSchema>;
export type VerifyEmailFormValues = z.infer<typeof verifyEmailSchema>;
export type ResendOtpFormValues = z.infer<typeof resendOtpSchema>;
export type CompleteProfileFormValues = z.infer<typeof completeProfileSchema>;
