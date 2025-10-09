import { Router } from "express";
import {
  login,
  logout,
  register,
  resendOtp,
  verifyOtp,
} from "@/controllers/auth.controller";
import { authMiddleware } from "@/middlewares/auth.middleware";

const router = Router();

router.post("/register", register);
router.post("/otp/verify", verifyOtp);
router.post("/otp/resend", resendOtp);
router.post("/login", login);
router.post("/logout", authMiddleware, logout);

export default router;
