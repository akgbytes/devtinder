import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI as string);
    console.log("MongoDB connected successfully!");
  } catch (error: any) {
    console.log(
      "Error while connecting to MongoDB: ",
      error.message || "Unknown error"
    );
    process.exit(1);
  }
};
