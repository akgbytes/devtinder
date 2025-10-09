import { Router } from "express";
import {
  login,
  logout,
  register,
  resendOtp,
  verifyOtp,
} from "@/controllers/auth.controller";

const router = Router();

router.post("/register", register);
router.post("/otp/verify", verifyOtp);
router.post("/otp/resend", resendOtp);
router.post("/login", login);
router.post("/logout", logout);

export default router;
