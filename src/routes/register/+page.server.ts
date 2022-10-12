import { invalid, redirect } from "@sveltejs/kit";
import type { Action, Actions, PageServerLoad } from "./$types";
import { db } from "$lib/database";
import bcrypt from "bcrypt";

enum Roles {
  ADMIN = "ADMIN",
  USER = "USER"
}

export const load: PageServerLoad = async ({ locals }) => {
  if (locals.user) {
    throw redirect(302, "/");
  }
};

const register: Action = async ({ request }) => {
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

  if (user) {
    return invalid(400, { user: true });
  }

  await db.user.create({
    data: {
      username,
      passwordHash: await bcrypt.hash(password, 10),
      token: crypto.randomUUID(),
      role: { connect: { name: Roles.USER } }
    }
  });

  throw redirect(302, "/login");
};

export const actions: Actions = { register };