import {
  Activity,
  CalendarDays,
  CheckCircle2,
  ClipboardList,
  CreditCard,
  MapPin,
  ShieldCheck,
  Users,
  Wrench,
} from "lucide-react";

const stats = [
  { label: "Ordenes activas", value: "42", tone: "bg-moss text-white" },
  { label: "Servicios hoy", value: "9", tone: "bg-steel text-white" },
  { label: "Por cobrar", value: "$1.84M", tone: "bg-gold text-ink" },
];

const orders = [
  {
    client: "Condominio Los Robles",
    task: "Mantencion CCTV y revision de red",
    status: "En ruta",
    time: "10:30",
    amount: "$240.000",
  },
  {
    client: "Clinica Santa Marta",
    task: "Soporte climatizacion sala tecnica",
    status: "Asignado",
    time: "12:00",
    amount: "$360.000",
  },
  {
    client: "Oficinas Norte",
    task: "Instalacion puntos de red",
    status: "Pendiente",
    time: "15:30",
    amount: "$180.000",
  },
];

const features = [
  { icon: ClipboardList, title: "Ordenes", text: "Crea, asigna y cierra trabajos con estados claros." },
  { icon: Users, title: "Clientes", text: "Historial comercial y tecnico por empresa o persona." },
  { icon: CalendarDays, title: "Agenda", text: "Planifica visitas, rutas y disponibilidad del equipo." },
  { icon: CreditCard, title: "Cobros", text: "Controla servicios cobrados, pendientes y vencidos." },
];

export default function Home() {
  return (
    <main className="min-h-screen">
      <section className="border-b border-ink/10 bg-paper">
        <div className="mx-auto flex min-h-[92vh] w-full max-w-7xl flex-col px-5 py-5 sm:px-8 lg:px-10">
          <header className="flex items-center justify-between gap-4 py-3">
            <div className="flex items-center gap-3">
              <div className="grid h-10 w-10 place-items-center rounded-md bg-ink text-white">
                <Wrench size={21} aria-hidden="true" />
              </div>
              <div>
                <p className="text-lg font-bold leading-none">ServicioPro</p>
                <p className="text-xs text-ink/60">Operaciones en terreno</p>
              </div>
            </div>
            <nav className="hidden items-center gap-6 text-sm font-medium text-ink/70 md:flex">
              <a href="#producto">Producto</a>
              <a href="#modelo">Modelo</a>
              <a href="#infra">Infraestructura</a>
            </nav>
            <a
              href="/login"
              className="rounded-md bg-clay px-4 py-2 text-sm font-bold text-white shadow-sm transition hover:bg-clay/90"
            >
              Entrar
            </a>
          </header>

          <div className="grid flex-1 items-center gap-12 py-10 lg:grid-cols-[0.95fr_1.05fr]">
            <div className="max-w-2xl">
              <p className="mb-4 inline-flex items-center gap-2 rounded-md border border-moss/25 bg-white px-3 py-2 text-sm font-semibold text-moss">
                <ShieldCheck size={16} aria-hidden="true" />
                SaaS para servicios tecnicos y trabajos en terreno
              </p>
              <h1 className="text-5xl font-black leading-[1.02] tracking-normal text-ink sm:text-6xl lg:text-7xl">
                ServicioPro
              </h1>
              <p className="mt-6 max-w-xl text-lg leading-8 text-ink/72">
                Gestiona clientes, ordenes de trabajo, agenda, evidencias y cobros desde un panel
                profesional conectado a Supabase.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <a
                  href="/register"
                  className="rounded-md bg-ink px-5 py-3 text-sm font-bold text-white transition hover:bg-ink/90"
                >
                  Crear cuenta
                </a>
                <a
                  href="#modelo"
                  className="rounded-md border border-ink/15 bg-white px-5 py-3 text-sm font-bold text-ink transition hover:border-ink/35"
                >
                  Modelo de negocio
                </a>
              </div>
            </div>

            <div className="rounded-md border border-ink/10 bg-white p-4 shadow-panel">
              <div className="flex items-center justify-between border-b border-ink/10 pb-4">
                <div>
                  <p className="text-sm font-bold text-ink">Panel operativo</p>
                  <p className="text-xs text-ink/55">Hoy, operaciones activas</p>
                </div>
                <div className="flex items-center gap-2 rounded-md bg-moss/10 px-3 py-2 text-xs font-bold text-moss">
                  <Activity size={15} aria-hidden="true" />
                  En vivo
                </div>
              </div>

              <div className="grid gap-3 py-4 sm:grid-cols-3">
                {stats.map((item) => (
                  <div key={item.label} className={`rounded-md p-4 ${item.tone}`}>
                    <p className="text-2xl font-black">{item.value}</p>
                    <p className="mt-1 text-xs font-semibold opacity-80">{item.label}</p>
                  </div>
                ))}
              </div>

              <div className="space-y-3">
                {orders.map((order) => (
                  <article
                    key={order.client}
                    className="grid gap-3 rounded-md border border-ink/10 p-4 sm:grid-cols-[1fr_auto] sm:items-center"
                  >
                    <div>
                      <div className="flex flex-wrap items-center gap-2">
                        <p className="font-bold">{order.client}</p>
                        <span className="rounded-md bg-steel/10 px-2 py-1 text-xs font-bold text-steel">
                          {order.status}
                        </span>
                      </div>
                      <p className="mt-1 text-sm text-ink/65">{order.task}</p>
                    </div>
                    <div className="flex items-center justify-between gap-4 text-sm sm:block sm:text-right">
                      <p className="font-bold">{order.time}</p>
                      <p className="text-ink/60">{order.amount}</p>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="producto" className="bg-white py-16">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
          <div className="grid gap-4 md:grid-cols-4">
            {features.map((feature) => (
              <article key={feature.title} className="rounded-md border border-ink/10 p-5">
                <feature.icon className="mb-4 text-clay" size={24} aria-hidden="true" />
                <h2 className="text-lg font-black">{feature.title}</h2>
                <p className="mt-2 text-sm leading-6 text-ink/65">{feature.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="modelo" className="border-y border-ink/10 bg-paper py-16">
        <div className="mx-auto grid max-w-7xl gap-10 px-5 sm:px-8 md:grid-cols-[0.8fr_1.2fr] lg:px-10">
          <div>
            <p className="text-sm font-bold uppercase text-clay">Monetizacion</p>
            <h2 className="mt-2 text-3xl font-black">Planes mensuales para negocios reales.</h2>
          </div>
          <div className="grid gap-3 sm:grid-cols-3">
            {["Gratis: 10 ordenes", "Pro: 50 ordenes", "Equipo: usuarios ilimitados"].map((plan) => (
              <div key={plan} className="rounded-md border border-ink/10 bg-white p-5">
                <CheckCircle2 className="mb-4 text-moss" size={22} aria-hidden="true" />
                <p className="font-bold">{plan}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="infra" className="bg-white py-16">
        <div className="mx-auto grid max-w-7xl gap-8 px-5 sm:px-8 md:grid-cols-2 lg:px-10">
          <div>
            <p className="text-sm font-bold uppercase text-steel">Infraestructura</p>
            <h2 className="mt-2 text-3xl font-black">Local primero, nube despues.</h2>
          </div>
          <div className="grid gap-3 text-sm font-semibold text-ink/72">
            <p className="rounded-md bg-paper p-4">Next.js corre en `localhost` para desarrollo.</p>
            <p className="rounded-md bg-paper p-4">Supabase maneja Auth, Postgres, RLS y Storage.</p>
            <p className="rounded-md bg-paper p-4">Vercel despliega el frontend y backend productivo.</p>
            <p className="rounded-md bg-paper p-4">GitHub guarda el control de versiones en la nube.</p>
          </div>
        </div>
      </section>

      <footer className="border-t border-ink/10 bg-ink px-5 py-8 text-white">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-bold">ServicioPro</p>
          <p className="flex items-center gap-2 text-sm text-white/70">
            <MapPin size={16} aria-hidden="true" />
            Construido para operaciones en terreno
          </p>
        </div>
      </footer>
    </main>
  );
}
