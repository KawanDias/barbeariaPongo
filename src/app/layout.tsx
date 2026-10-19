import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { InstallPrompt } from "@/components/InstallPrompt";
import { AuthProvider } from "@/components/AuthProvider";
import { BookingProvider } from "@/components/BookingProvider";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
export const metadata: Metadata = {
  title: "A Barbearia do Pongo",
  description: "Seu estilo começa aqui.",
  manifest: "/manifest.json",
  icons: {
    icon: "/logo-pongo.png",
    shortcut: "/logo-pongo.png",
    apple: "/logo-pongo.png"
  }
};
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="pt-BR"><body className={inter.variable}><AuthProvider><BookingProvider><main>{children}</main><InstallPrompt /></BookingProvider></AuthProvider></body></html>;
}
