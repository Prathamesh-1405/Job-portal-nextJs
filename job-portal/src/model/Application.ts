import mongoose, { Schema, Document } from "mongoose";

export interface IApplication extends Document {
  job: mongoose.Types.ObjectId;
  applicant: mongoose.Types.ObjectId;
  resume: string;
  coverLetter?: string;
  status: "applied" | "reviewed" | "interview" | "rejected" | "hired";
  appliedAt: Date;
}

const ApplicationSchema: Schema = new Schema<IApplication>({
  job: { type: Schema.Types.ObjectId, ref: "Job", required: true },
  applicant: { type: Schema.Types.ObjectId, ref: "User", required: true },
  resume: { type: String, required: true },
  coverLetter: { type: String },
  status: {
    type: String,
    enum: ["applied", "reviewed", "interview", "rejected", "hired"],
    default: "applied"
  },
  appliedAt: { type: Date, default: Date.now }
});

export default mongoose.models.Application || mongoose.model<IApplication>("Application", ApplicationSchema);
