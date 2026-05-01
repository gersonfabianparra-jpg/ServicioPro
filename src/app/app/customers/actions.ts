"use server";

import { ensureUserOrganization } from "@/lib/organizations";
import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createCustomerAction(formData: FormData) {
  const name = String(formData.get("name") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const phone = String(formData.get("phone") ?? "").trim();
  const address = String(formData.get("address") ?? "").trim();

  if (!name) {
    redirect("/app/customers?error=El nombre del cliente es obligatorio.");
  }

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const organizationId = await ensureUserOrganization(user.id, user.email);

  const { error } = await supabase.from("customers").insert({
    organization_id: organizationId,
    name,
    email: email || null,
    phone: phone || null,
    address: address || null,
  });

  if (error) {
    redirect(`/app/customers?error=${encodeURIComponent(error.message)}`);
  }

  revalidatePath("/app/customers");
  redirect("/app/customers?message=Cliente creado correctamente.");
}
