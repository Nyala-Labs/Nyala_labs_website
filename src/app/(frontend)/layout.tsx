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
  title: "Nyala Labs — Blaze the Trail",
  description:
    "A Malaysia-based youth club for builders, creators, and innovators who are passionate about technology and innovation especially in the field of AI. We are a vibrant comminuty wish to learn and grow together.",
  icons: {
    icon: "/favicon/nyalalabslogo.svg",
    shortcut: "/favicon/nyalalabslogo.svg",
  },
  openGraph: {
    title: "Nyala Labs — Blaze the Trail",
    description:
      "A Malaysia-based youth club for builders, creators, and innovators who are passionate about technology and innovation especially in the field of AI. We are a vibrant comminuty wish to learn and grow together.",
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
