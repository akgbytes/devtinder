import {
  createConnectionRequest,
  reviewConnectionRequest,
} from "@/controllers/connectionRequest.controller";
import { isLoggedIn } from "@/middlewares/auth.middleware";
import { Router } from "express";

const router = Router();

router.post("/request/:toUserId/:status", isLoggedIn, createConnectionRequest);
router.post("/review/:requestId/:status", isLoggedIn, reviewConnectionRequest);

export default router;
