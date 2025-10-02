export const Gender = {
  Male: "male",
  Female: "female",
  Other: "other",
} as const;

export type GenderType = (typeof Gender)[keyof typeof Gender];
