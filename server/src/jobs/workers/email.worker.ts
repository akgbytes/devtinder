import { Worker } from "bullmq";
import { redis } from "@/config/redis";
import { sendVerificationMail } from "@/utils/mail";
import { logger } from "@/config/logger";

const emailWorker = new Worker(
  "emailQueue",
  async (job) => {
    console.log("job data recieved: ", job.data);
    const { email, name, otp } = job.data;
    await sendVerificationMail(email, name, otp);
    logger.info(`Verification email sent to ${email}`);
  },
  {
    connection: redis,
  }
);

logger.info("Email worker started and listening for jobs...");
