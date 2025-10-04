export type GenderType = "male" | "female" | "other";

export interface User {
  _id: string;
  firstname: string;
  lastname: string;
  email: string;
  avatar: string;
  age?: number;
  gender?: GenderType;
  about: string;
  skills: string[];
  createdAt: string;
  updatedAt: string;
}
