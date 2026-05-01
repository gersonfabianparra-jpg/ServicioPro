"use server";

import { ensureUserOrganization } from "@/lib/organizations";
import { createClient } from "@/lib/supabase/server";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

function authErrorRedirect(path: "/login" | "/register", message: string): never {
  redirect(`${path}?error=${encodeURIComponent(message)}`);
}

export async function signInAction(formData: FormData) {
  const email = String(formData.get("email") ?? "").trim();
  const password = String(formData.get("password") ?? "");

  if (!email || !password) {
    authErrorRedirect("/login", "Ingresa email y contrasena.");
  }

  const supabase = await createClient();
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    authErrorRedirect("/login", error.message);
  }

  if (data.user) {
    await ensureUserOrganization(data.user.id, data.user.email);
  }

  redirect("/app");
}

export async function signUpAction(formData: FormData) {
  const email = String(formData.get("email") ?? "").trim();
  const password = String(formData.get("password") ?? "");
  const origin = (await headers()).get("origin");

  if (!email || !password) {
    authErrorRedirect("/register", "Ingresa email y contrasena.");
  }

  if (password.length < 8) {
    authErrorRedirect("/register", "La contrasena debe tener al menos 8 caracteres.");
  }

  const supabase = await createClient();
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: `${origin}/auth/callback`,
    },
  });

  if (error) {
    authErrorRedirect("/register", error.message);
  }

  if (data.session && data.user) {
    await ensureUserOrganization(data.user.id, data.user.email);
    redirect("/app");
  }

  redirect("/login?message=Revisa tu correo para confirmar la cuenta.");
}

export async function signOutAction() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/login");
}
