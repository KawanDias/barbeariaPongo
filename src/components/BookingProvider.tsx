"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";

export type BookingStatus = "pending" | "confirmed" | "completed" | "cancelled";
export type PaymentStatus = "pending" | "paid";
export type ReminderOption = "15m" | "25m" | "40m" | "1h" | "2h";
export type LocalBooking = {
  id: string; customerId: string; customerName: string; customerPhone: string; customerEmail?: string;
  serviceId: string; serviceName: string; date: string; time: string; priceCents: number; durationMinutes: number;
  professionalId: string; professionalName: string; status: BookingStatus; paymentStatus: PaymentStatus;
  reminder?: ReminderOption; rating?: number; review?: string; createdAt: string;
};

type BookingContextValue = {
  bookings: LocalBooking[];
  createBooking: (booking: Omit<LocalBooking, "id" | "status" | "createdAt">) => LocalBooking;
  cancelBooking: (id: string) => void;
  setReminder: (id: string, reminder: ReminderOption) => void;
  rateBooking: (id: string, rating: number, review: string) => void;
};

const STORAGE_KEY = "pongo.local.bookings";
const BookingContext = createContext<BookingContextValue | null>(null);

function readBookings(): LocalBooking[] {
  try {
    const value = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "[]");
    return Array.isArray(value) ? value : [];
  } catch {
    return [];
  }
}

export function BookingProvider({ children }: { children: React.ReactNode }) {
  const [bookings, setBookings] = useState<LocalBooking[]>([]);
  useEffect(() => setBookings(readBookings()), []);
  function save(next: LocalBooking[]) { localStorage.setItem(STORAGE_KEY, JSON.stringify(next)); setBookings(next); }
  const value = useMemo<BookingContextValue>(() => ({
    bookings,
    createBooking: (input) => {
      const conflict = bookings.some((item) => item.status !== "cancelled" && item.date === input.date && item.time === input.time && item.professionalId === input.professionalId);
      if (conflict) throw new Error("Este horário já está reservado. Escolha outro.");
      const booking: LocalBooking = { ...input, id: `booking-${crypto.randomUUID()}`, status: input.paymentStatus === "paid" ? "confirmed" : "pending", createdAt: new Date().toISOString() };
      save([...bookings, booking]);
      return booking;
    },
    cancelBooking: (id) => save(bookings.map((item) => item.id === id ? { ...item, status: "cancelled" } : item)),
    setReminder: (id, reminder) => save(bookings.map((item) => item.id === id ? { ...item, reminder } : item)),
    rateBooking: (id, rating, review) => save(bookings.map((item) => item.id === id ? { ...item, rating, review } : item))
  }), [bookings]);
  return <BookingContext.Provider value={value}>{children}</BookingContext.Provider>;
}

export function useBookings() {
  const context = useContext(BookingContext);
  if (!context) throw new Error("useBookings deve ser usado dentro de BookingProvider");
  return context;
}
