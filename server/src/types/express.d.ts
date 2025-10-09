import { Types } from "mongoose";

export type User = {
  _id: Types.ObjectId;
  email: string;
};

declare global {
  namespace Express {
    export interface Request {
      user: User;
    }
  }
}
