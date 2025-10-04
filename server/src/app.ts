import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";

const app = express();

app.use(
  cors({
    origin: process.env.APP_URL,
    credentials: true,
    methods: ["GET", "POST", "PATCH", "DELETE", "OPTIONS"],
  })
);
app.use(express.json());
app.use(cookieParser());

import healthRoutes from "@/routes/health.routes";
app.use("/api/v1/health", healthRoutes);

import authRoutes from "@/routes/auth.routes";
app.use("/api/v1/auth", authRoutes);

import userRoutes from "@/routes/user.routes";
app.use("/api/v1/users", userRoutes);

import connectionRequestRoutes from "@/routes/connectionRequest.routes";
app.use("/api/v1/connections", connectionRequestRoutes);

import { errorHandler } from "@/middlewares/error.middleware";
app.use(errorHandler);

export default app;
