/**
 * Server Actions for authentication: signup, login, logout.
 */

"use server";

import { redirect } from "next/navigation";
import { z } from "zod";
import { authenticateUser, registerUser } from "@/lib/auth";
import { createSession, deleteSession } from "@/lib/session";

export interface AuthFormState {
  errors?: {
    name?: string[];
    email?: string[];
    password?: string[];
  };
  message?: string;
}

const authSchema = z.object({
  email: z.email({ error: "Please enter a valid email." }).trim(),
  password: z
    .string()
    .min(8, { error: "Password must be at least 8 characters long." })
    .regex(/[a-zA-Z]/, { error: "Password must contain at least one letter." })
    .regex(/[0-9]/, { error: "Password must contain at least one number." })
    .trim(),
});

const signupSchema = z.object({
  name: z
    .string()
    .min(2, { error: "Name must be at least 2 characters long." })
    .trim(),
  email: z.email({ error: "Please enter a valid email." }).trim(),
  password: z
    .string()
    .min(8, { error: "Password must be at least 8 characters long." })
    .regex(/[a-zA-Z]/, { error: "Password must contain at least one letter." })
    .regex(/[0-9]/, { error: "Password must contain at least one number." })
    .trim(),
});

export async function signup(
  state: AuthFormState | undefined,
  formData: FormData
): Promise<AuthFormState> {
  if (process.env.ALLOW_SIGNUP !== "true") {
    return {
      message: "Public registration is disabled. Contact the administrator for account access.",
    };
  }

  const validated = signupSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!validated.success) {
    return { errors: validated.error.flatten().fieldErrors as AuthFormState["errors"] };
  }

  try {
    const user = await registerUser(
      validated.data.name,
      validated.data.email,
      validated.data.password
    );
    await createSession({
      userId: user.id,
      email: user.email,
      role: user.role,
    });
  } catch (err) {
    return {
      message:
        err instanceof Error ? err.message : "Failed to create account.",
    };
  }

  redirect("/admin");
}

export async function login(
  state: AuthFormState | undefined,
  formData: FormData
): Promise<AuthFormState> {
  const validated = authSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!validated.success) {
    return { errors: validated.error.flatten().fieldErrors as AuthFormState["errors"] };
  }

  const user = await authenticateUser(validated.data.email, validated.data.password);

  if (!user) {
    return { message: "Invalid email or password." };
  }

  await createSession({
    userId: user.id,
    email: user.email,
    role: user.role,
  });

  redirect("/admin");
}

export async function logout(): Promise<void> {
  await deleteSession();
  redirect("/login");
}
