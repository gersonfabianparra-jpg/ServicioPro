import { signUpAction } from "@/app/auth/actions";
import { Wrench } from "lucide-react";
import Link from "next/link";

type RegisterPageProps = {
  searchParams: Promise<{
    error?: string;
  }>;
};

export default async function RegisterPage({ searchParams }: RegisterPageProps) {
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
            <p className="text-sm text-ink/55">Nueva empresa</p>
          </div>
        </div>

        <h1 className="text-3xl font-black">Crear cuenta</h1>
        <p className="mt-2 text-sm leading-6 text-ink/62">
          Crea el acceso inicial para empezar a operar tu negocio de servicios.
        </p>

        {params.error ? (
          <p className="mt-5 rounded-md border border-clay/25 bg-clay/10 p-3 text-sm font-semibold text-clay">
            {params.error}
          </p>
        ) : null}

        <form action={signUpAction} className="mt-6 grid gap-4">
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
              autoComplete="new-password"
              minLength={8}
              required
            />
          </label>
          <button className="rounded-md bg-clay px-4 py-3 text-sm font-bold text-white transition hover:bg-clay/90">
            Crear cuenta
          </button>
        </form>

        <p className="mt-6 text-sm text-ink/65">
          Ya tienes cuenta?{" "}
          <Link className="font-bold text-clay" href="/login">
            Ingresar
          </Link>
        </p>
      </section>
    </main>
  );
}
