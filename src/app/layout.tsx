"use client";

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
      <body className="bg-gray-100">
        <header className="p-4 bg-black text-white text-center">
          <h1 className="text-xl">Heartline App</h1>
        </header>

        <main>{children}</main>

        <footer className="p-4 bg-black text-white text-center">
          <p>Footer Content</p>
        </footer>
      </body>
    </html>
  );
}
