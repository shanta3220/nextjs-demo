"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function HomePage() {
  const router = useRouter();

  useEffect(() => {
    const checkSession = () => {
      const cookies = document.cookie.split("; ");
      const sessionCookie = cookies.find((row) =>
        row.startsWith("session_user=")
      );

      if (sessionCookie) {
        router.push("/profile");
      }
    };

    checkSession();
  }, [router]);

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <h1 className="text-xl font-semibold">Welcome to Heartline App</h1>
        <p className="mt-4">
          Please{" "}
          <a href="/login" className="text-blue-600 underline">
            Log In
          </a>{" "}
          or{" "}
          <a href="/register" className="text-blue-600 underline">
            Register
          </a>{" "}
          to get started.
        </p>
      </div>
    </main>
  );
}
