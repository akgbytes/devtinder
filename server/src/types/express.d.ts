import { IUser } from "@/models/user.model";

export type User = Pick<IUser, "_id" | "email">;

declare global {
  namespace Express {
    export interface Request {
      user: User;
    }
  }
}
