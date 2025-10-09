import {
  ConnectionRequestStatus,
  ConnectionRequestStatusType,
} from "@/utils/constants";
import { Document, model, Schema } from "mongoose";

interface IConnectionRequest extends Document {
  fromUserId: Schema.Types.ObjectId;
  toUserId: Schema.Types.ObjectId;
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

// Pre-save hook to normalize user pair
connectionRequestSchema.pre("save", function (next) {
  if (this.fromUserId.toString() > this.toUserId.toString()) {
    const temp = this.fromUserId;
    this.fromUserId = this.toUserId;
    this.toUserId = temp;
  }
  next();
});

// Unique compound index on normalized pair
connectionRequestSchema.index({ fromUserId: 1, toUserId: 1 }, { unique: true });

export const ConnectionRequest = model(
  "connectionRequest",
  connectionRequestSchema
);
