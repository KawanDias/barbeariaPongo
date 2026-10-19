import { ShoppingBag } from "lucide-react";
import { whatsappLink } from "@/lib/business";
import { formatPrice, Product } from "@/lib/catalog-data";

export function CatalogCard({ product }: { product: Product }) {
  return <article className="group overflow-hidden rounded-2xl border border-white/10 bg-panel transition-all duration-300 ease-in-out hover:-translate-y-1.5 hover:border-amber-400/40 hover:shadow-lg hover:shadow-amber-500/10"><div className="flex aspect-[4/3] items-center justify-center overflow-hidden bg-gradient-to-br from-panel to-gold/20 text-gold">{product.imageUrls[0] ? <img src={product.imageUrls[0]} alt={product.name} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" /> : <ShoppingBag size={42} />}</div><div className="p-5"><p className="text-xs uppercase tracking-widest text-gold">{product.category}</p><h3 className="mt-2 font-bold">{product.name}</h3><p className="mt-1 text-sm text-white/60">{product.description}</p><div className="mt-4 flex items-center justify-between gap-3"><strong className="text-price">{formatPrice(product.priceCents)}</strong><a className="rounded-lg bg-gold px-3 py-2 text-sm font-bold text-ink transition-all duration-300 hover:scale-[1.02] hover:shadow-lg hover:shadow-amber-500/20" href={whatsappLink(`Olá! Quero comprar: ${product.name}.`)}>Pedir</a></div></div></article>;
}
