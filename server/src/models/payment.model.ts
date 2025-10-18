import { model, Model, Schema } from "mongoose";

export interface IPayment {
  orderId: string;
  paymentId: string | null;
  userId: Schema.Types.ObjectId;
  currency: string;
  amount: number;
  receipt: string;
  metadata: Record<string, string>;
  status: string;
  createdAt: Date;
  updatedAt: Date;
}

export type PaymentModel = Model<IPayment>;

export const paymentSchema = new Schema<IPayment, PaymentModel>(
  {
    orderId: {
      type: String,
      required: true,
    },
    paymentId: {
      type: String,
      default: null,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    currency: {
      type: String,
      required: true,
      default: "INR",
    },
    receipt: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
    },
    metadata: {
      type: Map,
      of: String,
    },
  },
  { timestamps: true }
);

paymentSchema.set("toJSON", {
  transform(doc, ret) {
    const { __v, ...rest } = ret;
    return rest;
  },
});

export const Payment = model<IPayment, PaymentModel>("Payment", paymentSchema);
