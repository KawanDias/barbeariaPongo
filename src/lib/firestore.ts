import { doc, runTransaction, serverTimestamp, Timestamp } from "firebase/firestore";
import { db } from "./firebase";

export type BookingInput = {
  customerId?: string;
  customerName: string;
  customerPhone: string;
  customerEmail?: string;
  serviceId: string;
  serviceName: string;
  date: string;
  time: string;
  priceCents: number;
  paymentStatus?: "pending" | "paid" | "refunded";
  professionalId?: string;
  professionalName?: string;
  durationMinutes?: number;
};

export const collections = {
  services: "services",
  bookings: "bookings",
  products: "products",
  gallery: "gallery",
  availability: "availability",
  customers: "customers"
} as const;

export async function createBooking(input: BookingInput) {
  if (!db) throw new Error("Firebase não configurado. Preencha o arquivo .env.local antes de agendar.");
  const bookingId = `${input.date}_${input.time.replace(":", "")}_${input.professionalId ?? "fernando"}`;
  const bookingRef = doc(db, collections.bookings, bookingId);
  await runTransaction(db, async (transaction) => {
    const existing = await transaction.get(bookingRef);
    if (existing.exists() && existing.data().status !== "cancelled") {
      throw new Error("Este horário acabou de ser reservado. Escolha outro.");
    }
    transaction.set(bookingRef, {
      ...input,
      status: "awaiting_payment",
      paymentStatus: input.paymentStatus ?? "pending",
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    });
  });
  return bookingId;
}

export type FirestoreDate = Timestamp | ReturnType<typeof serverTimestamp>;
