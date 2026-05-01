import {
  CalendarDays,
  ClipboardCheck,
  Clock3,
  LogOut,
  FileText,
  LayoutDashboard,
  Plus,
  Search,
  Users,
  Wrench,
} from "lucide-react";
import { signOutAction } from "@/app/auth/actions";
import { ensureUserOrganization } from "@/lib/organizations";
import { createClient } from "@/lib/supabase/server";
import Link from "next/link";
import { redirect } from "next/navigation";

const navItems = [
  { label: "Dashboard", icon: LayoutDashboard, href: "/app", active: true },
  { label: "Ordenes", icon: ClipboardCheck, href: "/app/orders" },
  { label: "Clientes", icon: Users, href: "/app/customers" },
  { label: "Agenda", icon: CalendarDays, href: "/app/schedule" },
  { label: "Informes", icon: FileText, href: "/app/reports" },
];

const workOrders = [
  { code: "OT-1028", client: "Condominio Los Robles", tech: "Marco R.", status: "En ruta", value: "$240.000" },
  { code: "OT-1029", client: "Clinica Santa Marta", tech: "Valeria S.", status: "Asignado", value: "$360.000" },
  { code: "OT-1030", client: "Oficinas Norte", tech: "Diego P.", status: "Pendiente", value: "$180.000" },
  { code: "OT-1031", client: "Restaurant Alameda", tech: "Camila F.", status: "Terminado", value: "$95.000" },
];

export default async function AppDashboard() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  await ensureUserOrganization(user.id, user.email);

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
                  item.active
                    ? "bg-ink text-white"
                    : "text-ink/68 hover:bg-paper hover:text-ink"
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
              <p className="text-sm font-bold uppercase text-clay">Operacion diaria</p>
              <h1 className="mt-1 text-3xl font-black">Dashboard</h1>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <label className="flex min-w-0 items-center gap-2 rounded-md border border-ink/10 bg-white px-3 py-2">
                <Search size={18} aria-hidden="true" />
                <input
                  className="min-w-0 bg-transparent text-sm outline-none"
                  placeholder="Buscar orden o cliente"
                />
              </label>
              <button className="inline-flex items-center justify-center gap-2 rounded-md bg-clay px-4 py-2 text-sm font-bold text-white">
                <Plus size={18} aria-hidden="true" />
                Nueva orden
              </button>
            </div>
          </header>

          <div className="grid gap-4 py-6 md:grid-cols-4">
            {[
              ["Ordenes abiertas", "42"],
              ["Servicios hoy", "9"],
              ["Tecnicos activos", "6"],
              ["Por cobrar", "$1.84M"],
            ].map(([label, value]) => (
              <article key={label} className="rounded-md border border-ink/10 bg-white p-5">
                <p className="text-sm font-semibold text-ink/55">{label}</p>
                <p className="mt-2 text-3xl font-black">{value}</p>
              </article>
            ))}
          </div>

          <div className="grid gap-6 xl:grid-cols-[1fr_360px]">
            <section className="rounded-md border border-ink/10 bg-white">
              <div className="flex items-center justify-between border-b border-ink/10 p-5">
                <h2 className="text-lg font-black">Ordenes recientes</h2>
                <button className="text-sm font-bold text-clay">Ver todas</button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full min-w-[720px] border-collapse text-sm">
                  <thead className="bg-paper text-left text-xs uppercase text-ink/55">
                    <tr>
                      <th className="px-5 py-3">Codigo</th>
                      <th className="px-5 py-3">Cliente</th>
                      <th className="px-5 py-3">Tecnico</th>
                      <th className="px-5 py-3">Estado</th>
                      <th className="px-5 py-3 text-right">Valor</th>
                    </tr>
                  </thead>
                  <tbody>
                    {workOrders.map((order) => (
                      <tr key={order.code} className="border-t border-ink/10">
                        <td className="px-5 py-4 font-bold">{order.code}</td>
                        <td className="px-5 py-4">{order.client}</td>
                        <td className="px-5 py-4 text-ink/65">{order.tech}</td>
                        <td className="px-5 py-4">
                          <span className="rounded-md bg-moss/10 px-2 py-1 text-xs font-bold text-moss">
                            {order.status}
                          </span>
                        </td>
                        <td className="px-5 py-4 text-right font-bold">{order.value}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

            <aside className="rounded-md border border-ink/10 bg-white p-5">
              <div className="mb-5 flex items-center justify-between">
                <h2 className="text-lg font-black">Agenda</h2>
                <Clock3 size={20} className="text-steel" aria-hidden="true" />
              </div>
              <div className="grid gap-3">
                {["10:30 CCTV Los Robles", "12:00 Climatizacion Clinica", "15:30 Red Oficinas Norte"].map((item) => (
                  <div key={item} className="rounded-md bg-paper p-4 text-sm font-semibold">
                    {item}
                  </div>
                ))}
              </div>
            </aside>
          </div>
        </section>
      </div>
    </main>
  );
}
