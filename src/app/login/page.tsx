import { signInAction } from "@/app/auth/actions";
import { Wrench } from "lucide-react";
import Link from "next/link";

type LoginPageProps = {
  searchParams: Promise<{
    error?: string;
    message?: string;
  }>;
};

export default async function LoginPage({ searchParams }: LoginPageProps) {
  const params = await searchParams;

  return (
    <main className="grid min-h-screen place-items-center bg-paper px-5 py-10 text-ink">
      <section className="w-full max-w-md rounded-md border border-ink/10 bg-white p-6 shadow-panel">
        <div className="mb-8 flex items-center gap-3">
          <div className="grid h-11 w-11 place-items-center rounded-md bg-ink text-white">
            <Wrench size={22} aria-hidden="true" />
          </div>
          <div>
            <p className="text-xl font-black">ServicioPro</p>
            <p className="text-sm text-ink/55">Acceso operativo</p>
          </div>
        </div>

        <h1 className="text-3xl font-black">Ingresar</h1>
        <p className="mt-2 text-sm leading-6 text-ink/62">
          Accede al panel para gestionar clientes, tecnicos y ordenes de trabajo.
        </p>

        {params.error ? (
          <p className="mt-5 rounded-md border border-clay/25 bg-clay/10 p-3 text-sm font-semibold text-clay">
            {params.error}
          </p>
        ) : null}

        {params.message ? (
          <p className="mt-5 rounded-md border border-moss/25 bg-moss/10 p-3 text-sm font-semibold text-moss">
            {params.message}
          </p>
        ) : null}

        <form action={signInAction} className="mt-6 grid gap-4">
          <label className="grid gap-2 text-sm font-bold">
            Email
            <input
              className="rounded-md border border-ink/15 px-3 py-3 font-normal outline-none transition focus:border-steel"
              name="email"
              type="email"
              autoComplete="email"
              required
            />
          </label>
          <label className="grid gap-2 text-sm font-bold">
            Contrasena
            <input
              className="rounded-md border border-ink/15 px-3 py-3 font-normal outline-none transition focus:border-steel"
              name="password"
              type="password"
              autoComplete="current-password"
              required
            />
          </label>
          <button className="rounded-md bg-ink px-4 py-3 text-sm font-bold text-white transition hover:bg-ink/90">
            Entrar al panel
          </button>
        </form>

        <p className="mt-6 text-sm text-ink/65">
          No tienes cuenta?{" "}
          <Link className="font-bold text-clay" href="/register">
            Crear cuenta
          </Link>
        </p>
      </section>
    </main>
  );
}
