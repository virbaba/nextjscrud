"use client";
import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";

// type of book data
interface Book {
  _id: string;
  title: string;
  author: string;
  publishedDate: string;
  summary?: string;
}

export default function EditBookPage() {
  const router = useRouter();
  const { id } = useParams(); // Extracts the book id from the URL
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [publishedDate, setPublishedDate] = useState("");
  const [summary, setSummary] = useState("");
  const [loading, setLoading] = useState(true);
  const [editLoading, setEditLoading] = useState(false);
  const [token, setToken] = useState<string | null>(null);

  // Helper function to update authentication status
  const checkAuth = () => {
    const token = localStorage.getItem("token");
    setToken(token);
  };

  useEffect(() => {
    // Check auth status on component mount
    checkAuth();
  }, []);

  // Fetch the book's current data when the component mounts or when token is set
  useEffect(() => {
    if (id && token) {
      const fetchBook = async () => {
        try {
          const res = await fetch(`/api/books/${id}`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`, // Sending token here
            },
          });
          const data = await res.json();
          if (data.success) {
            const book: Book = data.data;
            setTitle(book.title);
            setAuthor(book.author);
            // Convert the date into YYYY-MM-DD format for the date input
            setPublishedDate(
              new Date(book.publishedDate).toISOString().split("T")[0]
            );
            setSummary(book.summary || "");
          }
        } catch (error) {
          console.error("Error fetching book:", error);
        } finally {
          setLoading(false);
        }
      };
      fetchBook();
    }
  }, [id, token]);

  // handle submit function to edit the book details
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setEditLoading(true);
    const res = await fetch(`/api/books/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`, // Sending token for update as well
      },
      body: JSON.stringify({ title, author, publishedDate, summary }),
    });
    const data = await res.json();
    if (data.success) {
      setEditLoading(false);
      router.push("/books");
    }
    setEditLoading(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-gray-500 via-gray-700 to-gray-800">
        <p className="text-xl text-white">Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-tr from-gray-500 via-gray-700 to-gray-800 flex items-center justify-center p-6">
      <div className="bg-white shadow-xl rounded-lg p-8 w-full max-w-md transform transition hover:scale-105">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Edit Book
        </h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-gray-700 mb-2">Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full border border-gray-300 px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-2">Author</label>
            <input
              type="text"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              className="w-full border border-gray-300 px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-2">Published Date</label>
            <input
              type="date"
              value={publishedDate}
              onChange={(e) => setPublishedDate(e.target.value)}
              className="w-full border border-gray-300 px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-2">Summary</label>
            <textarea
              value={summary}
              onChange={(e) => setSummary(e.target.value)}
              className="w-full border border-gray-300 px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
              rows={4}
            />
          </div>
          <button
            type="submit"
            className="w-full bg-purple-500 text-white font-semibold py-2 rounded-lg shadow-md hover:bg-purple-600 transition duration-300 cursor-pointer"
          >
            {editLoading ? "Loading..." : "Update Book"}
          </button>
        </form>
      </div>
    </div>
  );
}