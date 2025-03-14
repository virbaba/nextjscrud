import mongoose from "mongoose";

const MONGO_URI = process.env.MONGO_URI || "";

if (!MONGO_URI) {
  throw new Error("Please define the MONGO_URI environment variable");
}

// Global cache to prevent multiple connections in a serverless environment
let cached = (global as any).mongoose;

if (!cached) {
  cached = (global as any).mongoose = { conn: null, promise: null };
}

export async function dbConnect() {
  if (cached.conn) {
    console.log("Using existing database connection");
    return cached.conn;
  }

  if (!cached.promise) {
    console.log("Creating new database connection");

    cached.promise = (async () => {
      try {
        const conn = await mongoose.connect(MONGO_URI);
        console.log("Database connected successfully");
        return conn;
      } catch (error) {
        console.error("Database connection error:", error);
        cached.promise = null; // Reset cache to allow retries
        throw error;
      }
    })();
  }

  cached.conn = await cached.promise;
  return cached.conn;
}
