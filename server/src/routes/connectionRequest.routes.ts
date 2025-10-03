import { sendConnectionRequest } from "@/controllers/connectionRequest.controller";
import { isLoggedIn } from "@/middlewares/auth.middleware";
import { Router } from "express";

const router = Router();

router.post("/send/:status/:toUserId", isLoggedIn, sendConnectionRequest);

export default router;
