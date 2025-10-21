import { Router } from "express";
import { authMiddleware } from "@/middlewares/auth.middleware";
import {
  createOrder,
  paymentWebhook,
  getPaymentStatus,
} from "@/controllers/payment.controller";

const router = Router();

router.post("/create", authMiddleware, createOrder);
router.post("/webhook", paymentWebhook);
router.get("/status", authMiddleware, getPaymentStatus);

export default router;
