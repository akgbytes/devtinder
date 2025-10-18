import { Payment } from "@/models/payment.model";
import { ApiResponse, asyncHandler } from "@/utils/core";
import { razorpay } from "@/utils/razorpay";
import { StatusCodes } from "http-status-codes";

export const createOrder = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  const order = await razorpay.orders.create({
    amount: 99900,
    currency: "INR",
    receipt: `receipt_${Date.now()}`,
    notes: {
      userId: userId.toString(),
      userName: "Aman Gupta",
      userEmail: "akgbytes@gmail.com",
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
