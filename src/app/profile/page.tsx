"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function ProfilePage() {
  const router = useRouter();
  const [user, setUser] = useState({ name: "", email: "" });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProfile() {
      const res = await fetch("/api/profile", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });

      if (res.ok) {
        const data = await res.json();
        setUser({ name: data.name, email: data.email });
      } else {
        console.error(res);
        router.push("/login");
      }
      setLoading(false);
    }

    fetchProfile();
  }, [router]);

  const handleUpdate = async () => {
    const res = await fetch("/api/userprofile", {
      method: "PATCH",
      body: JSON.stringify({
        newName: user.name,
        newEmail: user.email,
      }),
      headers: { "Content-Type": "application/json" },
    });

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
    return <p>Loading...</p>;
  }

  return (
    <main className="min-h-screen flex items-center justify-center">
      <div className="w-full max-w-md bg-white shadow-md rounded-xl p-6 space-y-4">
        <h1 className="text-2xl font-semibold text-center">Profile</h1>

        <input
          type="text"
          value={user.name}
          onChange={(e) => setUser({ ...user, name: e.target.value })}
          placeholder="Name"
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring"
        />

        <input
          type="email"
          value={user.email}
          onChange={(e) => setUser({ ...user, email: e.target.value })}
          placeholder="Email"
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring"
        />

        <button
          type="button"
          onClick={handleUpdate}
          className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700"
        >
          Update Profile
        </button>

        <button
          type="button"
          onClick={handleLogout}
          className="w-full bg-red-600 text-white py-2 rounded-md hover:bg-red-700"
        >
          Log Out
        </button>
      </div>
    </main>
  );
}
