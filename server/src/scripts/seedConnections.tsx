import { env } from "@/config/env";
import { ConnectionRequest } from "@/models/connectionRequest.model";
import mongoose from "mongoose";
import { dummyConnections } from "./generateConnections";

async function seedConnections() {
  try {
    await mongoose.connect(env.MONGO_URI);
    console.log("MongoDB connected");

    const inserted = await ConnectionRequest.insertMany(dummyConnections);

    console.log(`Inserted ${inserted.length} connections requests`);

    await mongoose.disconnect();
    console.log("MongoDB disconnected");
  } catch (error) {
    console.error("Seeding failed:", error);
    await mongoose.disconnect();
  }
}

seedConnections();
