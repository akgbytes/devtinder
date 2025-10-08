import { getAutocompleteSuggestions } from "@/controllers/place.controller";
import { Router } from "express";

const router = Router();

router.post("/autocomplete", getAutocompleteSuggestions);

export default router;
