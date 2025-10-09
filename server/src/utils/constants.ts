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

export const NodeEnv = {
  DEVELOPMENT: "development",
  PRODUCTION: "production",
} as const;

export type NodeEnvType = (typeof NodeEnv)[keyof typeof NodeEnv];
