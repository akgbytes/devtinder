import { GenderType } from "@/utils/constants";
import { JwtPayload } from "jsonwebtoken";
import { Types } from "mongoose";

export interface TokenPayload extends JwtPayload {
  _id: Types.ObjectId;
  email: string;
}

export interface FullUser {
  _id: string;
  name: string;
  email: string;
  isEmailVerified: boolean;
  about: string;
  profilePicture: string;
  location: {
    city: string;
    state: string;
    country: string;
    coords: {
      type: "Point";
      coordinates: [number, number];
    };
  };
  dateOfBirth: Date;
  gender: GenderType;
  skills: string[];
  onboardingCompleted: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface FeedCursor {
  matchScore: number;
  distanceKm: number;
  _id: string;
}
