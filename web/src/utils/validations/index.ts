import * as z from "zod";

export const registerSchema = z.object({
  name: z
    .string()
    .trim()
    .min(3, { message: "Name must be at least 3 characters long" })
    .max(50, { message: "Name must not exceed 50 characters" }),

  email: z.email({ error: "Invalid email address" }).toLowerCase(),
  password: z
    .string()
    .min(6, { error: "Password must be at least 6 characters long" })
    .max(128, { error: "Password must not exceed 128 characters" }),
});

export const loginSchema = registerSchema.pick({
  email: true,
  password: true,
});

export const verifyEmailSchema = registerSchema
  .pick({
    email: true,
  })
  .extend({
    otp: z.string().trim().length(6, "OTP must be of 6 digits"),
  });

export type RegisterFormValues = z.infer<typeof registerSchema>;
export type LoginFormValues = z.infer<typeof loginSchema>;
export type VerifyEmailFormValues = z.infer<typeof verifyEmailSchema>;
