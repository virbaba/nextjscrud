// /src/app/api/auth/login/route.ts
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { dbConnect } from "../../../../../lib/dbConnect";
import User from "../../models/User";

const SECRET_KEY = process.env.JWT_SECRET || "my-secret-key";

export async function POST(request: Request) {
  await dbConnect();
  const { email, password } = await request.json();

  // Find the user by email
  const user = await User.findOne({ email });
  if (!user) {
    return NextResponse.json(
      { success: false, message: "Invalid credentials" },
      { status: 401 }
    );
  }

  // Compare password with stored hash
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return NextResponse.json(
      { success: false, message: "Invalid credentials" },
      { status: 401 }
    );
  }

  // Create a JWT valid for 1 hour
  const token = jwt.sign({ id: user._id, email: user.email }, SECRET_KEY, {
    expiresIn: "1h",
  });

  return NextResponse.json({ success: true, token });
}
