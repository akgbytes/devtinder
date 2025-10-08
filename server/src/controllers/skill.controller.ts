import { logger } from "@/config/logger";
import { Skill } from "@/models/skill.model";
import { getCache, setCache } from "@/utils/cache";
import { ApiResponse, asyncHandler } from "@/utils/core";
import { StatusCodes } from "http-status-codes";

export const getAllSkills = asyncHandler(async (req, res) => {
  const cacheKey = `skills:getAllSkills`;
  const cached = await getCache<{ _id: string; name: string }[]>(cacheKey);

  if (cached) {
    logger.info("Cache hit");
    const response = new ApiResponse(
      StatusCodes.OK,
      "Skills fetched successfully",
      cached
    );

    return res.status(response.statusCode).json(response);
  }

  const skills = await Skill.find().lean();

  await setCache(cacheKey, skills);

  const response = new ApiResponse(
    StatusCodes.OK,
    "Skills fetched successfully",
    skills
  );

  return res.status(response.statusCode).json(response);
});
