// /src/app/layout.tsx
import "./globals.css";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import Header from "@/components/Header";

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
        {/* Dynamic Header */}
        <Header />

        {/* Main content */}
        <main className="flex-grow">{children}</main>

        {/* Footer */}
        <footer className="bg-gray-800 text-white py-4">
          <div className="container mx-auto text-center">
            <p className="mb-2">Developed by Virender Singh</p>
            <div className="flex justify-center space-x-4">
              <a
                href="https://github.com/virbaba/nextjscrud"
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
