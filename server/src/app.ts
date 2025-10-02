import express from "express";
import cookieParser from "cookie-parser";

const app = express();

app.use(express.json());
app.use(cookieParser());

import healthRoutes from "@/routes/health.routes";
app.use("/api/v1/health", healthRoutes);

import authRoutes from "@/routes/auth.routes";
app.use("/api/v1/auth", authRoutes);

import { errorHandler } from "@/middlewares/error.middleware";
app.use(errorHandler);

export default app;
