import { logger } from "@/config/logger";
import { ConnectionRequest } from "@/models/connectionRequest.model";
import { User } from "@/models/user.model";
import {
  ConnectionRequestStatus,
  ConnectionRequestStatusType,
} from "@/utils/constants";
import { ApiError, ApiResponse, asyncHandler } from "@/utils/core";
import { validateObjectId } from "@/utils/helper";
import { StatusCodes } from "http-status-codes";

export const createConnectionRequest = asyncHandler(async (req, res) => {
  const status = req.params.status as string;
  const toUserId = req.params.toUserId as string;
  const fromUserId = req.user._id;

  logger.info("Connection request attempt", { fromUserId, toUserId, status });

  // Validate target user ID
  validateObjectId(toUserId, "Target user");

  // Validate status
  const allowedStatus = ["ignored", "interested"];

  if (!allowedStatus.includes(status)) {
    logger.warn("Invalid connection request status", { status });
    throw new ApiError(
      StatusCodes.BAD_REQUEST,
      `Invalid request status. Allowed values: ${allowedStatus.join(" or ")}`
    );
  }

  // Prevent self-requests
  if (toUserId === fromUserId.toString()) {
    logger.warn("Self-connection request attempt", { userId: fromUserId });
    throw new ApiError(
      StatusCodes.BAD_REQUEST,
      "You cannot send a connection request to yourself"
    );
  }

  // Check if target user exists
  const toUser = await User.findById(toUserId);
  if (!toUser) {
    logger.warn("Connection request to non-existent user", { toUserId });
    throw new ApiError(
      StatusCodes.NOT_FOUND,
      "The user you're trying to connect with does not exist"
    );
  }

  // Check for existing connection request in either direction
  const existingRequest = await ConnectionRequest.findOne({
    $or: [
      { fromUserId, toUserId },
      { fromUserId: toUserId, toUserId: fromUserId },
    ],
  });

  if (existingRequest) {
    logger.info("Duplicate connection request", {
      existingRequestId: existingRequest._id,
      existingStatus: existingRequest.status,
    });

    // Context-specific messages
    if (existingRequest.status === ConnectionRequestStatus.ACCEPTED) {
      throw new ApiError(
        StatusCodes.CONFLICT,
        "You are already connected with this user"
      );
    } else if (existingRequest.status === ConnectionRequestStatus.INTERESTED) {
      const isPending =
        existingRequest.toUserId.toString() === fromUserId.toString();
      if (isPending) {
        throw new ApiError(
          StatusCodes.CONFLICT,
          "This user has already sent you a connection request. Please review it in your pending requests."
        );
      } else {
        throw new ApiError(
          StatusCodes.CONFLICT,
          "You have already sent a connection request to this user. Please wait for their response."
        );
      }
    } else if (existingRequest.status === ConnectionRequestStatus.IGNORED) {
      throw new ApiError(
        StatusCodes.CONFLICT,
        "You have previously ignored this user"
      );
    } else if (existingRequest.status === ConnectionRequestStatus.REJECTED) {
      throw new ApiError(
        StatusCodes.CONFLICT,
        "A previous connection request was not accepted"
      );
    }
  }

  // Create connection request
  const connectionRequest = await ConnectionRequest.create({
    fromUserId,
    toUserId,
    status: status as ConnectionRequestStatusType,
  });

  logger.info("Connection request created", {
    requestId: connectionRequest._id,
    fromUserId,
    toUserId,
    status,
  });

  const message =
    status === ConnectionRequestStatus.INTERESTED
      ? "Connection request sent successfully!"
      : "User ignored successfully";

  const response = new ApiResponse(
    StatusCodes.CREATED,
    message,
    connectionRequest
  );

  res.status(response.statusCode).json(response);
});

export const reviewConnectionRequest = asyncHandler(async (req, res) => {
  const requestId = req.params.requestId as string;
  const status = req.params.status as string;
  const userId = req.user._id.toString();

  logger.info("Connection request review attempt", {
    requestId,
    userId,
    status,
  });

  // Validate request ID
  validateObjectId(requestId, "Connection request");

  // Validate status
  const allowedStatus = ["accepted", "rejected"];

  if (!allowedStatus.includes(status)) {
    logger.warn("Invalid review status", { status });
    throw new ApiError(
      StatusCodes.BAD_REQUEST,
      `Invalid status. Allowed values: ${allowedStatus.join(" or ")}`
    );
  }
  // Find the connection request
  const connectionRequest = await ConnectionRequest.findById(requestId);

  if (!connectionRequest) {
    logger.warn("Connection request not found", { requestId });
    throw new ApiError(StatusCodes.NOT_FOUND, "Connection request not found");
  }

  // Verify authorization - only the recipient can review
  if (connectionRequest.toUserId.toString() !== userId) {
    logger.warn("Unauthorized review attempt", { requestId, userId });
    throw new ApiError(
      StatusCodes.FORBIDDEN,
      "You are not authorized to review this connection request"
    );
  }

  // Check if request is in reviewable state
  if (connectionRequest.status !== ConnectionRequestStatus.INTERESTED) {
    logger.info("Request already reviewed", {
      requestId,
      currentStatus: connectionRequest.status,
    });

    const statusMessage =
      connectionRequest.status === ConnectionRequestStatus.ACCEPTED
        ? "already accepted"
        : connectionRequest.status === ConnectionRequestStatus.REJECTED
        ? "already rejected"
        : "not available for review";

    throw new ApiError(
      StatusCodes.BAD_REQUEST,
      `This connection request has been ${statusMessage}.`
    );
  }

  // Update status in db
  connectionRequest.status = status as ConnectionRequestStatusType;
  await connectionRequest.save();

  logger.info("Connection request reviewed successfully", {
    requestId,
    status,
    reviewedBy: userId,
  });

  const message =
    status === ConnectionRequestStatus.ACCEPTED
      ? "Connection request accepted! You are now connected"
      : "Connection request rejected";

  const response = new ApiResponse(StatusCodes.OK, message, connectionRequest);

  res.status(response.statusCode).json(response);
});
