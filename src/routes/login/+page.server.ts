import { invalid, redirect } from "@sveltejs/kit";
import type { Action, Actions, PageServerLoad } from "./$types";
import { db } from "$lib/database";
import bcrypt from "bcrypt";

export const load: PageServerLoad = async ({ locals }) => {
  if (locals.user) {
    throw redirect(302, "/");
  }
};

const login: Action = async ({ cookies, request }) => {
  const data = await request.formData();
  const username = data.get("username");
  const password = data.get("password");

  if (
    typeof username !== "string" ||
    typeof password !== "string" ||
    !username ||
    !password
  ) {
    return invalid(400, { invalid: true });
  }

  const user = await db.user.findUnique({
    where: { username }
  });

  if (!user) {
    return invalid(400, { credentials: true });
  }

  const userPassword = await bcrypt.compare(password, user.passwordHash);

  if (!userPassword) {
    return invalid(400, { credentials: true });
  }

  const authUser = await db.user.update({
    where: { username: user.username },
    data: { token: crypto.randomUUID() }
  });

  cookies.set("session", authUser.token, {
    path: "/",
    httpOnly: true,
    sameSite: "strict",
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 24 * 30
  });

  throw redirect(302, "/");
};

export const actions: Actions = { login };