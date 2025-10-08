import { Role } from "@/models/role.schema";
import { ApiResponse, asyncHandler } from "@/utils/core";
import { StatusCodes } from "http-status-codes";

export const getAllRoles = asyncHandler(async (req, res) => {
  const roles = await Role.find().sort({ name: 1 }).lean();

  const response = new ApiResponse(
    StatusCodes.OK,
    "Roles fetched successfully",
    roles
  );

  return res.status(response.statusCode).json(response);
});
