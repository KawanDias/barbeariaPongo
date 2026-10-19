"use client";

import { FormEvent, useState } from "react";
import { services } from "@/lib/services";
import { useAuth } from "@/components/AuthProvider";
import { useBookings } from "@/components/BookingProvider";

export function BookingForm({ initialServiceId }: { initialServiceId?: string }) {
  const { user } = useAuth();
  const { createBooking } = useBookings();
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const availableDays = getAvailableDays();
  const [selectedDate, setSelectedDate] = useState(availableDays[0]?.value ?? "");
  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true); setMessage("");
    const data = new FormData(e.currentTarget);
    const service = services.find((item) => item.id === data.get("service"));
    if (!service) return setLoading(false);
    if (!user) { setMessage("Entre na sua conta para reservar e acompanhar o agendamento."); setLoading(false); return; }
    try {
      const paymentStatus = String(data.get("payment")) as "pending" | "paid";
      const booking = createBooking({
        customerId: user.uid, customerName: String(data.get("name") || user.displayName || ""), customerPhone: String(data.get("phone")),
        customerEmail: String(data.get("email") || ""), serviceId: service.id, serviceName: service.name,
        date: String(data.get("date")), time: String(data.get("time")), priceCents: service.priceCents,
        durationMinutes: service.durationMinutes, professionalId: String(data.get("professional") || "fernando"),
        professionalName: "Fernando", paymentStatus
      });
      setMessage(paymentStatus === "paid" ? `Agendamento ${booking.id} confirmado e pagamento simulado como pago.` : `Agendamento ${booking.id} reservado. O pagamento será feito no local.`);
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
    <div className="md:col-span-2">
      <div className="mb-2 flex items-center justify-between">
        <label className="text-sm font-semibold text-white/80">Escolha o dia</label>
        <span className="text-xs text-white/50">Dias disponíveis para atendimento</span>
      </div>
      <input name="date" type="hidden" value={selectedDate} required />
      <div className="flex gap-2 overflow-x-auto pb-2" aria-label="Dias disponíveis">
        {availableDays.map((day) => (
          <button
            key={day.value}
            type="button"
            onClick={() => setSelectedDate(day.value)}
            className={`min-w-[76px] rounded-2xl border px-3 py-3 text-center transition-all duration-300 ${
              selectedDate === day.value
                ? "border-gold bg-gold text-ink shadow-lg shadow-amber-500/20"
                : "border-white/10 bg-ink text-white/70 hover:border-gold/60 hover:text-gold"
            }`}
          >
            <span className="block text-[11px] uppercase tracking-wider">{day.weekday}</span>
            <strong className="mt-1 block text-2xl">{day.day}</strong>
            <span className="block text-[11px] uppercase">{day.month}</span>
          </button>
        ))}
      </div>
      {selectedDate && <p className="mt-2 text-xs text-gold">Dia selecionado: {formatSelectedDate(selectedDate)}</p>}
    </div>
    <select name="time" required className="field">{["09:00","10:00","11:00","13:00","14:00","15:00","16:00","17:00","18:00"].map((time) => <option key={time}>{time}</option>)}</select>
    <fieldset className="md:col-span-2 grid gap-2 sm:grid-cols-2">
      <legend className="mb-1 text-sm text-white/60">Forma de pagamento</legend>
      <label className="rounded-xl border border-white/10 p-3 text-sm"><input type="radio" name="payment" value="pending" defaultChecked className="mr-2" />Agendar e Pagar no Local</label>
      <label className="rounded-xl border border-white/10 p-3 text-sm"><input type="radio" name="payment" value="paid" className="mr-2" />Pagar Agora (Antecipado)</label>
    </fieldset>
    <button disabled={loading || !selectedDate} className="md:col-span-2 rounded-xl bg-gold px-5 py-3 font-bold text-ink transition-all duration-300 ease-in-out hover:scale-[1.02] hover:shadow-lg hover:shadow-amber-500/20 disabled:cursor-not-allowed disabled:opacity-50">{loading ? "Reservando..." : "Confirmar agendamento"}</button>
    {message && <p role="status" className="md:col-span-2 text-sm text-white/70">{message}</p>}
  </form>;
}

function getAvailableDays() {
  const days: Array<{ value: string; weekday: string; day: string; month: string }> = [];
  const cursor = new Date();
  cursor.setHours(12, 0, 0, 0);
  while (days.length < 14) {
    const weekDay = cursor.getDay();
    if (weekDay >= 2 && weekDay <= 6) {
      const value = [
        cursor.getFullYear(),
        String(cursor.getMonth() + 1).padStart(2, "0"),
        String(cursor.getDate()).padStart(2, "0")
      ].join("-");
      days.push({
        value,
        weekday: cursor.toLocaleDateString("pt-BR", { weekday: "short" }).replace(".", ""),
        day: String(cursor.getDate()),
        month: cursor.toLocaleDateString("pt-BR", { month: "short" }).replace(".", "")
      });
    }
    cursor.setDate(cursor.getDate() + 1);
  }
  return days;
}

function formatSelectedDate(value: string) {
  return new Date(`${value}T12:00:00`).toLocaleDateString("pt-BR", {
    weekday: "long",
    day: "2-digit",
    month: "long"
  });
}
