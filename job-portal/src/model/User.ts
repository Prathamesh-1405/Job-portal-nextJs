import mongoose, { Schema, Document } from "mongoose";

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  role: "jobseeker" | "employer";
  profilePic?: string;
  createdAt: Date;
}

const UserSchema: Schema = new Schema<IUser>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ["jobseeker", "employer"], default: "jobseeker" },
  profilePic: { type: String },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.models.User || mongoose.model<IUser>("User", UserSchema);
