// /app/api/books/[id]/route.ts
import { NextResponse } from "next/server";
import { dbConnect } from "../../../../../lib/dbConnect";
import Book from "../../models/Book";
import jwt from "jsonwebtoken";

// help to fetch book by id
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  // Retrieve the Authorization header to get the token
  const authHeader = request.headers.get("Authorization");
  if (!authHeader) {
    return NextResponse.json(
      { success: false, error: "Unauthorized" },
      { status: 401 }
    );
  }

  // Extract token (assuming Bearer schema)
  const token = authHeader.split(" ")[1];
  if (!token) {
    return NextResponse.json(
      { success: false, error: "Invalid token" },
      { status: 401 }
    );
  }
  
  try {
    // Verify the token using secret 
    jwt.verify(token, process.env.JWT_SECRET as string);
    await dbConnect();
    const book = await Book.findById(params.id);
    if (!book) {
      return NextResponse.json(
        { success: false, error: "Book not found" },
        { status: 404 }
      );
    }
    return NextResponse.json({ success: true, data: book });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

// route to update or edit book by id
export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  // Retrieve the Authorization header to get the token
  const authHeader = request.headers.get("Authorization");
  if (!authHeader) {
    return NextResponse.json(
      { success: false, error: "Unauthorized" },
      { status: 401 }
    );
  }

  // Extract token (assuming Bearer schema)
  const token = authHeader.split(" ")[1];
  if (!token) {
    return NextResponse.json(
      { success: false, error: "Invalid token" },
      { status: 401 }
    );
  }

  try {
    // Verify the token using secret 
    jwt.verify(token, process.env.JWT_SECRET as string);
    await dbConnect();
    const body = await request.json();
    const updatedBook = await Book.findByIdAndUpdate(params.id, body, {
      new: true,
    });
    if (!updatedBook) {
      return NextResponse.json(
        { success: false, error: "Book not found" },
        { status: 404 }
      );
    }
    return NextResponse.json({ success: true, data: updatedBook });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

// route to delete book by id
export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  // Retrieve the Authorization header to get the token
  const authHeader = request.headers.get("Authorization");
  if (!authHeader) {
    return NextResponse.json(
      { success: false, error: "Unauthorized" },
      { status: 401 }
    );
  }

  // Extract token (assuming Bearer schema)
  const token = authHeader.split(" ")[1];
  if (!token) {
    return NextResponse.json(
      { success: false, error: "Invalid token" },
      { status: 401 }
    );
  }

  try {
    // Verify the token using secret
    jwt.verify(token, process.env.JWT_SECRET as string);

    // Connect to the database and delete the book
    await dbConnect();
    const deletedBook = await Book.findByIdAndDelete(params.id);
    if (!deletedBook) {
      return NextResponse.json(
        { success: false, error: "Book not found" },
        { status: 404 }
      );
    }
    return NextResponse.json({ success: true, data: deletedBook });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
