import type { Metadata } from "next";
import { JetBrains_Mono, Pixelify_Sans } from "next/font/google";

import SiteShell from "@/components/layout/SiteShell";

import "../globals.css";

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
});

const pixelify = Pixelify_Sans({
  subsets: ["latin"],
  variable: "--font-pixelify",
});

export const metadata: Metadata = {
  title: "Nyala — Blaze the Trail",
  description:
    "A university club for builders, creators, and innovators who refuse to stay in the tutorial loop.",
  icons: {
    icon: "/favicon/nyalalabslogo.svg",
    shortcut: "/favicon/nyalalabslogo.svg",
  },
  openGraph: {
    title: "Nyala — Blaze the Trail",
    description:
      "A university club for builders, creators, and innovators who refuse to stay in the tutorial loop.",
    type: "website",
  },
};

export default function FrontendLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${jetbrains.variable} ${pixelify.variable}`}>
      <body className="font-mono antialiased">
        <SiteShell>{children}</SiteShell>
      </body>
    </html>
  );
}
