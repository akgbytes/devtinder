import { checkHealth } from "@/controllers/health.controller";
import { Router } from "express";

const router = Router();

router.get("/", checkHealth);

export default router;
