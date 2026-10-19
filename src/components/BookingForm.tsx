"use client";

import { FormEvent, useState } from "react";
import { createBooking } from "@/lib/firestore";
import { services } from "@/lib/services";
import { useAuth } from "@/components/AuthProvider";

export function BookingForm({ initialServiceId }: { initialServiceId?: string }) {
  const { user } = useAuth();
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true); setMessage("");
    const data = new FormData(e.currentTarget);
    const service = services.find((item) => item.id === data.get("service"));
    if (!service) return setLoading(false);
    if (!user) { setMessage("Entre na sua conta para reservar e acompanhar o agendamento."); setLoading(false); return; }
    try {
      const id = await createBooking({
        customerId: user.uid, customerName: String(data.get("name") || user.displayName || ""), customerPhone: String(data.get("phone")),
        customerEmail: String(data.get("email") || ""), serviceId: service.id, serviceName: service.name,
        date: String(data.get("date")), time: String(data.get("time")), priceCents: service.priceCents,
        durationMinutes: service.durationMinutes, professionalId: String(data.get("professional") || "fernando"),
        professionalName: "Fernando"
      });
      setMessage(`Pré-reserva ${id} criada. Finalize o pagamento para confirmar.`);
      e.currentTarget.reset();
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Não foi possível reservar o horário.");
    } finally { setLoading(false); }
  }
  return <form onSubmit={submit} className="grid gap-3 rounded-3xl border border-white/10 bg-panel p-5 shadow-xl md:grid-cols-2">
    <input name="name" required placeholder="Seu nome" className="field" />
    <input name="phone" required placeholder="WhatsApp" className="field" />
    <input name="email" type="email" placeholder="E-mail (opcional)" className="field" />
    <select name="service" defaultValue={initialServiceId} className="field">{services.map((s) => <option key={s.id} value={s.id}>{s.name} - R$ {(s.priceCents / 100).toFixed(2)} ({s.durationMinutes} min)</option>)}</select>
    <select name="professional" className="field"><option value="fernando">Fernando · Especialista</option></select>
    <input name="date" type="date" required className="field" />
    <select name="time" required className="field">{["09:00","10:00","11:00","13:00","14:00","15:00","16:00","17:00","18:00"].map((time) => <option key={time}>{time}</option>)}</select>
    <button disabled={loading} className="md:col-span-2 rounded-xl bg-gold px-5 py-3 font-bold text-ink transition-all duration-300 ease-in-out hover:scale-[1.02] hover:shadow-lg hover:shadow-amber-500/20 disabled:cursor-not-allowed disabled:opacity-50">{loading ? "Reservando..." : "Continuar para pagamento"}</button>
    {message && <p role="status" className="md:col-span-2 text-sm text-white/70">{message}</p>}
  </form>;
}
