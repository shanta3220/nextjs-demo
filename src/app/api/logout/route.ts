import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { setSessionUser } from "@/lib/serverUsers";

export async function POST(req: NextRequest) {
  const res = NextResponse.redirect(new URL("/login", req.url));

  await setSessionUser("");

  return res;
}
