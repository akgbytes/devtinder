import {
  ConnectionRequestStatus,
  ConnectionRequestStatusType,
} from "@/utils/constants";
import { Document, model, Schema } from "mongoose";

interface IConnectionRequest extends Document {
  fromUserId: Schema.Types.ObjectId;
  toUserId: Schema.Types.ObjectId;
  status: ConnectionRequestStatusType;
}

const connectionRequestSchema = new Schema<IConnectionRequest>({
  fromUserId: {
    type: Schema.Types.ObjectId,
    required: true,
  },

  toUserId: {
    type: Schema.Types.ObjectId,
    required: true,
  },

  status: {
    type: String,
    required: true,
    enum: {
      values: Object.values(ConnectionRequestStatus),
      message: `Invalid value '{VALUE}'. Please select between ${Object.values(
        ConnectionRequestStatus
      ).join(" | ")}`,
    },
  },
});

export const ConnectionRequest = model(
  "connectionRequest",
  connectionRequestSchema
);
