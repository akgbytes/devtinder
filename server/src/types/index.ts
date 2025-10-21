import { GenderType } from "@/utils/constants";
import { JwtPayload } from "jsonwebtoken";
import { Types } from "mongoose";

export interface TokenPayload extends JwtPayload {
  _id: Types.ObjectId;
  email: string;
}

export interface FullUser {
  _id: string;
  name: string;
  email: string;
  isEmailVerified: boolean;
  about: string;
  profilePicture: string;
  location: {
    city: string;
    state: string;
    country: string;
    coords: {
      type: "Point";
      coordinates: [number, number];
    };
  };
  dateOfBirth: Date;
  gender: GenderType;
  skills: string[];
  onboardingCompleted: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface FeedCursor {
  matchScore: number;
  distanceKm: number;
  _id: string;
}

export interface RazorpayPaymentEvent {
  entity: "event";
  account_id: string;
  event: "payment.captured" | "payment.failed";
  contains: string[];
  created_at: number;
  payload: {
    payment: {
      entity: RazorpayPaymentEntity;
    };
  };
}

export interface RazorpayPaymentEntity {
  id: string;
  entity: "payment";
  amount: number;
  currency: string;
  status: "captured" | "failed";
  order_id: string | null;
  invoice_id: string | null;
  international: boolean;
  method: "card" | "netbanking" | "wallet" | "upi";
  amount_refunded: number;
  refund_status: string | null;
  captured: boolean;
  description: string | null;
  card_id: string | null;
  bank: string | null;
  wallet: string | null;
  vpa: string | null;
  email: string;
  contact: string;
  notes: Record<string, string | number | boolean>[];
  fee: number | null;
  tax: number | null;
  error_code: string | null;
  error_description: string | null;
  error_source: string | null;
  error_step: string | null;
  error_reason: string | null;
  acquirer_data: RazorpayAcquirerData;
  created_at: number;
  // Optional extra fields for card-based payments
  card?: RazorpayCard;
  token_id?: string | null;
}

export interface RazorpayAcquirerData {
  auth_code?: string;
  rrn?: string;
  bank_transaction_id?: string | null;
}

export interface RazorpayCard {
  emi: boolean;
  entity: "card";
  id: string;
  iin: string;
  international: boolean;
  issuer: string | null;
  last4: string;
  name: string;
  network: "Visa" | "MasterCard" | "RuPay" | "Amex";
  sub_type: "business" | "consumer";
  type: "credit" | "debit";
}
