import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import {
  updateUserEmail,
  setSessionUser,
  getUserByEmail,
} from "@/lib/serverUsers";
import { cookies } from "next/headers";
import { SESSION_COOKIE_NAME } from "@/lib/constants";

export async function GET(req: NextRequest) {
  const session = (await cookies()).get(SESSION_COOKIE_NAME)?.value;

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const user = await getUserByEmail(session);

  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  return NextResponse.json({ name: user.name, email: user.email });
}

export async function PATCH(req: NextRequest) {
  const oldEmail = (await cookies()).get(SESSION_COOKIE_NAME)?.value;

  if (!oldEmail) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();
  const { name, email } = body;
  if (!name || !email) {
    return NextResponse.json(
      { error: "All fields are required" },
      { status: 400 }
    );
  }

  const updated = await updateUserEmail(oldEmail, name, email);

  if (!updated) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  await setSessionUser(email);

  return NextResponse.json({ success: true });
}
