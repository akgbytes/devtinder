import "dotenv/config";
import express from "express";
import { connectDB } from "./config/db";

connectDB();

const app = express();
const port = process.env.PORT ?? 8080;

import healthRoutes from "routes/health.route";
app.use("/api/v1/health", healthRoutes);

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
