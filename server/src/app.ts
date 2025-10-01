import "dotenv/config";
import express from "express";
import { connectDB } from "./config/db";

connectDB();

const app = express();
const port = process.env.PORT ?? 8080;

app.use("/hello", (req, res) => {
  res.send("hello there");
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
