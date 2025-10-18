import { Router } from "express";
import { authMiddleware } from "@/middlewares/auth.middleware";
import { createOrder } from "@/controllers/payment.controller";

const router = Router();

router.post("/create", authMiddleware, createOrder);
router.post("/verify", authMiddleware, createOrder);

export default router;
