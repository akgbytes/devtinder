import { env } from "@/config/env";
import { Payment } from "@/models/payment.model";
import { User } from "@/models/user.model";
import { ApiError, ApiResponse, asyncHandler } from "@/utils/core";
import { razorpay } from "@/utils/razorpay";
import { StatusCodes } from "http-status-codes";
import { validateWebhookSignature } from "razorpay/dist/utils/razorpay-utils";

export const createOrder = asyncHandler(async (req, res) => {
  const userId = req.user._id;

  const user = await User.findById(userId).lean();

  if (!user) {
    throw new ApiError(401, "");
  }

  const order = await razorpay.orders.create({
    amount: 99900,
    currency: "INR",
    receipt: `receipt_${Date.now()}`,
    notes: {
      userName: user.name,
      userEmail: user.email,
      plan: "pro_lifetime",
    },
  });

  // Save to db
  const payment = await Payment.create({
    userId,
    orderId: order.id,
    amount: order.amount,
    currency: order.currency,
    metadata: order.notes,
    status: order.status,
    receipt: order.receipt,
    paymentId: null,
  });

  const response = new ApiResponse(
    StatusCodes.OK,
    "Order created successfully",
    payment
  );

  res.status(response.statusCode).json(response);
});

export const verifyPayment = asyncHandler(async (req, res) => {
  const signature = req.headers["x-razorpay-signature"] as string;

  try {
    validateWebhookSignature(req.body, signature, env.RAZORPAY_WEBHOOK_SECRET);
  } catch (error) {
    // throw new ApiError();
  }

  res.status(200).json({
    success: true,
  });
});

export const verifyPaymentStatus = asyncHandler(async (req, res) => {});
