// /src/app/api/auth/register/route.ts
import { NextResponse } from "next/server";
import bcrypt from 'bcrypt'
import { dbConnect } from "../../../../../lib/dbConnect";
import User from "../../models/User";

export async function POST(request: Request) {
  // checking db is connected or not
  await dbConnect();
  // fetching email and password from request object
  const { email, password } = await request.json();

  if (!email || !password) {
    return NextResponse.json(
      { success: false, message: "Email and password are required" },
      { status: 400 }
    );
  }

  // Check if the user already exists
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return NextResponse.json(
      { success: false, message: "User already exists" },
      { status: 400 }
    );
  }

  // Hash the password, performing hashing algo for 10 times over the passoword
  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const user = await User.create({ email, password: hashedPassword });
    return NextResponse.json({ success: true, data: user }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}
