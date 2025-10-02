import {
  getMe,
  updateProfile,
  changePassword,
} from "@/controllers/user.controller";
import { isLoggedIn } from "@/middlewares/auth.middleware";
import { Router } from "express";

const router = Router();

router.route("/profile").all(isLoggedIn).get(getMe).patch(updateProfile);
router.patch("/profile/password", isLoggedIn, changePassword);

export default router;
