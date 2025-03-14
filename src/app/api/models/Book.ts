// /models/Book.ts
import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IBook extends Document {
  title: string;
  author: string;
  publishedDate: Date;
  summary?: string;
}

const BookSchema: Schema = new Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  publishedDate: { type: Date, required: true },
  summary: { type: String },
});

// Prevent model overwrite in development
export default (mongoose.models.Book as Model<IBook>) || mongoose.model<IBook>('Book', BookSchema);
