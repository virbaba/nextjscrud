"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { FaEdit, FaTrash } from "react-icons/fa";

interface Book {
  _id: string;
  title: string;
  author: string;
  publishedDate: string;
  summary?: string;
}

export default function BooksPage() {
  const [books, setBooks] = useState<Book[]>([]);

  const fetchBooks = async () => {
    const res = await fetch("/api/books");
    const data = await res.json();
    if (data.success) {
      setBooks(data.data);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  const deleteBook = async (id: string) => {
    const res = await fetch(`/api/books/${id}`, { method: "DELETE" });
    const data = await res.json();
    if (data.success) {
      setBooks(books.filter((book) => book._id !== id));
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-tr from-gray-500 via-gray-700 to-gray-800 py-10">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-white">Book Club Library</h1>
          <Link
            href="/books/new"
            className="bg-blue-700 hover:bg-blue-600 transition text-white px-6 py-2 rounded-lg shadow-lg"
          >
            Add New Book
          </Link>
        </div>

        {books.length === 0 ? (
          <div className="text-center text-gray-500">No books available.</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {books.map((book) => (
              <div
                key={book._id}
                className="bg-white rounded-lg shadow-md p-6 transform transition hover:scale-105"
              >
                <h2 className="text-2xl font-semibold text-gray-700 mb-2">
                  {book.title}
                </h2>
                <p className="text-gray-600 mb-1">
                  <span className="font-medium">Author:</span> {book.author}
                </p>
                <p className="text-gray-600 mb-1">
                  <span className="font-medium">Published:</span>{" "}
                  {new Date(book.publishedDate).toLocaleDateString()}
                </p>
                <p className="text-gray-600 mb-4">{book.summary}</p>
                <div className="flex justify-between">
                  <Link
                    href={`/books/${book._id}`}
                    className="flex items-center space-x-2 bg-green-500 hover:bg-green-600 transition text-white px-4 py-2 rounded-lg cursor-pointer"
                  >
                    <FaEdit />
                    <span>Edit</span>
                  </Link>
                  <button
                    onClick={() => deleteBook(book._id)}
                    className="flex items-center space-x-2 bg-red-500 hover:bg-red-600 transition text-white px-4 py-2 rounded-lg cursor-pointer"
                  >
                    <FaTrash />
                    <span>Delete</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
