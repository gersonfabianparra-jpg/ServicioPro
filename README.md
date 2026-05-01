# ServicioPro

SaaS para negocios de servicios en terreno: clientes, ordenes de trabajo, agenda, tecnicos, evidencias y cobros.

## Stack

- Next.js App Router
- TypeScript
- Tailwind CSS
- Supabase Auth, Postgres y Storage
- Vercel para produccion

## Desarrollo local

```bash
npm install
npm run dev
```

La aplicacion queda disponible en `http://localhost:3000`.

## Variables de entorno

Copia `.env.example` a `.env.local` y completa los datos de Supabase:

```bash
cp .env.example .env.local
```

## Supabase

El esquema inicial esta en `supabase/schema.sql`.
