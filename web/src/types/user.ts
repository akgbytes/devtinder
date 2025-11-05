import type { GenderType } from "@/constants";

export interface User {
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
  dateOfBirth: string;
  isPremium: boolean;
  gender: GenderType;
  skills: { _id: string; name: string }[];
  onboardingCompleted: boolean;
  createdAt: string;
  updatedAt: string;
}
