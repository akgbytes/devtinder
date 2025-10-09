import {
  createConnectionRequest,
  reviewConnectionRequest,
} from "@/controllers/connectionRequest.controller";
import { authMiddleware } from "@/middlewares/auth.middleware";
import { Router } from "express";

const router = Router();

router.post(
  "/request/:toUserId/:status",
  authMiddleware,
  createConnectionRequest
);
router.post(
  "/review/:requestId/:status",
  authMiddleware,
  reviewConnectionRequest
);

export default router;
