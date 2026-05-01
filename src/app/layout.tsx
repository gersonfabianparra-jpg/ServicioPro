import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ServicioPro",
  description: "Gestion profesional para negocios de servicios en terreno.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
