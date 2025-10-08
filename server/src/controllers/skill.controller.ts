import { Skill } from "@/models/skill.model";
import { ApiResponse, asyncHandler } from "@/utils/core";
import { StatusCodes } from "http-status-codes";

export const getAllSkills = asyncHandler(async (req, res) => {
  const skills = await Skill.find().sort({ name: 1 }).lean();

  const response = new ApiResponse(
    StatusCodes.OK,
    "Skills fetched successfully",
    skills
  );

  return res.status(response.statusCode).json(response);
});
