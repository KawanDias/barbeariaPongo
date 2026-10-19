import Link from "next/link";
import { Scissors } from "lucide-react";
import { formatPrice, PortfolioItem } from "@/lib/catalog-data";
import { PLACEHOLDER_IMAGE } from "@/data/mockData";

export function PortfolioCard({ item }: { item: PortfolioItem }) {
  const source = item.fotos?.[0] ?? item.imageUrls[0] ?? PLACEHOLDER_IMAGE;
  return <Link href={`/portfolio/${item.id}`} className="group overflow-hidden rounded-2xl border border-white/10 bg-panel transition-all duration-300 ease-in-out hover:-translate-y-1.5 hover:border-amber-400/40 hover:shadow-lg hover:shadow-amber-500/10"><div className="flex aspect-square items-center justify-center overflow-hidden bg-gradient-to-br from-ink to-gold/50 text-gold"><img src={source} alt={item.name} onError={(event) => { event.currentTarget.src = PLACEHOLDER_IMAGE; }} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" /></div><div className="p-4"><h3 className="font-bold">{item.name}</h3><p className="mt-1 text-sm text-white/60">{item.description}</p><p className="mt-3 text-sm text-price">{formatPrice(item.suggestedPriceCents)}</p></div></Link>;
}
