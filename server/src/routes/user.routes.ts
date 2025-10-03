import { Router } from "express";
import { isLoggedIn } from "@/middlewares/auth.middleware";
import {
  getProfile,
  updateProfile,
  changePassword,
} from "@/controllers/user.controller";

const router = Router();

router.route("/profile").all(isLoggedIn).get(getProfile).patch(updateProfile);
router.patch("/profile/password", isLoggedIn, changePassword);

export default router;
