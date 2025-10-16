import {
  ConnectionRequestStatus,
  ConnectionRequestStatusType,
} from "@/utils/constants";
import { Document, model, Schema } from "mongoose";

interface IConnectionRequest extends Document {
  fromUserId: Schema.Types.ObjectId;
  toUserId: Schema.Types.ObjectId;
  pairKey: string;
  status: ConnectionRequestStatusType;
  createdAt: Date;
  updatedAt: Date;
}

const connectionRequestSchema = new Schema<IConnectionRequest>(
  {
    fromUserId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },

    toUserId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },

    pairKey: {
      type: String,
      required: true,
      unique: true,
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
  },
  { timestamps: true }
);

connectionRequestSchema.set("toJSON", {
  transform(doc, ret) {
    return {
      _id: ret._id,
      fromUserId: ret.fromUserId,
      toUserId: ret.toUserId,
      status: ret.status,
      createdAt: ret.createdAt,
      updatedAt: ret.updatedAt,
    };
  },
});

export const ConnectionRequest = model(
  "connectionRequest",
  connectionRequestSchema
);
