import { Router } from "express";
import {
  login,
  logout,
  register,
  resendOtp,
  verifyEmail,
} from "@/controllers/auth.controller";

const router = Router();

router.post("/register", register);
router.post("/otp/verify", verifyEmail);
router.post("/otp/resend", resendOtp);
router.post("/login", login);
router.post("/logout", logout);

export default router;
