import { Schema, model, Model } from "mongoose";

export interface IRole {
  name: string;
  createdAt: Date;
  updatedAt: Date;
}

export type RoleModel = Model<IRole>;

const roleSchema = new Schema<IRole, RoleModel>(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      minlength: 3,
      maxlength: 100,
    },
  },
  { timestamps: true }
);

roleSchema.index({ name: 1 });

roleSchema.set("toJSON", {
  transform(doc, ret) {
    return {
      _id: ret._id,
      name: ret.name,
    };
  },
});

export const Role = model<IRole, RoleModel>("Role", roleSchema);
