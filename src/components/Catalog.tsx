"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { CatalogCard } from "@/components/CatalogCard";
import { fallbackProducts, Product } from "@/lib/catalog-data";
import { db } from "@/lib/firebase";

export function Catalog() {
  const [products, setProducts] = useState<Product[]>(fallbackProducts.filter((item) => item.emDestaque));
  useEffect(() => { if (!db) return; void getDocs(collection(db, "products")).then((snapshot) => { const remote = snapshot.docs.map((item) => ({ id: item.id, ...item.data() } as Product)).filter((item) => item.emDestaque); if (remote.length) setProducts(remote); }); }, []);
  return <section className="mx-auto max-w-6xl px-5 py-16"><div className="flex items-end justify-between gap-4"><div><p className="font-semibold uppercase tracking-widest text-gold">Na bancada</p><h2 className="mt-2 font-sans text-4xl uppercase">Produtos do Pongo</h2></div><Link href="/produtos" className="text-sm text-gold">Ver todos →</Link></div><div className="mt-8 grid gap-4 sm:grid-cols-3">{products.slice(0, 3).map((product) => <CatalogCard key={product.id} product={product} />)}</div></section>;
}
