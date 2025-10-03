import { Router } from "express";
import { isLoggedIn } from "@/middlewares/auth.middleware";
import {
  getProfile,
  updateProfile,
  changePassword,
  getConnections,
  getReceivedRequests,
} from "@/controllers/user.controller";

const router = Router();

router.route("/profile").all(isLoggedIn).get(getProfile).patch(updateProfile);
router.patch("/profile/password", isLoggedIn, changePassword);

router.get("/connections", isLoggedIn, getConnections);
router.get("/connections/requests", isLoggedIn, getReceivedRequests);

export default router;
