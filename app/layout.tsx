import type { Metadata } from "next";
import { Space_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});

import { prisma } from "@/lib/prisma";

export async function generateMetadata(): Promise<Metadata> {
  const settings = await prisma.siteSettings.findUnique({
    where: { id: "global" },
  });

  return {
    title: settings?.metaTitle || "Muhammad Abdullah | Portfolio",
    description:
      settings?.metaDescription || "Full Stack Software Developer Portfolio",
  };
}

import Preloader from "./components/Preloader";
import MobileMenu from "./components/MobileMenu";
import CustomCursor from "./components/CustomCursor";
import ScrollReveal from "./components/ScrollReveal";
import SmoothScroll from "./components/SmoothScroll";

import { Toaster } from "sonner";

import { SocketProvider } from "@/app/components/providers/SocketProvider";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${spaceGrotesk.variable} ${jetbrainsMono.variable} font-[family-name:var(--font-space-grotesk)] antialiased`}
      >
        <SocketProvider>
          <Toaster position="top-right" richColors theme="dark" />
          <Preloader />
          <MobileMenu />
          <CustomCursor />
          <ScrollReveal />
          <SmoothScroll>{children}</SmoothScroll>
        </SocketProvider>
      </body>
    </html>
  );
}
