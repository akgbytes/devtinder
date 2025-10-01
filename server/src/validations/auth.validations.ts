import * as z from "zod";

const signupSchema = z.object({
  firstname: z
    .string()
    .min(3, { error: "First name must contain at least 3 characters" }),

  lastname: z
    .string()
    .min(3, { error: "Last name must contain at least 3 characters" }),

  email: z.email({ error: "Invalid email address" }),

  password: z.string(),
});

export const validateSignup = (data: unknown) => signupSchema.safeParse(data);
