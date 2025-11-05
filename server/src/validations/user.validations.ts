import { Gender } from "@/utils/constants";
import * as z from "zod";
import {
  createFieldError,
  dateOfBirthSchema,
  emailSchema,
  nameSchema,
  passwordSchema,
} from "./helper";

const profilePictureSchema = z.object({
  profilePicture: z.url({
    error: (issue) =>
      issue.input === undefined
        ? "Profile picture is required"
        : "Profile picture must be a valid URL",
  }),
});

const aboutSchema = z.object({
  about: z
    .string(createFieldError("About"))
    .trim()
    .min(10, "About must be at least 10 characters long")
    .max(1000, "About must not exceed 1000 characters"),
});

const skillsSchema = z.object({
  skills: z.array(
    z.object({
      _id: z
        .string(createFieldError("Skill ID"))
        .trim()
        .nonempty("Skill ID cannot be empty")
        .max(50, "Skill id must not exceed 50 characters"),
      name: z
        .string(createFieldError("Skill name"))
        .trim()
        .nonempty("Skill name cannot be empty")
        .max(100, "Skill name must not exceed 100 characters"),
    })
  ),
});

const completeProfileSchema = z.object({
  email: emailSchema,
  name: nameSchema,

  ...profilePictureSchema.shape,
  ...aboutSchema.shape,
  ...skillsSchema.shape,

  gender: z.enum(Gender, {
    error: (issue) =>
      issue.input === undefined
        ? "Gender is required"
        : `Invalid gender value. Must be one of: ${Object.values(Gender).join(
            ", "
          )}`,
  }),

  dateOfBirth: dateOfBirthSchema,

  location: z.object({
    placeId: z
      .string(createFieldError("Place ID"))
      .trim()
      .nonempty("Place ID cannot be empty")
      .max(100, "Place ID must not exceed 100 characters"),
    displayName: z
      .string(createFieldError("Place name"))
      .trim()
      .nonempty("Place name cannot be empty")
      .max(200, "Place name must not exceed 200 characters"),

    city: z
      .string(createFieldError("City"))
      .trim()
      .max(50, { error: "City must not exceed 50 characters" }),

    state: z
      .string(createFieldError("State"))
      .trim()
      .max(50, { error: "State must not exceed 50 characters" }),

    country: z
      .string(createFieldError("Country"))
      .trim()
      .max(50, { error: "Country must not exceed 50 characters" }),
  }),
});

const changePasswordSchema = z
  .object({
    currentPassword: z.string().min(1, "Current password is required"),
    newPassword: passwordSchema,
    confirmPassword: z.string().min(1, "Confirm password is required"),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export const validateCompleteProfile = (data: unknown) =>
  completeProfileSchema.safeParse(data);
export const validateProfilePicture = (data: unknown) =>
  profilePictureSchema.safeParse(data);
export const validateAbout = (data: unknown) => aboutSchema.safeParse(data);
export const validateSkills = (data: unknown) => skillsSchema.safeParse(data);
export const validateChangePassword = (data: unknown) =>
  changePasswordSchema.safeParse(data);
