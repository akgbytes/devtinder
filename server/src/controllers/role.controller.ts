import { logger } from "@/config/logger";
import { Role } from "@/models/role.schema";
import { getCache, setCache } from "@/utils/cache";
import { ApiResponse, asyncHandler } from "@/utils/core";
import { StatusCodes } from "http-status-codes";

export const getAllRoles = asyncHandler(async (req, res) => {
  const cacheKey = `skills:getAllRoles`;
  const cached = await getCache<{ _id: string; name: string }[]>(cacheKey);

  if (cached) {
    logger.info("Cache hit");
    const response = new ApiResponse(
      StatusCodes.OK,
      "Roles fetched successfully",
      cached
    );

    return res.status(response.statusCode).json(response);
  }

  const roles = await Role.find().lean();

  await setCache(cacheKey, roles);

  const response = new ApiResponse(
    StatusCodes.OK,
    "Roles fetched successfully",
    roles
  );

  return res.status(response.statusCode).json(response);
});
