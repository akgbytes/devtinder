import { Router } from "express";
import { authMiddleware } from "@/middlewares/auth.middleware";
import {
  getProfile,
  updateProfile,
  changePassword,
  getConnections,
  getReceivedRequests,
  getUserFeed,
  completeProfile,
} from "@/controllers/user.controller";

const router = Router();

router
  .route("/profile")
  .all(authMiddleware)
  .get(getProfile)
  .patch(updateProfile);
router.patch("/profile/password", authMiddleware, changePassword);
router.post("/profile/complete", completeProfile);

router.get("/connections", authMiddleware, getConnections);
router.get("/connections/requests", authMiddleware, getReceivedRequests);

router.get("/feed", authMiddleware, getUserFeed);

export default router;
