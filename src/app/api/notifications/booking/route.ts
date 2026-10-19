import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  if (!body?.customerPhone || !body?.serviceName || !body?.date || !body?.time) return NextResponse.json({ error: "Dados da reserva incompletos." }, { status: 400 });
  if (!process.env.WHATSAPP_API_URL || !process.env.WHATSAPP_API_TOKEN) return NextResponse.json({ error: "WhatsApp API não configurada." }, { status: 503 });
  if (!process.env.RESEND_API_KEY) return NextResponse.json({ error: "Resend não configurado." }, { status: 503 });
  return NextResponse.json({ error: "Configure o provedor de WhatsApp e o template Resend nesta rota." }, { status: 501 });
}
