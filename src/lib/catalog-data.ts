export type Product = {
  id: string;
  name: string;
  description: string;
  priceCents: number;
  category: string;
  imageUrls: string[];
  emDestaque: boolean;
};

export type PortfolioItem = {
  id: string;
  name: string;
  description: string;
  serviceId: string;
  suggestedPriceCents: number;
  imageUrls: string[];
  emDestaque: boolean;
};

export const fallbackProducts: Product[] = [
  { id: "pomada", name: "Pomada modeladora", description: "Fixação forte e acabamento natural.", priceCents: 3990, category: "Pomadas", imageUrls: [], emDestaque: true },
  { id: "oleo-barba", name: "Óleo para barba", description: "Hidratação e perfume marcante.", priceCents: 2990, category: "Barba", imageUrls: [], emDestaque: true },
  { id: "minoxidil", name: "Minoxidil", description: "Consulte disponibilidade.", priceCents: 5990, category: "Tratamentos", imageUrls: [], emDestaque: false }
];

export const fallbackPortfolio: PortfolioItem[] = [
  { id: "degrade-classico", name: "Degradê clássico", description: "Laterais limpas e topo texturizado.", serviceId: "corte-degrade", suggestedPriceCents: 4000, imageUrls: [], emDestaque: true },
  { id: "barba-desenhada", name: "Barba desenhada", description: "Contornos precisos e acabamento premium.", serviceId: "barba-completa", suggestedPriceCents: 4000, imageUrls: [], emDestaque: true },
  { id: "corte-texturizado", name: "Corte texturizado", description: "Volume e movimento para o dia a dia.", serviceId: "corte-social", suggestedPriceCents: 4000, imageUrls: [], emDestaque: false },
  { id: "combo-pongo", name: "Combo Pongo", description: "Corte e barba alinhados.", serviceId: "corte-barba", suggestedPriceCents: 8000, imageUrls: [], emDestaque: false }
];

export function formatPrice(priceCents: number) {
  return new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(priceCents / 100);
}
