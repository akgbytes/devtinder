import * as z from "zod";

const registerSchema = z.object({
  firstname: z
    .string()
    .min(3, { error: "First name must be at least 3 characters" })
    .max(50, { error: "First name must not exceed 50 characters" }),

  lastname: z
    .string()
    .min(3, { error: "Last name must be at least 3 characters" })
    .max(50, { error: "Last name must not exceed 50 characters" }),

  email: z.email({ error: "Invalid email address" }),

  password: z
    .string()
    .min(6, { error: "Password must be at least 6 characters long" })
    .max(128, { error: "Password must not exceed 128 characters" }),
});

const loginSchema = registerSchema.pick({
  email: true,
  password: true,
});

export const validateRegister = (data: unknown) =>
  registerSchema.safeParse(data);

export const validateLogin = (data: unknown) => loginSchema.safeParse(data);
