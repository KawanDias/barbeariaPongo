export const business = {
  name: "A Barbearia do Pongo",
  phone: "5542999559516",
  displayPhone: "(42) 99955-9516",
  address: "Rua Campina Alta, 159 - Parque Limeira Área 02, Telêmaco Borba - PR, 84267-000",
  mapsQuery: "A Barbearia do Pongo, Rua Campina Alta, 159, Telêmaco Borba - PR",
  hours: "Terça a sábado, das 9h às 19h"
};

export function whatsappLink(message = "Olá! Gostaria de agendar um horário na Barbearia do Pongo.") {
  return `https://wa.me/${business.phone}?text=${encodeURIComponent(message)}`;
}
