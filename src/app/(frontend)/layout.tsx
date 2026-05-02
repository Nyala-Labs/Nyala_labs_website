import type { Metadata } from "next";
import { JetBrains_Mono, Pixelify_Sans } from "next/font/google";
import localFont from "next/font/local";

import SiteShell from "@/components/layout/SiteShell";

import "../globals.css";

const retropix = localFont({
  src: "../../fonts/retropix.otf",
  variable: "--font-retropix",
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
});

const pixelify = Pixelify_Sans({
  subsets: ["latin"],
  variable: "--font-pixelify",
});

const siteDescription =
  "Nyala Labs is a Malaysia-based recognised youth society under the Ministry of Youth and Sports—a community for builders, creators, and innovators passionate about technology, especially AI. We learn and grow together.";

export const metadata: Metadata = {
  title: "Nyala Labs — Blaze the Trail",
  description: siteDescription,
  icons: {
    icon: "/favicon/nyalalabslogo.svg",
    shortcut: "/favicon/nyalalabslogo.svg",
  },
  openGraph: {
    title: "Nyala Labs — Blaze the Trail",
    description: siteDescription,
    type: "website",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Nyala Labs — Blaze the Trail",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Nyala Labs — Blaze the Trail",
    description: siteDescription,
    images: ["/og-image.jpg"],
  },
};

export default function FrontendLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${retropix.variable} ${jetbrains.variable} ${pixelify.variable}`}>
      <body className="font-mono antialiased">
        <SiteShell>{children}</SiteShell>
      </body>
    </html>
  );
}
