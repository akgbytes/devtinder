import mongoose from "mongoose";
import { env } from "./env";
import { logger } from "./logger";

export const connectDB = async () => {
  try {
    await mongoose.connect(env.MONGO_URI, {
      minPoolSize: 5,
      maxPoolSize: 100,
      maxIdleTimeMS: 1000 * 60 * 10, // 10mins
    });
    logger.info("MongoDB connected successfully");
  } catch (error: any) {
    logger.error(
      "Error while connecting to MongoDB: ",
      error.message || "Unknown error"
    );
    process.exit(1);
  }
};
