"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { fallbackPortfolio, PortfolioItem } from "@/lib/catalog-data";
import { db } from "@/lib/firebase";
import { PortfolioCard } from "@/components/PortfolioCard";

export function Gallery() {
  const [items, setItems] = useState<PortfolioItem[]>(fallbackPortfolio.filter((item) => item.emDestaque));
  useEffect(() => { if (!db) return; void getDocs(collection(db, "gallery")).then((snapshot) => { const remote = snapshot.docs.map((item) => ({ id: item.id, ...item.data() } as PortfolioItem)).filter((item) => item.emDestaque); if (remote.length) setItems(remote); }); }, []);
  return <section className="bg-ink px-5 py-16 text-white"><div className="mx-auto max-w-6xl"><div className="flex items-end justify-between gap-4"><div><p className="font-semibold uppercase tracking-widest text-gold">Portfólio</p><h2 className="mt-2 font-sans text-4xl uppercase">Nossos trabalhos</h2></div><Link href="/portfolio" className="text-sm text-gold">Ver tudo →</Link></div><div className="mt-8 grid grid-cols-2 gap-3 md:grid-cols-4">{items.slice(0, 4).map((item) => <PortfolioCard key={item.id} item={item} />)}</div></div></section>;
}
