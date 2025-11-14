import { env } from "@/config/env";
import { connectDB } from "@/config/db";
import { logger } from "@/config/logger";
import app from "./app";

connectDB();

const port = env.PORT;

app.listen(port, () => {
  logger.info(`Server listening on port ${port}`);
});
