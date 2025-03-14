// /app/api/books/route.ts
import { NextResponse } from "next/server";
import { dbConnect } from "../../../../lib/dbConnect";
import Book from "../models/Book";

export async function GET() {
  await dbConnect();
  try {
    const books = await Book.find({});
    return NextResponse.json({ success: true, data: books });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  await dbConnect();
  try {
    const body = await request.json();
    const book = await Book.create(body);
    return NextResponse.json({ success: true, data: book });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
