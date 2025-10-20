import { Router } from "express";
import { authMiddleware } from "@/middlewares/auth.middleware";
import {
  createOrder,
  verifyPayment,
  verifyPaymentStatus,
} from "@/controllers/payment.controller";

const router = Router();

router.post("/create", authMiddleware, createOrder);
router.post("/webhook", verifyPayment);
router.post("/verify", authMiddleware, verifyPaymentStatus);

export default router;
