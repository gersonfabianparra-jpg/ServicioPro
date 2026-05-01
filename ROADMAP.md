# Roadmap ServicioPro

## Objetivo

Construir un SaaS profesional para negocios de servicios en terreno, con frontend, backend, Supabase, control de versiones en GitHub y despliegue productivo en Vercel.

## Estado actual

- Proyecto Next.js creado.
- Landing publica creada.
- Dashboard visual inicial creado.
- Supabase URL y anon key conectadas en `.env.local`.
- Build y typecheck funcionando.
- Git inicializado.
- Repositorio remoto conectado en GitHub.

## Pendiente inmediato

1. Ejecutar `supabase/schema.sql` en Supabase SQL Editor.
2. Verificar que existan las tablas:
   - `organizations`
   - `organization_members`
   - `customers`
   - `technicians`
   - `work_orders`
3. Crear login y registro con Supabase Auth.
4. Proteger `/app` para usuarios autenticados.
5. Crear flujo inicial de organizacion al registrarse.

## MVP funcional

1. Clientes:
   - Crear cliente.
   - Listar clientes.
   - Editar cliente.
2. Tecnicos:
   - Crear tecnico.
   - Activar/desactivar tecnico.
3. Ordenes de trabajo:
   - Crear orden.
   - Asignar cliente.
   - Asignar tecnico.
   - Cambiar estado.
   - Registrar monto.
4. Dashboard:
   - Ordenes abiertas.
   - Servicios del dia.
   - Total por cobrar.
   - Ultimas ordenes.

## Infraestructura profesional

1. Supabase:
   - Auth.
   - Postgres.
   - Row Level Security.
   - Storage para evidencias.
2. GitHub:
   - Commits por avance.
   - Rama `main` estable.
3. Vercel:
   - Deploy conectado a GitHub.
   - Variables de entorno productivas.
4. Seguridad:
   - `anon key` solo para frontend.
   - `service_role` solo en servidor seguro.
   - Nunca subir `.env.local`.

## Monetizacion

1. Plan gratis:
   - Hasta 10 ordenes mensuales.
2. Plan Pro:
   - Mas ordenes.
   - Mas usuarios.
   - Reportes.
3. Plan Equipo:
   - Usuarios ilimitados.
   - Evidencias.
   - Roles.
   - Soporte prioritario.

## Despues del MVP

1. Subida de fotos/evidencias con Supabase Storage.
2. PDF de orden de trabajo.
3. Notificaciones por email.
4. Integracion de pagos con Stripe o Mercado Pago.
5. Deploy productivo en Vercel.
