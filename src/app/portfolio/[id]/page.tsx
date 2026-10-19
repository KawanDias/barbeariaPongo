import Link from "next/link";
import { notFound } from "next/navigation";
import { Header } from "@/components/Header";
import { fallbackPortfolio, formatPrice } from "@/lib/catalog-data";

export function generateStaticParams() { return fallbackPortfolio.map((item) => ({ id: item.id })); }

export default async function PortfolioDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const item = fallbackPortfolio.find((entry) => entry.id === id);
  if (!item) notFound();
  return <><Header /><main className="mx-auto min-h-screen max-w-5xl px-5 py-12"><Link href="/portfolio" className="text-sm text-gold">← Portfólio</Link><div className="mt-8 grid gap-8 md:grid-cols-2"><div className="grid grid-cols-2 gap-3">{Array.from({ length: Math.min(5, Math.max(1, item.imageUrls.length || 4)) }).map((_, index) => <div key={index} className="flex aspect-square items-center justify-center rounded-2xl bg-gradient-to-br from-panel to-gold/40 text-sm text-white/50">{item.imageUrls[index] ? <img src={item.imageUrls[index]} alt={`${item.name} ${index + 1}`} className="h-full w-full rounded-2xl object-cover" /> : `Ângulo ${index + 1}`}</div>)}</div><div><p className="text-sm uppercase tracking-widest text-gold">Detalhes do corte</p><h1 className="mt-3 font-sans text-5xl uppercase">{item.name}</h1><p className="mt-5 text-white/60">{item.description}</p><p className="mt-6 text-2xl font-bold text-price">{formatPrice(item.suggestedPriceCents)}</p><Link href={`/agendar?service=${item.serviceId}`} className="mt-8 inline-block rounded-xl bg-gold px-5 py-3 font-bold text-ink">Agendar este corte</Link></div></div></main></>;
}
