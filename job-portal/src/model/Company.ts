import mongoose, { Schema, Document } from "mongoose";

export interface ICompany extends Document {
  name: string;
  description: string;
  website?: string;
  logo?: string;
  location: string;
  createdAt: Date;
}

const CompanySchema: Schema = new Schema<ICompany>({
  name: { type: String, required: true },
  description: { type: String },
  website: { type: String },
  logo: { type: String },
  location: { type: String },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.models.Company || mongoose.model<ICompany>("Company", CompanySchema);
