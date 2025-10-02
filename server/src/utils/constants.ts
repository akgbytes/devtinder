export const Gender = {
  Male: "male",
  Female: "female",
  Other: "other",
} as const;

export type GenderType = (typeof Gender)[keyof typeof Gender];

export const ConnectionRequestStatus = {
  ignore: "ignore",
  interested: "interested",
  accepted: "accepted",
  rejected: "rejected",
} as const;

export type ConnectionRequestStatusType =
  (typeof ConnectionRequestStatus)[keyof typeof ConnectionRequestStatus];
