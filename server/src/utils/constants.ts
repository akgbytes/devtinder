export const Gender = {
  Male: "male",
  Female: "female",
  Other: "other",
} as const;

export type GenderType = (typeof Gender)[keyof typeof Gender];

export const ConnectionRequestStatus = {
  Ignored: "ignored",
  Interested: "interested",
  Accepted: "accepted",
  Rejected: "rejected",
} as const;

export type ConnectionRequestStatusType =
  (typeof ConnectionRequestStatus)[keyof typeof ConnectionRequestStatus];

export const NodeEnv = {
  Development: "development",
  Production: "production",
} as const;

export type NodeEnvType = (typeof NodeEnv)[keyof typeof NodeEnv];

export type OnboardingStepType = 0 | 1 | 2 | 3;

export type Onboarding = {
  step: OnboardingStepType;
  description: string;
}[];

export const onboardingSteps: Onboarding = [
  { step: 0, description: "Not started" },
  { step: 1, description: "Verify email" },
  { step: 2, description: "Fill profile details" },
  { step: 3, description: "Completed" },
];
