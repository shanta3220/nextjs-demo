import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getUserByEmail, setSessionUser } from "@/lib/serverUsers";
import bcrypt from "bcryptjs";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { email, password } = body;

  const user = await getUserByEmail(email);

  if (!user) {
    return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
  }

  const isValid = user.passwordHash
    ? await bcrypt.compare(password, user.passwordHash)
    : false;

  if (!isValid) {
    return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
  }

  await setSessionUser(email);
  return NextResponse.redirect(new URL("/profile", req.url));
}
