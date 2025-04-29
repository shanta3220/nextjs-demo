"use server";

import { cookies } from "next/headers";
import type { User } from "@/types/user";
import { USERS_COOKIE_NAME, SESSION_COOKIE_NAME } from "@/lib/constants";

export async function loadUsers(): Promise<User[]> {
  const usersCookie = (await cookies()).get(USERS_COOKIE_NAME)?.value;
  if (!usersCookie) return [];
  try {
    return JSON.parse(usersCookie) as User[];
  } catch {
    return [];
  }
}

export async function saveUsers(users: User[]): Promise<void> {
  (await cookies()).set(USERS_COOKIE_NAME, JSON.stringify(users), {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24, // 1 day
  });
}

export async function addUser(user: User): Promise<void> {
  const users = await loadUsers();
  users.push(user);
  await saveUsers(users);
}

export async function setSessionUser(email: string): Promise<void> {
  const maxAge = email ? 60 * 60 * 24 : 0; // 1 day
  (await cookies()).set(SESSION_COOKIE_NAME, email, {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    path: "/",
    maxAge: maxAge,
  });
}

export async function getUserByEmail(email: string): Promise<User | undefined> {
  const users = await loadUsers();
  return users.find((u) => u.email === email);
}

export async function updateUserEmail(
  oldEmail: string,
  newName: string,
  newEmail: string
): Promise<boolean> {
  const users = await loadUsers();
  const user = users.find((u) => u.email === oldEmail);
  if (!user) return false;
  user.name = newName;
  user.email = newEmail;
  await saveUsers(users);
  return true;
}
