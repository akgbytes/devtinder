import type { ConnectionRequestStatusType } from "@/constants";
import type { User } from "./user";

export interface ApiResponse<T = unknown> {
  success: boolean;
  statusCode: number;
  message: string;
  data: T;
}

export interface ApiError {
  success: boolean;
  statusCode: number;
  message: string;
  errors: ValidationError[];
}

export interface ValidationError {
  field: string;
  message: string;
}

export interface TemporaryUserResponse {
  _id: string;
  name: string;
  email: string;
  isEmailVerified: boolean;
  onboardingCompleted: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface LocationSuggestion {
  placeId: string;
  displayName: string;
  city: string;
  state: string;
  country: string;
}

export interface Skill {
  _id: string;
  name: string;
}

export interface Connection {
  _id: string;
  fromUserId: User;
  toUserId: User;
  status: ConnectionRequestStatusType;
  createdAt: string;
  updatedAt: string;
}

export interface Feed {
  users: User[];
  pagination: {
    cursor: string | null;
    limit: number;
    total: number;
    hasMore: boolean;
  };
}

export interface PaymentData {
  _id: string;
  userId: string;
  amount: number;
  currency: string;
  metadata: {
    plan: string;
    userEmail: string;
    userName: string;
  };
  orderId: string;
  paymentId: string | null;
  receipt: string;
  status: string;
  createdAt: string;
  updatedAt: string;
}
