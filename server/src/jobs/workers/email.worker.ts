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
    prefix: "bullmq",
    removeOnComplete: { age: 3600 }, // remove after 1hr
    removeOnFail: { count: 500 }, // keep last 500 failed
  }
);

logger.info("Email worker started and listening for jobs...");
