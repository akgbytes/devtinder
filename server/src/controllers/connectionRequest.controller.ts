import { ConnectionRequest } from "@/models/connectionRequest.model";
import { User } from "@/models/user.model";
import { ConnectionRequestStatusType } from "@/utils/constants";
import { ApiError, ApiResponse, asyncHandler } from "@/utils/core";
import { validateObjectId } from "@/utils/helper";
import { StatusCodes } from "http-status-codes";

export const createConnectionRequest = asyncHandler(async (req, res) => {
  const status = req.params.status as string;
  const toUserId = req.params.toUserId as string;
  const fromUserId = req.user._id as string;

  // validate object id
  validateObjectId(toUserId, "target user");

  // validate status
  const allowedStatus = ["interested", "ignored"];
  if (!allowedStatus.includes(status)) {
    throw new ApiError(
      StatusCodes.BAD_REQUEST,
      `Invalid request status: ${status}. Only ${allowedStatus.join(
        " or "
      )} is allowed.`
    );
  }

  // prevent self-requests
  if (toUserId === fromUserId) {
    throw new ApiError(
      StatusCodes.BAD_REQUEST,
      "You cannot send a request to yourself"
    );
  }

  // check if toUserId exists
  const toUserExists = await User.findById(toUserId);
  if (!toUserExists) {
    throw new ApiError(StatusCodes.NOT_FOUND, "Target user does not exists");
  }

  // check if request already exists
  const existingRequest = await ConnectionRequest.findOne({
    $or: [
      { fromUserId, toUserId },
      { fromUserId: toUserId, toUserId: fromUserId },
    ],
  });

  if (existingRequest) {
    throw new ApiError(
      StatusCodes.CONFLICT,
      "A connection request already exists"
    );
  }

  // create connection request
  await ConnectionRequest.create({
    fromUserId,
    toUserId,
    status,
  });

  const message =
    status === "interested"
      ? "Connection request sent successfully"
      : "Connection request ignored";

  const response = new ApiResponse(StatusCodes.CREATED, message, null);

  res.status(response.statusCode).json(response);
});

export const reviewConnectionRequest = asyncHandler(async (req, res) => {
  const requestId = req.params.requestId as string;
  const status = req.params.status as string;
  const userId = req.user._id as string;

  // validate object id
  validateObjectId(requestId, "request");

  // validate status
  const allowedStatus = ["accepted", "rejected"];
  if (!allowedStatus.includes(status)) {
    throw new ApiError(
      StatusCodes.BAD_REQUEST,
      `Invalid request status: ${status}. Only ${allowedStatus.join(
        " or "
      )} is allowed.`
    );
  }

  // check if request exists
  const connectionRequest = await ConnectionRequest.findOne({
    _id: requestId,
    toUserId: userId,
    status: "interested",
  });

  if (!connectionRequest)
    throw new ApiError(
      StatusCodes.NOT_FOUND,
      "Connection request does not exist"
    );

  connectionRequest.status = status as ConnectionRequestStatusType;
  await connectionRequest.save();

  const response = new ApiResponse(
    StatusCodes.OK,
    `Connection request ${status} successfully.`,
    connectionRequest
  );

  res.status(response.statusCode).json(response);
});
