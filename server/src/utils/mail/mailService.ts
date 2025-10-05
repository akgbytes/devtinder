import { env } from "@/config/env";
import { ApiError } from "../core";
import { resend } from "./resendClient";

export const sendMail = async (
  to: string,
  subject: string,
  text: string,
  html: string
) => {
  try {
    await resend.emails.send({
      from: env.RESEND_SENDERMAIL,
      to,
      subject,
      html,
      text,
    });
  } catch (error) {
    throw new ApiError(500, `Failed to send "${subject}" email`);
  }
};
