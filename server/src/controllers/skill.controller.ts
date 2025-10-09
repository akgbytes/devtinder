import { logger } from "@/config/logger";
import { Skill } from "@/models/skill.model";
import { getCache, setCache } from "@/utils/cache";
import { ApiResponse, asyncHandler } from "@/utils/core";
import { StatusCodes } from "http-status-codes";

export const getAllSkills = asyncHandler(async (req, res) => {
  logger.info("Skills fetch request");

  const cacheKey = `skills:getAllSkills`;
  const cached = await getCache<{ _id: string; name: string }[]>(cacheKey);

  if (cached) {
    logger.info("Skills cache hit", { cacheKey });
    const response = new ApiResponse(
      StatusCodes.OK,
      "Skills retrieved successfully",
      cached
    );

    return res.status(response.statusCode).json(response);
  }

  logger.info("Skills cache miss");

  const skills = await Skill.find();

  await setCache(cacheKey, skills);
  logger.info("Skills cached");

  const response = new ApiResponse(
    StatusCodes.OK,
    "Skills retrieved successfully",
    skills
  );

  res.status(response.statusCode).json(response);
});
