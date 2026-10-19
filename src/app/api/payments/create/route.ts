import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  if (!body?.bookingId || !Number.isInteger(body.amountCents) || body.amountCents <= 0) {
    return NextResponse.json({ error: "bookingId e amountCents válido são obrigatórios." }, { status: 400 });
  }
  if (!process.env.MERCADO_PAGO_ACCESS_TOKEN && !process.env.ASAAS_API_KEY) {
    return NextResponse.json({ error: "Gateway de pagamento não configurado. Defina MERCADO_PAGO_ACCESS_TOKEN ou ASAAS_API_KEY." }, { status: 503 });
  }
  return NextResponse.json({ error: "Adicione a implementação do gateway escolhido nesta rota antes de aceitar pagamentos." }, { status: 501 });
}
