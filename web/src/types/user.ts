export type GenderType = "male" | "female" | "other";

export interface User {
  _id: string;
  name: string;
  email: string;
  avatar: string;
  age?: number;
  gender?: GenderType;
  about: string;
  skills: string[];
  createdAt: string;
  updatedAt: string;
}
