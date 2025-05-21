import mongoose, { Schema, Document } from "mongoose";

export interface IJob extends Document {
  title: string;
  description: string;
  location: string;
  type: "Full-time" | "Part-time" | "Internship" | "Remote";
  company: mongoose.Types.ObjectId;
  salaryRange?: string;
  skillsRequired?: string[];
  createdAt: Date;
  postedBy: mongoose.Types.ObjectId;
}

const JobSchema: Schema = new Schema<IJob>({
  title: { type: String, required: true },
  description: { type: String },
  location: { type: String, required: true },
  type: {
    type: String,
    enum: ["Full-time", "Part-time", "Internship", "Remote"],
    default: "Full-time"
  },
  company: { type: Schema.Types.ObjectId, ref: "Company", required: true },
  salaryRange: { type: String },
  skillsRequired: [{ type: String }],
  createdAt: { type: Date, default: Date.now },
  postedBy: { type: Schema.Types.ObjectId, ref: "User", required: true }
});

export default mongoose.models.Job || mongoose.model<IJob>("Job", JobSchema);
