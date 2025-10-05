import { Schema, model, Document, Model } from "mongoose";
import bcrypt from "bcryptjs";
import jwt, { SignOptions } from "jsonwebtoken";
import crypto from "crypto";

import { Gender, GenderType, onboardingSteps } from "@/utils/constants";

const validSteps = onboardingSteps.map((s) => s.step);

export interface IUser {
  name: string;
  email: string;
  password: string;

  isEmailVerified: boolean;
  otp: string | null;
  otpExpiry: Date | null;

  onboardingCompleted: boolean;
  onboardingStep: number;

  profilePicture: string;
  age: number;
  gender: GenderType;
  about: string;
  skills: string[];
  location: string;

  createdAt: Date;
  updatedAt: Date;
}

export interface IUserMethods {
  isPasswordCorrect(password: string): Promise<boolean>;
  generateJWT(): string;
  generateOtpWithExpiry(): { otp: string; otpExpiry: Date };
  verifyOtp(otp: string): boolean;
  clearOtp(): void;
  advanceOnboarding(): void;
  getOnboardingProgress(): {
    onboardingStep: number;
    onboardingStepDescription: string;
    onboardingCompleted: boolean;
    totalSteps: number;
  };
}

export type UserModel = Model<IUser, {}, IUserMethods>;

const userSchema = new Schema<IUser, UserModel, IUserMethods>(
  {
    name: {
      type: String,
      trim: true,
      required: true,
      minlength: 3,
      maxlength: 50,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    password: { type: String, required: true, minlength: 6, maxlength: 128 },

    isEmailVerified: { type: Boolean, default: false },
    otp: { type: String, default: null },
    otpExpiry: { type: Date, default: null },

    onboardingStep: {
      type: Number,
      default: 0,
      enum: {
        values: validSteps,
        message: `Invalid onboarding step. Must be one of: ${validSteps.join(
          ", "
        )}`,
      },
    },
    onboardingCompleted: { type: Boolean, default: false },

    profilePicture: {
      type: String,
      default:
        "https://res.cloudinary.com/dmnh10etf/image/upload/v1750270944/default_epnleu.png",
    },
    age: {
      type: Number,
      min: 18,
      max: 120,
    },
    gender: {
      type: String,
      enum: {
        values: Object.values(Gender),
        message: `Invalid gender value. Must be one of: ${Object.values(
          Gender
        ).join(", ")}`,
      },
    },
    about: {
      type: String,
      maxlength: 500,
    },
    skills: {
      type: [String],
      default: [],
      validate: {
        validator: function (v: string[]) {
          return v.length <= 20;
        },
        message: "You cannot add more than 20 skills",
      },
    },
    location: {
      type: String,
      trim: true,
    },
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

userSchema.methods.isPasswordCorrect = async function (
  password: string
): Promise<boolean> {
  return await bcrypt.compare(password, this.password);
};

userSchema.methods.generateJWT = function (): string {
  const payload = {
    _id: this._id,
    email: this.email,
  };

  const secret = process.env.JWT_SECRET as string;
  const expiresIn = process.env.JWT_EXPIRES_IN as SignOptions["expiresIn"];

  return jwt.sign(payload, secret, { expiresIn });
};

userSchema.methods.generateOtpWithExpiry = function () {
  const otp = crypto.randomInt(100000, 999999).toString();
  const otpExpiry = new Date(Date.now() + 15 * 60 * 1000); // 15 min

  this.otp = crypto.createHash("sha256").update(otp).digest("hex");
  this.otpExpiry = otpExpiry;

  return { otp, otpExpiry };
};

userSchema.methods.verifyOtp = function (otp) {
  if (new Date() > this.otpExpiry!) {
    return false;
  }
  const hashedOtp = crypto.createHash("sha256").update(otp).digest("hex");
  return hashedOtp === this.otp;
};

userSchema.methods.clearOtp = function (): void {
  this.otp = null;
  this.otpExpiry = null;
};

userSchema.methods.advanceOnboarding = function (): void {
  const maxStep = onboardingSteps.length - 1;
  if (this.onboardingStep < maxStep) {
    this.onboardingStep += 1;
  }
  this.onboardingCompleted = this.onboardingStep === maxStep;
};

userSchema.methods.getOnboardingProgress = function () {
  const stepDescription =
    onboardingSteps[this.onboardingStep]?.description || "Unknown step";
  return {
    onboardingStep: this.onboardingStep,
    onboardingStepDescription: stepDescription,
    onboardingCompleted: this.onboardingCompleted,
    totalSteps: onboardingSteps.length,
  };
};

userSchema.set("toJSON", {
  transform(doc, ret) {
    return {
      _id: ret._id,
      name: ret.name,
      email: ret.email,
      profilePicture: ret.profilePicture,
      age: ret.age,
      gender: ret.gender,
      about: ret.about,
      skills: ret.skills,
      createdAt: ret.createdAt,
      updatedAt: ret.updatedAt,
    };
  },
});

userSchema.set("toObject", {
  transform(doc, ret) {
    return {
      _id: ret._id,
      name: ret.name,
      email: ret.email,
      profilePicture: ret.profilePicture,
      age: ret.age,
      gender: ret.gender,
      about: ret.about,
      skills: ret.skills,
      createdAt: ret.createdAt,
      updatedAt: ret.updatedAt,
    };
  },
});

export const User = model<IUser, UserModel>("User", userSchema);
