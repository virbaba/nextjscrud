"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { FaEdit, FaTrash } from "react-icons/fa";

// Defining the type of book
interface Book {
  _id: string;
  title: string;
  author: string;
  publishedDate: string;
  summary?: string;
}

export default function BooksPage() {
  // arrays of book
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [token, setToken] = useState<string | null>(null);

  // Helper function to update authentication status
  const checkAuth = () => {
    const token = localStorage.getItem("token");
    setToken(token);
    setIsAuthenticated(!!token);
  };

  useEffect(() => {
    // Check auth status on component mount
    checkAuth();

    // Listen for a custom event 'authChanged' to update auth status
    const handleAuthChanged = () => {
      checkAuth();
    };

    window.addEventListener("authChanged", handleAuthChanged);
    return () => {
      window.removeEventListener("authChanged", handleAuthChanged);
    };
  }, []);

  // Fetch all books from the database
  const fetchBooks = async () => {
    setLoading(true);
    // calling the api to fetch all books from database
    const res = await fetch("/api/books");
    const data = await res.json();
    if (data.success) {
      setBooks(data.data);
    }
    setLoading(false);
  };

  // Fetch books on component mount
  useEffect(() => {
    fetchBooks();
  }, []);

  // Delete a book by its id
  const deleteBook = async (id: string) => {
    // Ensure token is available before making the request
    if (!token) return;

    const res = await fetch(`/api/books/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`, // Send token in Authorization header to verify a authenticate user want to delete a book
      },
    });
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

        {loading ? (
          <div className="text-center text-white text-xl">Loading...</div>
        ) : books.length === 0 ? (
          <div className="text-center text-gray-500">No books available.</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {books.map((book) => (
              <div
                key={book._id}
                className="bg-white rounded-lg shadow-md p-6 transform transition hover:scale-105 flex flex-col justify-between"
              >
                <div>
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
                </div>

                {isAuthenticated && (
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
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
