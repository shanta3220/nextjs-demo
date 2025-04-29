"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import type { User } from "@/types/user";

export default function ProfilePage() {
  const router = useRouter();
  const [user, setUser] = useState<User>({ name: "", email: "" });
  const [loading, setLoading] = useState<boolean>(true);
  const [updating, setUpdating] = useState<boolean>(false);

  useEffect(() => {
    async function fetchProfile() {
      const res = await fetch("/api/profile");

      if (res.ok) {
        const data = await res.json();
        setUser({ name: data.name, email: data.email });
      } else {
        router.push("/login");
      }

      setLoading(false);
    }

    fetchProfile();
  }, [router]);

  const handleUpdate = async () => {
    setUpdating(true);
    const res = await fetch("/api/profile", {
      method: "PATCH",
      body: JSON.stringify(user),
      headers: { "Content-Type": "application/json" },
    });

    setUpdating(false);

    if (res.ok) {
      alert("Profile updated!");
      router.refresh();
    } else {
      const data = await res.json();
      alert(data.error || "Failed to update profile");
    }
  };

  const handleLogout = async () => {
    await fetch("/api/logout", { method: "POST" });
    router.push("/login");
  };

  if (loading) {
    return (
      <section className="flex-1 flex items-center justify-center px-4">
        <p className="text-gray-500">Loading profile...</p>
      </section>
    );
  }

  return (
    <section className="flex-grow flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white shadow-lg rounded-2xl p-6 space-y-5">
        <h1 className="text-2xl font-bold text-center text-gray-800">
          Profile
        </h1>

        <input
          type="text"
          value={user.name}
          onChange={(e) => setUser({ ...user, name: e.target.value })}
          placeholder="Name"
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        <input
          type="email"
          value={user.email}
          onChange={(e) => setUser({ ...user, email: e.target.value })}
          placeholder="Email"
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        <button
          type="button"
          onClick={handleUpdate}
          disabled={updating}
          className={`w-full py-2 rounded-md transition ${
            updating
              ? "bg-blue-400 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700 cursor-pointer"
          } text-white`}
        >
          {updating ? "Updating..." : "Update Profile"}
        </button>

        <button
          type="button"
          onClick={handleLogout}
          className="w-full bg-red-600 text-white py-2 rounded-md hover:bg-red-700 transition cursor-pointer"
        >
          Log Out
        </button>
      </div>
    </section>
  );
}
