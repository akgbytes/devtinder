import { model, Model, Types, Schema } from "mongoose";
import { Gender, GenderType } from "@/utils/constants";
import bcrypt from "bcryptjs";
import { env } from "@/config/env";
import crypto from "crypto";

export interface IUser {
  name: string;
  email: string;
  password: string;

  isEmailVerified: boolean;
  otp: string | null;
  otpExpiry: Date | null;

  onboardingCompleted: boolean;

  about: string;
  profilePicture: string;
  gender: GenderType;
  dateOfBirth: Date;
  skills: Types.ObjectId[];
  location: {
    city: string;
    state: string;
    country: string;
    coords: {
      type: "Point";
      coordinates: [number, number];
    };
  };

  isPremium: boolean;
  refreshToken: string;

  createdAt: Date;
  updatedAt: Date;
}

export interface IUserMethods {
  isPasswordCorrect(password: string): Promise<boolean>;
  generateOtpWithExpiry(): { otp: string; otpExpiry: Date };
  verifyOtp(providedOtp: string): boolean;
  clearOtp(): void;
}

type UserModel = Model<IUser, {}, IUserMethods>;

export const userSchema = new Schema<IUser, UserModel, IUserMethods>(
  {
    name: {
      type: String,
      trim: true,
      required: [true, "Name is required"],
      minlength: [3, "Name must be at least 3 characters"],
      maxlength: [50, "Name must not exceed 50 characters"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [6, "Password must be at least 6 characters"],
      maxlength: 128,
    },

    isEmailVerified: {
      type: Boolean,
      default: false,
    },
    otp: {
      type: String,
      default: null,
    },
    otpExpiry: {
      type: Date,
      default: null,
    },

    onboardingCompleted: {
      type: Boolean,
      default: false,
    },

    profilePicture: {
      type: String,
      default:
        "https://res.cloudinary.com/dmnh10etf/image/upload/v1750270944/default_epnleu.png",
    },

    dateOfBirth: {
      type: Date,
      validate: {
        validator: function (value: Date) {
          const eighteenYearsAgo = new Date();
          eighteenYearsAgo.setFullYear(eighteenYearsAgo.getFullYear() - 18);
          return value <= eighteenYearsAgo;
        },
        message: "You must be at least 18 years old",
      },
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
      maxlength: [1000, "About section must not exceed 1000 characters"],
      default: "",
    },

    skills: {
      type: [{ type: Types.ObjectId, ref: "Skill" }],
      default: [],
      validate: [
        (val: Types.ObjectId[]) => val.length <= 20,
        "Maximum 20 skills allowed",
      ],
    },

    location: {
      city: { type: String, default: "" },
      state: { type: String, default: "" },
      country: { type: String, default: "" },
      coords: {
        type: { type: String, enum: ["Point"], default: "Point" },
        coordinates: { type: [Number], default: [0, 0] },
      },
    },

    isPremium: {
      type: Boolean,
      default: false,
      required: true,
    },

    refreshToken: {
      type: String,
    },
  },

  {
    timestamps: true,
  }
);

userSchema.index({ "location.coords": "2dsphere" });

// Compound index for feed queries
userSchema.index({
  onboardingCompleted: 1,
  isEmailVerified: 1,
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  this.password = await bcrypt.hash(this.password, 12);
  next();
});

userSchema.methods.isPasswordCorrect = async function (
  password: string
): Promise<boolean> {
  return await bcrypt.compare(password, this.password);
};

userSchema.methods.generateOtpWithExpiry = function () {
  const otp = crypto.randomInt(100000, 999999).toString();
  const otpExpiry = new Date(Date.now() + env.OTP_EXPIRY_MINUTES * 60 * 1000);

  this.otp = crypto.createHash("sha256").update(otp).digest("hex");
  this.otpExpiry = otpExpiry;

  return { otp, otpExpiry };
};

userSchema.methods.verifyOtp = function (providedOtp: string): boolean {
  if (!this.otp || !this.otpExpiry) {
    return false;
  }

  if (new Date() > this.otpExpiry) {
    return false;
  }

  const hashedProvidedOtp = crypto
    .createHash("sha256")
    .update(providedOtp)
    .digest("hex");

  // throws error in case of different buffer lengths
  try {
    return crypto.timingSafeEqual(
      Buffer.from(hashedProvidedOtp),
      Buffer.from(this.otp)
    );
  } catch (error) {
    return false;
  }
};

userSchema.methods.clearOtp = function (): void {
  this.otp = null;
  this.otpExpiry = null;
};

userSchema.set("toJSON", {
  transform(doc, ret) {
    return {
      _id: ret._id,
      name: ret.name,
      email: ret.email,
      isEmailVerified: ret.isEmailVerified,
      onboardingCompleted: ret.onboardingCompleted,
      about: ret.about,
      profilePicture: ret.profilePicture,
      location: ret.location,
      dateOfBirth: ret.dateOfBirth,
      gender: ret.gender,
      skills: ret.skills,
      isPremium: ret.isPremium,
      createdAt: ret.createdAt,
      updatedAt: ret.updatedAt,
    };
  },
});

export const User = model<IUser, UserModel>("User", userSchema);
