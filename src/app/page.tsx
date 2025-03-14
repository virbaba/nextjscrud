// /src/app/page.tsx
"use client";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-tr from-gray-500 via-gray-700 to-gray-800">
      <div className="bg-white rounded-xl shadow-xl p-8 max-w-xl text-center transform transition duration-300 hover:scale-105">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          📚 Welcome to My Book Club
        </h1>
        <p className="text-lg text-gray-600 mb-6">
          Explore and manage your book collection with ease. Enjoy a sleek,
          intuitive interface designed for book lovers.
        </p>
        <div className="flex justify-center space-x-4">
          <button
            onClick={() => router.push("/books")}
            className="px-6 py-2 bg-blue-500 text-white font-medium rounded-lg hover:bg-blue-600 transition duration-300 ease-in-out transform hover:scale-105 cursor-pointer"
          >
            📖 View Books
          </button>
          <button
            onClick={() => router.push("/books/new")}
            className="px-6 py-2 bg-green-500 text-white font-medium rounded-lg hover:bg-green-600 transition duration-300 ease-in-out transform hover:scale-105 cursor-pointer"
          >
            ➕ Add a Book
          </button>
        </div>
      </div>
    </div>
  );
}
