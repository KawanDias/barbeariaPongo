export async function POST(request: Request) {
  const signature = request.headers.get("x-payment-signature");
  if (!signature || !process.env.PAYMENT_WEBHOOK_SECRET || signature !== process.env.PAYMENT_WEBHOOK_SECRET) {
    return new Response("Webhook não autorizado.", { status: 401 });
  }
  const event = await request.json().catch(() => null);
  if (!event?.bookingId || event.status !== "paid") return new Response("Evento inválido.", { status: 400 });
  return Response.json({ received: true, bookingId: event.bookingId });
}
