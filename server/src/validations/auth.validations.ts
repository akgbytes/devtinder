import * as z from "zod";
import {
  createFieldError,
  emailSchema,
  nameSchema,
  passwordSchema,
} from "./helper";

const registerSchema = z.object({
  name: nameSchema,
  email: emailSchema,
  password: passwordSchema,
});

const loginSchema = z.object({
  email: emailSchema,
  password: z
    .string(createFieldError("Password"))
    .nonempty("Password is required"),
});

export const verifyEmailSchema = z.object({
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

export const validateRegister = (data: unknown) =>
  registerSchema.safeParse(data);

export const validateLogin = (data: unknown) => loginSchema.safeParse(data);

export const validateVerifyEmail = (data: unknown) =>
  verifyEmailSchema.safeParse(data);

export const validateResendOtp = (data: unknown) =>
  resendOtpSchema.safeParse(data);
