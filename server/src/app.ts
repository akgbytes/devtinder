import express from "express";

const app = express();

import healthRoutes from "routes/health.route";
app.use("/api/v1/health", healthRoutes);

export default app;
