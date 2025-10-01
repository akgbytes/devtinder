import "dotenv/config";
import { connectDB } from "@/config/db";
import app from "@/app";

connectDB();

const port = process.env.PORT ?? 8080;

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
