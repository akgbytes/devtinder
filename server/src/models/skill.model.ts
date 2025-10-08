import { Schema, model, Model } from "mongoose";

export interface ISkill {
  name: string;
  createdAt: Date;
  updatedAt: Date;
}

export type SkillModel = Model<ISkill>;

const skillSchema = new Schema<ISkill, SkillModel>(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      minlength: 2,
      maxlength: 50,
    },
  },
  { timestamps: true }
);

skillSchema.index({ name: 1 });

skillSchema.set("toJSON", {
  transform(doc, ret) {
    return {
      _id: ret._id,
      name: ret.name,
    };
  },
});

export const Skill = model<ISkill, SkillModel>("Skill", skillSchema);
