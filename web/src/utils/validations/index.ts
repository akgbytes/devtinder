import { Gender } from "@/constants";
import * as z from "zod";

export const registerSchema = z.object({
  name: z
    .string({
      error: (issue) =>
        issue.input === undefined
          ? "Name is required"
          : "Name must be a string",
    })
    .trim()
    .min(3, { error: "Name must be at least 3 characters long" })
    .max(50, { error: "Name must not exceed 50 characters" }),

  email: z
    .email({
      error: (issue) =>
        issue.input === undefined
          ? "Email is required"
          : "Invalid email address",
    })
    .toLowerCase(),

  password: z
    .string({
      error: (issue) =>
        issue.input === undefined
          ? "Password is required"
          : "Password must be a string",
    })
    .min(6, { error: "Password must be at least 6 characters long" })
    .max(128, { error: "Password must not exceed 128 characters" }),
});

export const loginSchema = registerSchema.pick({
  email: true,
  password: true,
});

const verifyEmailSchema = registerSchema
  .pick({
    email: true,
  })
  .extend({
    otp: z
      .string({
        error: (issue) =>
          issue.input === undefined
            ? "OTP is required"
            : "OTP must be a string",
      })
      .trim()
      .length(6, { error: "OTP must be of 6 digits" }),
  });

export const resendOtpSchema = registerSchema.pick({
  email: true,
});

export const completeProfileSchema = z.object({
  name: z
    .string({
      error: (issue) =>
        issue.input === undefined
          ? "Name is required"
          : "Name must be a string",
    })
    .trim()
    .min(3, { error: "Name must be at least 3 characters long" })
    .max(50, { error: "Name must not exceed 50 characters" }),

  role: z.string(),
  skills: z.string(),

  about: z.string(),
  gender: z.enum(Gender),
  dateOfBirth: z.date(),
  location: z.string(),
});

export type RegisterFormValues = z.infer<typeof registerSchema>;
export type LoginFormValues = z.infer<typeof loginSchema>;
export type VerifyEmailFormValues = z.infer<typeof verifyEmailSchema>;
export type ResendOtpFormValues = z.infer<typeof resendOtpSchema>;
export type CompleteProfileFormValues = z.infer<typeof completeProfileSchema>;
