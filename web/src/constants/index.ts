export const BASE_URL = `${import.meta.env.VITE_API_URL}/api/v1`;

export const Gender = {
  MALE: "male",
  FEMALE: "female",
  OTHER: "other",
} as const;

export type GenderType = (typeof Gender)[keyof typeof Gender];

export const ConnectionRequestStatus = {
  IGNORED: "ignored",
  INTERESTED: "interested",
  ACCEPTED: "accepted",
  REJECTED: "rejected",
} as const;

export type ConnectionRequestStatusType =
  (typeof ConnectionRequestStatus)[keyof typeof ConnectionRequestStatus];
