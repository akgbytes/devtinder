import { env } from "@/config/env";
import { Payment } from "@/models/payment.model";
import { User } from "@/models/user.model";
import { ApiError, ApiResponse, asyncHandler } from "@/utils/core";
import { razorpay } from "@/utils/razorpay";
import { StatusCodes } from "http-status-codes";
import { validateWebhookSignature } from "razorpay/dist/utils/razorpay-utils";
import type { RazorpayPaymentEvent } from "@/types";
import mongoose from "mongoose";

export const createOrder = asyncHandler(async (req, res) => {
  const userId = req.user._id;

  const user = await User.findById(userId).lean();
  if (!user) {
    throw new ApiError(StatusCodes.UNAUTHORIZED, "User not found");
  }

  const order = await razorpay.orders.create({
    amount: 99900, // amount in paise
    currency: "INR",
    receipt: `receipt_${Date.now()}`,
    notes: {
      userName: user.name,
      userEmail: user.email,
      plan: "premium_lifetime",
    },
  });

  // Save order details in DB
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

export const paymentWebhook = asyncHandler(async (req, res) => {
  const signature = req.headers["x-razorpay-signature"] as string;

  if (!signature) {
    throw new ApiError(StatusCodes.BAD_REQUEST, "Missing Razorpay signature");
  }

  try {
    // Verify webhook authenticity
    validateWebhookSignature(
      JSON.stringify(req.body),
      signature,
      env.RAZORPAY_WEBHOOK_SECRET
    );
  } catch {
    throw new ApiError(StatusCodes.UNAUTHORIZED, "Invalid webhook signature");
  }

  const event = req.body as RazorpayPaymentEvent;
  const paymentEntity = event.payload.payment.entity;

  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    // Update payment record in DB
    const updatedPayment = await Payment.findOneAndUpdate(
      { orderId: paymentEntity.order_id },
      {
        paymentId: paymentEntity.id,
        status: paymentEntity.status,
        metadata: paymentEntity,
      },
      { new: true, session }
    );

    if (!updatedPayment) {
      throw new ApiError(StatusCodes.NOT_FOUND, "Order not found");
    }

    if (paymentEntity.status === "captured") {
      await User.findByIdAndUpdate(
        updatedPayment.userId,
        {
          $set: {
            isPremium: true,
          },
        },
        { session }
      );
    }

    await session.commitTransaction();

    const response = new ApiResponse(
      StatusCodes.OK,
      `Payment ${paymentEntity.status}`,
      updatedPayment
    );

    res.status(response.statusCode).json(response);
  } catch (err) {
    await session.abortTransaction();

    console.error("Transaction failed:", err);
    throw new ApiError(StatusCodes.INTERNAL_SERVER_ERROR, "Transaction failed");
  } finally {
    session.endSession();
  }
});

// Client-side confirmation
export const getPaymentStatus = asyncHandler(async (req, res) => {
  const { orderId } = req.query;

  if (!orderId) {
    throw new ApiError(StatusCodes.BAD_REQUEST, "Order ID is required");
  }

  const order = await razorpay.orders.fetch(orderId as string);

  if (!order) {
    throw new ApiError(StatusCodes.NOT_FOUND, "Order not found");
  }

  const payment = await Payment.findOne({ orderId });

  if (!payment) {
    throw new ApiError(StatusCodes.NOT_FOUND, "Payment not found");
  }

  const response = new ApiResponse(
    StatusCodes.OK,
    "Payment status retrieved successfully",
    {
      orderStatus: order.status,
      paymentStatus: payment.status,
    }
  );

  res.status(response.statusCode).json(response);
});
