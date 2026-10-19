export type MockProduct = {
  id: string;
  nome: string;
  descricao: string;
  precoCents: number;
  categoria: string;
  fotos: string[];
  emDestaque: boolean;
};

export type MockCorte = {
  id: string;
  titulo: string;
  descricao: string;
  serviceId: string;
  precoSugeridoCents: number;
  fotos: [string, string, string, string];
  emDestaque: boolean;
};

export const PLACEHOLDER_IMAGE = "/samples/placeholder.svg";

export const mockProducts: MockProduct[] = [
  {
    id: "pomada-modeladora-mate",
    nome: "Pomada Modeladora Mate",
    descricao: "Fixação forte, efeito seco e acabamento natural para penteados estruturados.",
    precoCents: 3990,
    categoria: "Pomadas",
    fotos: ["/samples/produtos/pomada-modeladora.png"],
    emDestaque: true
  },
  {
    id: "oleo-para-barba",
    nome: "Óleo para Barba",
    descricao: "Hidratação, maciez e perfume discreto para a rotina de cuidados.",
    precoCents: 2990,
    categoria: "Barba",
    fotos: ["/samples/produtos/oleo-barba.png"],
    emDestaque: true
  },
  {
    id: "shampoo-cabelo-barba",
    nome: "Shampoo Cabelo e Barba",
    descricao: "Limpeza suave para cabelo e barba, ideal para uso diário.",
    precoCents: 3490,
    categoria: "Higiene",
    fotos: ["/samples/produtos/shampoo-cabelo-barba.jpg"],
    emDestaque: false
  },
  {
    id: "kit-hidratante-para-barba",
    nome: "Kit Hidratante para Barba",
    descricao: "Kit completo para hidratar, nutrir e manter a barba macia e bem cuidada.",
    precoCents: 4990,
    categoria: "Barba",
    fotos: ["/samples/produtos/hidratante-barba.png"],
    emDestaque: true
  }
];

export const mockCortes: MockCorte[] = [
  {
    id: "degrade-navalhado",
    titulo: "Degradê Navalhado (Mid Fade)",
    descricao: "Acabamento limpo com transição suave Mid Fade e finalização perfeita no topo.",
    serviceId: "corte-degrade",
    precoSugeridoCents: 4500,
    fotos: [
      "/samples/cortes/midfade-1.jpg",
      "/samples/cortes/midfade-2.jpg",
      "/samples/cortes/midfade-3.jpg",
      "/samples/cortes/midfade-4.jpg"
    ],
    emDestaque: true
  },
  {
    id: "barba-terapia",
    titulo: "Barba Terapia",
    descricao: "Ritual de barba com toalha quente, cuidado profundo e finalização hidratante.",
    serviceId: "barba-completa",
    precoSugeridoCents: 4000,
    fotos: [
      "/samples/cortes/barba-terapia1.jpg",
      "/samples/cortes/barba-terapia2.jpg",
      "/samples/cortes/barba-terapia3.jpg",
      "/samples/cortes/barba-terapia4.jpg"
    ],
    emDestaque: true
  },
  {
    id: "corte-social",
    titulo: "Corte Social",
    descricao: "Corte clássico e alinhado, com acabamento refinado feito na tesoura.",
    serviceId: "corte-social",
    precoSugeridoCents: 4000,
    fotos: [
      "/samples/cortes/corte-social1.jpg",
      "/samples/cortes/corte-social2.jpg",
      "/samples/cortes/corte-social3.jpg",
      "/samples/cortes/corte-social4.jpg"
    ],
    emDestaque: true
  },
  {
    id: "penteado-pompadour",
    titulo: "Penteado Pompadour",
    descricao: "Volume marcante no topo, laterais alinhadas e penteado para trás.",
    serviceId: "corte-social",
    precoSugeridoCents: 4000,
    fotos: [
      "/samples/cortes/penteado1.jpg",
      "/samples/cortes/penteado2.jpg",
      "/samples/cortes/penteado3.jpg",
      "/samples/cortes/penteado4.jpg"
    ],
    emDestaque: true
  }
];
