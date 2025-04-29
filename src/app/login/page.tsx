"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { LoginFormData } from "@/types/user";

export default function LoginPage() {
  const router = useRouter();
  const [formData, setFormData] = useState<LoginFormData>({
    email: "",
    password: "",
  });
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const res = await fetch("/api/login", {
      method: "POST",
      body: JSON.stringify(formData),
      headers: { "Content-Type": "application/json" },
    });

    setLoading(false);

    if (res.redirected) {
      router.push(res.url);
    } else if (res.ok) {
      router.push("/profile");
    } else {
      const data = await res.json();
      setError(data.error || "Login failed");
    }
  };

  return (
    <section className="flex-1 flex items-center justify-center px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white shadow-md rounded-xl p-6 space-y-4"
      >
        <h1 className="text-xl font-semibold text-center">Login</h1>

        {error && <p className="text-red-600 text-sm text-center">{error}</p>}

        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          autoComplete="email"
          placeholder="Email"
          required
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          autoComplete="current-password"
          placeholder="Password"
          required
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        <button
          type="submit"
          disabled={loading}
          className={`w-full bg-black text-white py-2 rounded-md transition ${
            loading ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-800"
          }`}
        >
          {loading ? "Logging in..." : "Log In"}
        </button>
      </form>
    </section>
  );
}
