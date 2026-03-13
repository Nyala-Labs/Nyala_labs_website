import type { Metadata } from "next";
import { JetBrains_Mono, Pixelify_Sans } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import GrainOverlay from "@/components/ui/GrainOverlay";
import SplashCursor from "@/components/ui/SplashCursor";

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
  openGraph: {
    title: "Nyala — Blaze the Trail",
    description:
      "A university club for builders, creators, and innovators who refuse to stay in the tutorial loop.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${jetbrains.variable} ${pixelify.variable}`}>
      <body className="font-mono antialiased">
        <SplashCursor />
        <GrainOverlay />
        <Navbar />
        <main className="min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
