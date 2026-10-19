import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { InstallPrompt } from "@/components/InstallPrompt";
import { AuthProvider } from "@/components/AuthProvider";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
export const metadata: Metadata = { title: "A Barbearia do Pongo", description: "Seu estilo começa aqui.", manifest: "/manifest.json" };
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="pt-BR"><body className={inter.variable}><AuthProvider><main>{children}</main><InstallPrompt /></AuthProvider></body></html>;
}
