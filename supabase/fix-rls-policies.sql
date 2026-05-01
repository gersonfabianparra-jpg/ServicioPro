drop policy if exists "Members can read their organizations" on public.organizations;
drop policy if exists "Owners can create organizations" on public.organizations;
drop policy if exists "Members can read memberships" on public.organization_members;
drop policy if exists "Owners can create initial memberships" on public.organization_members;
drop policy if exists "Members can manage customers" on public.customers;
drop policy if exists "Members can manage technicians" on public.technicians;
drop policy if exists "Members can manage work orders" on public.work_orders;

create or replace function public.is_org_member(target_organization_id uuid)
returns boolean
language sql
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.organization_members
    where organization_id = target_organization_id
      and user_id = auth.uid()
  );
$$;

create or replace function public.is_org_owner(target_organization_id uuid)
returns boolean
language sql
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.organizations
    where id = target_organization_id
      and owner_id = auth.uid()
  );
$$;

create policy "Members can read their organizations"
on public.organizations for select
using (public.is_org_member(id));

create policy "Owners can create organizations"
on public.organizations for insert
with check (owner_id = auth.uid());

create policy "Members can read memberships"
on public.organization_members for select
using (public.is_org_member(organization_id));

create policy "Owners can create initial memberships"
on public.organization_members for insert
with check (
  user_id = auth.uid()
  and public.is_org_owner(organization_id)
);

create policy "Members can manage customers"
on public.customers for all
using (public.is_org_member(organization_id))
with check (public.is_org_member(organization_id));

create policy "Members can manage technicians"
on public.technicians for all
using (public.is_org_member(organization_id))
with check (public.is_org_member(organization_id));

create policy "Members can manage work orders"
on public.work_orders for all
using (public.is_org_member(organization_id))
with check (public.is_org_member(organization_id));
