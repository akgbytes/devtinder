export const BASE_URL = `${import.meta.env.VITE_API_URL}/api/v1`;

export const Gender = {
  Male: "male",
  Female: "female",
  Other: "other",
} as const;

export type GenderType = (typeof Gender)[keyof typeof Gender];
