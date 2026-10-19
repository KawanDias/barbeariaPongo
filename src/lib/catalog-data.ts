import { mockCortes, mockProducts, MockCorte, MockProduct } from "@/data/mockData";

export type Product = {
  id: string;
  name: string;
  description: string;
  priceCents: number;
  category: string;
  imageUrls: string[];
  fotos?: string[];
  emDestaque: boolean;
};

export type PortfolioItem = {
  id: string;
  name: string;
  description: string;
  serviceId: string;
  suggestedPriceCents: number;
  imageUrls: string[];
  fotos?: string[];
  emDestaque: boolean;
};

export const fallbackProducts: Product[] = mockProducts.map((product: MockProduct) => ({
  id: product.id,
  name: product.nome,
  description: product.descricao,
  priceCents: product.precoCents,
  category: product.categoria,
  imageUrls: product.fotos,
  fotos: product.fotos,
  emDestaque: product.emDestaque
}));

export const fallbackPortfolio: PortfolioItem[] = mockCortes.map((corte: MockCorte) => ({
  id: corte.id,
  name: corte.titulo,
  description: corte.descricao,
  serviceId: corte.serviceId,
  suggestedPriceCents: corte.precoSugeridoCents,
  imageUrls: corte.fotos,
  fotos: corte.fotos,
  emDestaque: corte.emDestaque
}));

export function formatPrice(priceCents: number) {
  return new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(priceCents / 100);
}
