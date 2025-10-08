import { JwtPayload } from "jsonwebtoken";
import { Types } from "mongoose";

export interface TokenPayload extends JwtPayload {
  _id: Types.ObjectId;
  email: string;
}
