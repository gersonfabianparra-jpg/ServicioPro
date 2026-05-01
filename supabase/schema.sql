create extension if not exists "pgcrypto";

create type public.work_order_status as enum (
  'pending',
  'assigned',
  'in_progress',
  'completed',
  'billed',
  'cancelled'
);

create table public.organizations (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  owner_id uuid not null references auth.users(id) on delete cascade,
  plan text not null default 'free',
  created_at timestamptz not null default now()
);

create table public.organization_members (
  organization_id uuid not null references public.organizations(id) on delete cascade,
  user_id uuid not null references auth.users(id) on delete cascade,
  role text not null default 'admin',
  created_at timestamptz not null default now(),
  primary key (organization_id, user_id)
);

create table public.customers (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references public.organizations(id) on delete cascade,
  name text not null,
  email text,
  phone text,
  address text,
  created_at timestamptz not null default now()
);

create table public.technicians (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references public.organizations(id) on delete cascade,
  name text not null,
  email text,
  phone text,
  active boolean not null default true,
  created_at timestamptz not null default now()
);

create table public.work_orders (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references public.organizations(id) on delete cascade,
  customer_id uuid not null references public.customers(id) on delete restrict,
  technician_id uuid references public.technicians(id) on delete set null,
  code text not null,
  title text not null,
  description text,
  scheduled_at timestamptz,
  status public.work_order_status not null default 'pending',
  amount integer not null default 0,
  created_at timestamptz not null default now(),
  unique (organization_id, code)
);

alter table public.organizations enable row level security;
alter table public.organization_members enable row level security;
alter table public.customers enable row level security;
alter table public.technicians enable row level security;
alter table public.work_orders enable row level security;

create policy "Members can read their organizations"
on public.organizations for select
using (
  id in (
    select organization_id
    from public.organization_members
    where user_id = auth.uid()
  )
);

create policy "Owners can create organizations"
on public.organizations for insert
with check (owner_id = auth.uid());

create policy "Members can read memberships"
on public.organization_members for select
using (
  organization_id in (
    select organization_id
    from public.organization_members
    where user_id = auth.uid()
  )
);

create policy "Members can manage customers"
on public.customers for all
using (
  organization_id in (
    select organization_id
    from public.organization_members
    where user_id = auth.uid()
  )
)
with check (
  organization_id in (
    select organization_id
    from public.organization_members
    where user_id = auth.uid()
  )
);

create policy "Members can manage technicians"
on public.technicians for all
using (
  organization_id in (
    select organization_id
    from public.organization_members
    where user_id = auth.uid()
  )
)
with check (
  organization_id in (
    select organization_id
    from public.organization_members
    where user_id = auth.uid()
  )
);

create policy "Members can manage work orders"
on public.work_orders for all
using (
  organization_id in (
    select organization_id
    from public.organization_members
    where user_id = auth.uid()
  )
)
with check (
  organization_id in (
    select organization_id
    from public.organization_members
    where user_id = auth.uid()
  )
);
