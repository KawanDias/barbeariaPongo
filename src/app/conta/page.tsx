"use client";

import Link from "next/link";
import { CalendarDays, ChevronRight, Heart, MapPin, Shield, UserRound } from "lucide-react";
import { useAuth } from "@/components/AuthProvider";

const options = [["Meus Dados", UserRound], ["Meus Acessos", Shield], ["Endereço", MapPin], ["Favoritos", Heart], ["Meus Agendamentos", CalendarDays], ["Segurança", Shield], ["Histórico", CalendarDays]] as const;
export default function AccountPage() {
  const { user, loading } = useAuth();
  if (loading) return <main className="grid min-h-screen place-items-center">Carregando...</main>;
  if (!user) return <main className="grid min-h-screen place-items-center"><Link href="/login" className="rounded-xl bg-gold px-5 py-3 font-bold text-ink">Entrar na conta</Link></main>;
  return <main className="min-h-screen px-5 py-10"><div className="mx-auto max-w-2xl"><Link href="/" className="text-sm text-gold">← Início</Link><div className="mt-8 flex items-center gap-4 rounded-3xl border border-white/10 bg-panel p-5"><img src={user.photoURL ?? "/icon.svg"} alt="" className="h-16 w-16 rounded-full object-cover" /><div><h1 className="text-xl font-bold">{user.displayName ?? "Cliente Pongo"}</h1><p className="text-sm text-white/50">{user.email}</p></div></div><div className="mt-5 overflow-hidden rounded-3xl border border-white/10 bg-panel">{options.map(([label, Icon]) => <Link key={label} href={label === "Meus Agendamentos" ? "/conta/agendamentos" : "#"} className="flex items-center gap-4 border-b border-white/10 px-5 py-4 last:border-0"><Icon size={19} className="text-gold" /><span>{label}</span><ChevronRight size={17} className="ml-auto text-white/30" /></Link>)}</div></div></main>;
}
