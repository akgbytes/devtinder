import { Router } from "express";
import { getAllSkills } from "@/controllers/skill.controller";

const router = Router();

router.get("/", getAllSkills);

export default router;
