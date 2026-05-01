import { createCustomerAction } from "@/app/app/customers/actions";
import { signOutAction } from "@/app/auth/actions";
import { ensureUserOrganization } from "@/lib/organizations";
import { createClient } from "@/lib/supabase/server";
import {
  CalendarDays,
  ClipboardCheck,
  FileText,
  LayoutDashboard,
  LogOut,
  Mail,
  MapPin,
  Phone,
  Plus,
  Search,
  Users,
  Wrench,
} from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";

const navItems = [
  { label: "Dashboard", icon: LayoutDashboard, href: "/app" },
  { label: "Ordenes", icon: ClipboardCheck, href: "/app/orders" },
  { label: "Clientes", icon: Users, href: "/app/customers", active: true },
  { label: "Agenda", icon: CalendarDays, href: "/app/schedule" },
  { label: "Informes", icon: FileText, href: "/app/reports" },
];

type CustomersPageProps = {
  searchParams: Promise<{
    error?: string;
    message?: string;
  }>;
};

export default async function CustomersPage({ searchParams }: CustomersPageProps) {
  const params = await searchParams;
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const organizationId = await ensureUserOrganization(user.id, user.email);

  const { data: customers, error } = await supabase
    .from("customers")
    .select("id, name, email, phone, address, created_at")
    .eq("organization_id", organizationId)
    .order("created_at", { ascending: false });

  if (error) {
    throw new Error(error.message);
  }

  return (
    <main className="min-h-screen bg-paper text-ink">
      <div className="grid min-h-screen lg:grid-cols-[260px_1fr]">
        <aside className="border-b border-ink/10 bg-white px-5 py-5 lg:border-b-0 lg:border-r">
          <div className="mb-8 flex items-center gap-3">
            <div className="grid h-10 w-10 place-items-center rounded-md bg-ink text-white">
              <Wrench size={21} aria-hidden="true" />
            </div>
            <div>
              <p className="font-black">ServicioPro</p>
              <p className="text-xs text-ink/55">{user.email}</p>
            </div>
          </div>

          <nav className="grid gap-2">
            {navItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className={`flex items-center gap-3 rounded-md px-3 py-3 text-left text-sm font-bold transition ${
                  item.active ? "bg-ink text-white" : "text-ink/68 hover:bg-paper hover:text-ink"
                }`}
              >
                <item.icon size={18} aria-hidden="true" />
                {item.label}
              </Link>
            ))}
          </nav>

          <form action={signOutAction} className="mt-8">
            <button className="flex w-full items-center gap-3 rounded-md border border-ink/10 px-3 py-3 text-left text-sm font-bold text-ink/68 transition hover:bg-paper hover:text-ink">
              <LogOut size={18} aria-hidden="true" />
              Salir
            </button>
          </form>
        </aside>

        <section className="px-5 py-5 sm:px-8 lg:px-10">
          <header className="flex flex-col gap-4 border-b border-ink/10 pb-5 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-sm font-bold uppercase text-clay">Cartera comercial</p>
              <h1 className="mt-1 text-3xl font-black">Clientes</h1>
            </div>
            <label className="flex min-w-0 items-center gap-2 rounded-md border border-ink/10 bg-white px-3 py-2">
              <Search size={18} aria-hidden="true" />
              <input
                className="min-w-0 bg-transparent text-sm outline-none"
                placeholder="Buscar cliente"
              />
            </label>
          </header>

          {params.error ? (
            <p className="mt-6 rounded-md border border-clay/25 bg-clay/10 p-3 text-sm font-semibold text-clay">
              {params.error}
            </p>
          ) : null}

          {params.message ? (
            <p className="mt-6 rounded-md border border-moss/25 bg-moss/10 p-3 text-sm font-semibold text-moss">
              {params.message}
            </p>
          ) : null}

          <div className="grid gap-6 py-6 xl:grid-cols-[380px_1fr]">
            <section className="rounded-md border border-ink/10 bg-white p-5">
              <div className="mb-5 flex items-center gap-3">
                <div className="grid h-9 w-9 place-items-center rounded-md bg-clay text-white">
                  <Plus size={19} aria-hidden="true" />
                </div>
                <div>
                  <h2 className="font-black">Nuevo cliente</h2>
                  <p className="text-xs text-ink/55">Queda asociado a tu empresa.</p>
                </div>
              </div>

              <form action={createCustomerAction} className="grid gap-4">
                <label className="grid gap-2 text-sm font-bold">
                  Nombre
                  <input
                    className="rounded-md border border-ink/15 px-3 py-3 font-normal outline-none transition focus:border-steel"
                    name="name"
                    required
                  />
                </label>
                <label className="grid gap-2 text-sm font-bold">
                  Email
                  <input
                    className="rounded-md border border-ink/15 px-3 py-3 font-normal outline-none transition focus:border-steel"
                    name="email"
                    type="email"
                  />
                </label>
                <label className="grid gap-2 text-sm font-bold">
                  Telefono
                  <input
                    className="rounded-md border border-ink/15 px-3 py-3 font-normal outline-none transition focus:border-steel"
                    name="phone"
                  />
                </label>
                <label className="grid gap-2 text-sm font-bold">
                  Direccion
                  <input
                    className="rounded-md border border-ink/15 px-3 py-3 font-normal outline-none transition focus:border-steel"
                    name="address"
                  />
                </label>
                <button className="rounded-md bg-clay px-4 py-3 text-sm font-bold text-white transition hover:bg-clay/90">
                  Guardar cliente
                </button>
              </form>
            </section>

            <section className="rounded-md border border-ink/10 bg-white">
              <div className="flex items-center justify-between border-b border-ink/10 p-5">
                <div>
                  <h2 className="text-lg font-black">Clientes registrados</h2>
                  <p className="text-sm text-ink/55">{customers.length} clientes en la cartera</p>
                </div>
              </div>

              {customers.length === 0 ? (
                <div className="p-8 text-sm leading-6 text-ink/62">
                  Aun no tienes clientes. Crea el primero para empezar a generar ordenes de trabajo.
                </div>
              ) : (
                <div className="divide-y divide-ink/10">
                  {customers.map((customer) => (
                    <article
                      key={customer.id}
                      className="grid gap-4 p-5 md:grid-cols-[1fr_auto] md:items-center"
                    >
                      <div>
                        <h3 className="font-black">{customer.name}</h3>
                        <div className="mt-3 flex flex-wrap gap-3 text-sm text-ink/62">
                          {customer.email ? (
                            <span className="inline-flex items-center gap-2">
                              <Mail size={16} aria-hidden="true" />
                              {customer.email}
                            </span>
                          ) : null}
                          {customer.phone ? (
                            <span className="inline-flex items-center gap-2">
                              <Phone size={16} aria-hidden="true" />
                              {customer.phone}
                            </span>
                          ) : null}
                          {customer.address ? (
                            <span className="inline-flex items-center gap-2">
                              <MapPin size={16} aria-hidden="true" />
                              {customer.address}
                            </span>
                          ) : null}
                        </div>
                      </div>
                      <span className="rounded-md bg-moss/10 px-3 py-2 text-xs font-bold text-moss">
                        Activo
                      </span>
                    </article>
                  ))}
                </div>
              )}
            </section>
          </div>
        </section>
      </div>
    </main>
  );
}
