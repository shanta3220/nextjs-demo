"use client";
import Link from "next/link";
import "../styles/globals.css";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta
          name="description"
          content="Heartline App - Your Personal Health Companion"
        />
        <title>Heartline App</title>
      </head>
      <body className="min-h-screen flex flex-col bg-gray-100">
        <header className="p-4 bg-black text-white text-center">
          <Link href="/" className="text-xl">
            Heartline App
          </Link>
        </header>

        <main className="flex-grow flex items-center justify-center bg-gray-100">
          {children}
        </main>

        <footer className="p-6 bg-black text-white text-center text-base pt-8 pb-8">
          <div className="flex flex-col sm:flex-row justify-between items-center max-w-4xl mx-auto">
            <p className="mb-2 sm:mb-0">
              &copy; {new Date().getFullYear()} Heartline App. All rights
              reserved.
            </p>
            <div className="flex space-x-4">
              <Link
                href="/privacy"
                className="hover:underline hover:text-blue-400"
              >
                Privacy
              </Link>
              <Link
                href="/terms"
                className="hover:underline hover:text-blue-400"
              >
                Terms
              </Link>
              <Link
                href="/contact"
                className="hover:underline hover:text-blue-400"
              >
                Contact
              </Link>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
