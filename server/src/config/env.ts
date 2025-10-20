import "dotenv/config";
import { NodeEnv } from "@/utils/constants";
import * as z from "zod";
import { logger } from "./logger";

const envSchema = z.object({
  PORT: validNumber("PORT"),
  MONGO_URI: validUrl("MONGO_URI"),

  APP_URL: validUrl("APP_URL"),
  SERVER_URL: validUrl("SERVER_URL"),

  OTP_EXPIRY_MINUTES: validNumber(" OTP_EXPIRY_MINUTES"),

  ACCESS_TOKEN_SECRET: validString("ACCESS_TOKEN_SECRET"),
  ACCESS_TOKEN_EXPIRY: validString("ACCESS_TOKEN_EXPIRY"),

  REFRESH_TOKEN_SECRET: validString("REFRESH_TOKEN_SECRET"),
  REFRESH_TOKEN_EXPIRY: validString("REFRESH_TOKEN_EXPIRY"),

  RESEND_API_KEY: validString("RESEND_API_KEY"),
  RESEND_SENDERMAIL: validString("RESEND_SENDERMAIL"),

  REDIS_HOST: validString("REDIS_HOST"),
  REDIS_PORT: validNumber("REDIS_PORT"),

  GOOGLE_MAPS_API_KEY: validString("GOOGLE_MAPS_API_KEY"),
  UPLOADTHING_TOKEN: validString("UPLOADTHING_TOKEN"),

  NODE_ENV: z.enum(Object.values(NodeEnv), {
    error: () => "NODE_ENV must be 'development' or 'production'",
  }),

  RAZORPAY_KEY_ID: validString("RAZORPAY_KEY_ID"),
  RAZORPAY_KEY_SECRET: validString("RAZORPAY_KEY_SECRET"),
  RAZORPAY_WEBHOOK_SECRET: validString("RAZORPAY_WEBHOOK_SECRET"),
});

const createEnv = (env: NodeJS.ProcessEnv) => {
  const result = envSchema.safeParse(env);

  if (!result.success) {
    const errorMessages = result.error.issues
      .map((err) => `- ${err.message}`)
      .join("\n");

    logger.error(`Failed to validate environment variables \n${errorMessages}`);
    process.exit(1);
  }

  return result.data;
};

export const env = createEnv(process.env);

function validUrl(name: string) {
  return z.url({
    error: (issue) =>
      issue.input === undefined
        ? `${name} is required`
        : `${name} must be a valid URL`,
  });
}

function validString(name: string) {
  return z
    .string({
      error: (issue) =>
        issue.input === undefined
          ? `${name} is required`
          : `${name} must be a string`,
    })
    .trim()
    .nonempty(`${name} cannot be empty`);
}

function validNumber(name: string) {
  return z.coerce.number<number>({ error: `${name} must be a valid number` });
}
