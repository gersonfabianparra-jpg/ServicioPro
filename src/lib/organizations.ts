import { createClient } from "@/lib/supabase/server";

export async function ensureUserOrganization(userId: string, email?: string | null) {
  const supabase = await createClient();

  const { data: existingMemberships, error: membershipError } = await supabase
    .from("organization_members")
    .select("organization_id")
    .eq("user_id", userId)
    .limit(1);

  if (membershipError) {
    throw new Error(membershipError.message);
  }

  if (existingMemberships.length > 0) {
    return existingMemberships[0].organization_id as string;
  }

  const defaultName = email ? `Empresa de ${email.split("@")[0]}` : "Mi empresa";

  const { data: organization, error: organizationError } = await supabase
    .from("organizations")
    .insert({
      name: defaultName,
      owner_id: userId,
    })
    .select("id")
    .single();

  if (organizationError) {
    throw new Error(organizationError.message);
  }

  const { error: memberError } = await supabase.from("organization_members").insert({
    organization_id: organization.id,
    user_id: userId,
    role: "admin",
  });

  if (memberError) {
    throw new Error(memberError.message);
  }

  return organization.id as string;
}
