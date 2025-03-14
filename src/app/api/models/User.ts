// /src/models/User.ts
import mongoose, { Schema, Document, Model } from "mongoose";

export interface IUser extends Document {
  email: string;
  password: string;
}

const UserSchema: Schema = new Schema({
  email: { type: String, required: true, unique: true, lowercase: true, trim: true },
  password: { type: String, required: true },
});

// Prevent model overwrite in development
export default (mongoose.models.User as Model<IUser>) || mongoose.model<IUser>("User", UserSchema);
