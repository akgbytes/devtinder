import { sendMail } from "@/utils/mail/mailService";
import { otpVerificationTemplate } from "./mailTemplates";

export const sendVerificationMail = async (
  email: string,
  username: string,
  otp: string
) => {
  const { html, text, subject } = otpVerificationTemplate(username, otp);
  await sendMail(email, subject, text, html);
};
