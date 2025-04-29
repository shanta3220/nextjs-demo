import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { addUser, getUserByEmail, setSessionUser } from "@/lib/serverUsers";
import bcrypt from "bcryptjs";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { name, email, password } = body;

  if (!name || !email || !password) {
    return NextResponse.json(
      { error: "All fields are required" },
      { status: 400 }
    );
  }

  const existing = await getUserByEmail(email);
  if (existing) {
    return NextResponse.json(
      { error: "Email already registered" },
      { status: 409 }
    );
  }

  const passwordHash = await bcrypt.hash(password, 10);
  await addUser({ name, email, passwordHash });

  const res = NextResponse.redirect(new URL("/login", req.url));
  await setSessionUser(email);
  return res;
}
