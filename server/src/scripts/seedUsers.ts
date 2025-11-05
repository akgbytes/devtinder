import { env } from "@/config/env";
import { User } from "@/models/user.model";
import mongoose from "mongoose";
import { dummyUsersData } from "./generateUserData";

async function seedUsers() {
  try {
    await mongoose.connect(env.MONGO_URI);
    console.log("MongoDB connected");

    const inserted = await User.insertMany(dummyUsersData);

    console.log(`Inserted ${inserted.length} users`);

    await mongoose.disconnect();
    console.log("MongoDB disconnected");
  } catch (error) {
    console.error("Seeding failed:", error);
    await mongoose.disconnect();
  }
}

seedUsers();

// npx tsx .\src\scripts\seedUsers.ts
