import { Gender } from "@/utils/constants";
import * as z from "zod";

const registerSchema = z.object({
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

const loginSchema = registerSchema.pick({
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

const resendOtpSchema = registerSchema.pick({
  email: true,
});

const updateProfileSchema = z.object({
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

  about: z.string(),
  gender: z.preprocess(
    (val) => (typeof val === "string" ? val.toLowerCase() : val),
    z.enum(Gender)
  ),
  dateOfBirth: z.date(),
  location: z.string(),
  skills: z.array(z.string()),
  profilePicture: z.url(),

  socialProfiles: z.object({
    github: z.url(),
    x: z.url(),
    linkedIn: z.url(),
  }),
});

export const validateRegister = (data: unknown) =>
  registerSchema.safeParse(data);

export const validateLogin = (data: unknown) => loginSchema.safeParse(data);

export const validateVerifyEmail = (data: unknown) =>
  verifyEmailSchema.safeParse(data);

export const validateResendOtp = (data: unknown) =>
  resendOtpSchema.safeParse(data);
