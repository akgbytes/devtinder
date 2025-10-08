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
      minLength: 1,
      maxlength: 100,
    },
  },
  { timestamps: true }
);

skillSchema.set("toJSON", {
  transform(doc, ret) {
    return {
      _id: ret._id,
      name: ret.name,
    };
  },
});

export const Skill = model<ISkill, SkillModel>("Skill", skillSchema);

// npx tsx .\src\scripts\seed-skills.ts
