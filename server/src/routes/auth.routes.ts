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
router.post("/verify/otp", verifyEmail);
router.post("/resend/otp", resendOtp);
router.post("/login", login);
router.post("/logout", logout);

export default router;
