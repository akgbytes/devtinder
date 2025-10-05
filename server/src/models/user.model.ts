import { Gender, GenderType } from "@/utils/constants";
import { Schema, model, Document } from "mongoose";
import bcrypt from "bcryptjs";
import jwt, { SignOptions } from "jsonwebtoken";

export interface IUser extends Document {
  // registration details
  email: string;
  password: string;

  // email verification
  isEmailVerified: boolean;
  emailVerificationCode: string;
  emailVerificationCodeExpiry: Date;

  // onboarding process track
  onboardingCompleted: boolean;
  onboardingStep: number;

  // optional fields filled during onboarding
  name?: string;
  profilePicture?: string;
  age?: number;
  gender?: GenderType;
  about?: string;
  skills?: string[];
  location?: string;

  // timestamps
  createdAt: Date;
  updatedAt: Date;

  // user methods
  isPasswordCorrect(password: string): Promise<boolean>;
  generateJWT(): string;
}

const userSchema = new Schema<IUser>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      minLength: [3, "First name must be at least 3 characters long"],
      maxLength: [50, "First name cannot exceed 50 characters"],
    },

    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },

    password: {
      type: String,
      required: true,
      minLength: [6, "Password must be at least 6 characters long"],
    },

    profilePicture: {
      type: String,
      default:
        "https://res.cloudinary.com/dmnh10etf/image/upload/v1750270944/default_epnleu.png",
    },

    age: {
      type: Number,
      min: [18, "You must be at least 18 years old"],
      max: [120, "Please provide a valid age"],
    },

    gender: {
      type: String,
      enum: {
        values: Object.values(Gender),
        message: `Invalid value '{VALUE}'. Please select between ${Object.values(
          Gender
        ).join(" | ")}`,
      },
    },

    about: {
      type: String,
      default: "Default about of the user",
      maxLength: [500, "About section cannot exceed 500 characters"],
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

export const User = model("User", userSchema);
