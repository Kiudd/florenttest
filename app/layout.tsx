import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Florent Penneçot - Portfolio",
  description: "Technicien Réseau & Cybersécurité - Bac Pro CIEL",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body>{children}</body>
    </html>
  );
}
