import { Router } from "express";
import { authMiddleware } from "@/middlewares/auth.middleware";
import {
  getProfile,
  updateProfilePicture,
  updateSkills,
  updateAbout,
  getConnections,
  getReceivedRequests,
  getUserFeed,
  completeProfile,
} from "@/controllers/user.controller";

const router = Router();

router.route("/profile").all(authMiddleware).get(getProfile);

router.patch("/profile/picture", authMiddleware, updateProfilePicture);
router.patch("/profile/about", authMiddleware, updateAbout);
router.patch("/profile/skills", authMiddleware, updateSkills);
router.post("/profile/complete", completeProfile);

router.get("/connections", authMiddleware, getConnections);
router.get("/connections/requests", authMiddleware, getReceivedRequests);

router.get("/feed", authMiddleware, getUserFeed);

export default router;
