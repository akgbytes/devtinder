import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import { env } from "@/config/env";

const app = express();

app.use(
  cors({
    origin: env.APP_URL,
    credentials: true,
    allowedHeaders: [
      "Content-Type",
      "Authorization",
      "x-uploadthing-package",
      "x-uploadthing-version",
      "traceparent",
      "b3",
    ],
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

import skillRoutes from "@/routes/skill.routes";
app.use("/api/v1/skills", skillRoutes);

import placeRoutes from "@/routes/place.routes";
app.use("/api/v1/places", placeRoutes);

import { createRouteHandler } from "uploadthing/express";

import { fileRouter } from "@/config/uploadthing";
app.use(
  "/api/v1/uploadthing",
  createRouteHandler({
    router: fileRouter,
  })
);

import { errorHandler } from "@/middlewares/error.middleware";

app.use(errorHandler);

export default app;
