import { redirect } from "next/navigation";
import { getUser } from "@/lib/serverUsers";
import Link from "next/link";

export default async function HomePage() {
  const session = await getUser();

  if (session) {
    redirect("/profile");
  }

  return (
    <section className="flex-1 min-h-full flex items-center justify-center px-4">
      <div className="bg-white p-8 rounded-2xl shadow-lg text-center max-w-md w-full">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">
          Welcome to Heartline App
        </h1>
        <p className="text-gray-600 mb-6">
          Please{" "}
          <Link
            href="/login"
            className="text-blue-600 hover:text-blue-800 font-medium"
          >
            Log In
          </Link>{" "}
          or{" "}
          <Link
            href="/register"
            className="text-blue-600 hover:text-blue-800 font-medium"
          >
            Register
          </Link>{" "}
          to get started.
        </p>
      </div>
    </section>
  );
}
