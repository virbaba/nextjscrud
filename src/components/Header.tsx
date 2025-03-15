// this directive define this is client component mean page will render at client side. It run into the browser like regular react component
"use client";
import { useEffect, useState } from "react";
// provide the Link to navigate
import Link from "next/link";
import { FaBook, FaUserCircle } from "react-icons/fa";

export default function Header() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  //function to update authentication status
  const checkAuth = () => {
    // getting the token from localstorage
    const token = localStorage.getItem("token");
    // !! help to convert value into boolean explicitly
    setIsAuthenticated(!!token);
  };

  useEffect(() => {
    // Check auth status on component mount
    checkAuth();

    // Listen for a custom event 'authChanged' to update auth status
    const handleAuthChanged = () => {
      checkAuth();
    };

    // auth changed event help to know is user login successfully or not
    window.addEventListener("authChanged", handleAuthChanged);

    // remove the event when component unmount
    return () => {
      window.removeEventListener("authChanged", handleAuthChanged);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
    // Dispatch event so other components (like Header) update immediately
    window.dispatchEvent(new Event("authChanged"));
  };

  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <FaBook className="text-blue-700 text-3xl animate-pulse" />
          <h1 className="text-2xl font-bold text-gray-800">
            Book Club Library
          </h1>
        </div>
        <nav>
          <ul className="flex items-center space-x-4">
            <li>
              <Link
                href="/"
                className="text-gray-600 hover:text-gray-900 transition"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                href="/books"
                className="text-gray-600 hover:text-gray-900 transition"
              >
                Books
              </Link>
            </li>
            {isAuthenticated ? (
              <>
                <li>
                  <Link
                    href="/books/new"
                    className="text-gray-600 hover:text-gray-900 transition"
                  >
                    Add Book
                  </Link>
                </li>
                <li>
                  <FaUserCircle className="text-gray-600 text-3xl" />
                </li>
                <li>
                  <button
                    onClick={handleLogout}
                    className="text-gray-600 hover:text-gray-900 transition cursor-pointer"
                  >
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link
                    href="/login"
                    className="text-gray-600 hover:text-gray-900 transition"
                  >
                    Sign In
                  </Link>
                </li>
                <li>
                  <Link
                    href="/register"
                    className="text-gray-600 hover:text-gray-900 transition"
                  >
                    Sign Up
                  </Link>
                </li>
              </>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
}
