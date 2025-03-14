// These styles apply to every route in the application
import './globals.css'
// /src/app/layout.tsx
import { FaBook, FaGithub, FaLinkedin } from 'react-icons/fa';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <title>Book Club Library</title>
        <meta
          name="description"
          content="Manage your book collection effortlessly with Book Club Library."
        />
      </head>
      <body className="flex flex-col min-h-screen bg-gray-50">
        {/* Header */}
        <header className="bg-white shadow-md">
          <div className="container mx-auto px-4 py-4 flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <FaBook className="text-blue-500 text-3xl animate-pulse" />
              <h1 className="text-2xl font-bold text-gray-800">
                Book Club Library
              </h1>
            </div>
            <nav>
              <ul className="flex space-x-4">
                <li>
                  <a
                    href="/"
                    className="text-gray-600 hover:text-gray-900 transition"
                  >
                    Home
                  </a>
                </li>
                <li>
                  <a
                    href="/books"
                    className="text-gray-600 hover:text-gray-900 transition"
                  >
                    Books
                  </a>
                </li>
                <li>
                  <a
                    href="/books/new"
                    className="text-gray-600 hover:text-gray-900 transition"
                  >
                    Add Book
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </header>

        {/* Main content */}
        <main className="flex-grow">{children}</main>

        {/* Footer */}
        <footer className="bg-gray-800 text-white py-4">
          <div className="container mx-auto text-center">
            <p className="mb-2">Developed by Virender Singh</p>
            <div className="flex justify-center space-x-4">
              <a
                href="https://github.com/virbaba"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-gray-300 transition transform hover:scale-110"
              >
                <FaGithub className="text-2xl" />
              </a>
              <a
                href="https://www.linkedin.com/in/virender-singh-0613a5234/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-gray-300 transition transform hover:scale-110"
              >
                <FaLinkedin className="text-2xl" />
              </a>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
