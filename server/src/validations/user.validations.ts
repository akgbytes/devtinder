import { Gender } from "@/utils/constants";
import * as z from "zod";

const completeProfileSchema = z.object(
  {
    email: z
      .email({
        error: (issue) =>
          issue.input === undefined
            ? "Email is required"
            : "Invalid email address",
      })
      .toLowerCase(),
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

    skills: z.array(
      z.object({
        _id: z
          .string({
            error: (issue) =>
              issue.input === undefined
                ? "Skill id is required"
                : "Skill id must be a string",
          })
          .trim()
          .min(5, { error: "Skill id must be at least 5 characters long" })
          .max(50, { error: "Skill id must not exceed 50 characters" }),
        name: z
          .string({
            error: (issue) =>
              issue.input === undefined
                ? "Skill name is required"
                : "Skill name must be a string",
          })
          .trim()
          .nonempty({ error: "Skill name cannot be empty" })
          .max(100, { error: "Skill name must not exceed 100 characters" }),
      })
    ),

    about: z
      .string({
        error: (issue) =>
          issue.input === undefined
            ? "About is required"
            : "About must be a string",
      })
      .trim()
      .min(10, { error: "About must be at least 10 characters long" })
      .max(500, { error: "About must not exceed 500 characters" }),

    gender: z.enum(Gender, {
      error: (issue) =>
        issue.input === undefined
          ? "Gender is required"
          : `Invalid gender value. Allowed values are ${Object.values(
              Gender
            ).join(", ")}`,
    }),

    // add min age 18 validation
    dateOfBirth: z.iso.datetime(),

    location: z.object({
      placeId: z
        .string({
          error: (issue) =>
            issue.input === undefined
              ? "Place id is required"
              : "Place id must be a string",
        })
        .trim()
        .min(5, { error: "Place id must be at least 5 characters long" })
        .max(50, { error: "Place id must not exceed 50 characters" }),
      displayName: z
        .string({
          error: (issue) =>
            issue.input === undefined
              ? "Place name is required"
              : "Place name must be a string",
        })
        .trim()
        .min(3, { error: "Place name must be at least 3 characters long" })
        .max(100, { error: "Place name must not exceed 100 characters" }),

      city: z
        .string()
        .trim()
        .min(3, { error: "City must be at least 3 characters long" })
        .max(50, { error: "City must not exceed 50 characters" })
        .optional()
        .nullable(),
      state: z
        .string()
        .trim()
        .min(3, { error: "State must be at least 3 characters long" })
        .max(50, { error: "State must not exceed 50 characters" })
        .optional()
        .nullable(),
      country: z
        .string()
        .trim()
        .min(3, { error: "Country must be at least 5 characters long" })
        .max(50, { error: "Country must not exceed 50 characters" })
        .nullable(),
    }),

    profilePicture: z.url({
      error: (issue) =>
        issue.input === undefined
          ? "Profile picture is required"
          : "Profile picture must be a valid URL",
    }),
  },
  { error: "Missing required fields" }
);

export const validateCompleteProfile = (data: unknown) =>
  completeProfileSchema.safeParse(data);
