import { Gender, GenderType } from "@/utils/constants";
import { Schema, model, Document } from "mongoose";
import bcrypt from "bcryptjs";
import jwt, { SignOptions } from "jsonwebtoken";

export interface IUser extends Document {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  avatar: string;
  age: number;
  gender: GenderType;
  about: string;
  skills: string[];

  isPasswordCorrect(password: string): Promise<boolean>;
  generateJWT(): string;
}

const userSchema = new Schema<IUser>(
  {
    firstname: {
      type: String,
      required: true,
      trim: true,
      minLength: 3,
      maxLength: 50,
    },

    lastname: {
      type: String,
      required: true,
      trim: true,
      minLength: 3,
      maxLength: 50,
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
    },

    avatar: {
      type: String,
      default: "",
    },

    age: {
      type: Number,
      min: 18,
    },

    gender: {
      type: String,
      enum: {
        values: Object.values(Gender),
        message:
          "Invalid value '{VALUE}'. Please select between male, female, or other.",
      },
    },

    about: {
      type: String,
      default: "Default about of the user",
    },

    skills: {
      type: [String],
      default: [],
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
  return jwt.sign(
    {
      _id: this._id,
      email: this.email,
    },
    process.env.JWT_SECRET as string,
    { expiresIn: process.env.JWT_EXPIRES_IN as SignOptions["expiresIn"] }
  );
};

export const User = model("User", userSchema);
