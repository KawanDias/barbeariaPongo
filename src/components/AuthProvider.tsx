"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import type { UserRole } from "@/lib/firebase";

export const ADMIN_EMAIL = "barbeariapongo@gmail.com";
const ADMIN_PASSWORD = process.env.NEXT_PUBLIC_LOCAL_ADMIN_PASSWORD ?? "";
const USERS_KEY = "pongo.local.users";
const SESSION_KEY = "pongo.local.session";

export type LocalUser = {
  uid: string;
  displayName: string;
  email: string;
  photoURL: string | null;
};

type StoredUser = LocalUser & { password: string; role: UserRole };
type AuthContextValue = {
  user: LocalUser | null;
  role: UserRole | null;
  loading: boolean;
  loginEmail: (email: string, password: string) => Promise<void>;
  signupEmail: (name: string, email: string, password: string) => Promise<void>;
  loginGoogle: () => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | null>(null);

function readUsers(): StoredUser[] {
  if (typeof window === "undefined") return [];
  try {
    const value = JSON.parse(localStorage.getItem(USERS_KEY) ?? "[]");
    return Array.isArray(value) ? value : [];
  } catch {
    return [];
  }
}

function saveUsers(users: StoredUser[]) {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

function publicUser(stored: StoredUser): LocalUser {
  return { uid: stored.uid, displayName: stored.displayName, email: stored.email, photoURL: stored.photoURL };
}

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<LocalUser | null>(null);
  const [role, setRole] = useState<UserRole | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const session = localStorage.getItem(SESSION_KEY);
    if (session) {
      const stored = readUsers().find((candidate) => candidate.uid === session);
      if (stored) {
        setUser(publicUser(stored));
        setRole(stored.role);
      } else {
        localStorage.removeItem(SESSION_KEY);
      }
    }
    setLoading(false);
  }, []);

  const value = useMemo<AuthContextValue>(() => ({
    user,
    role,
    loading,
    loginEmail: async (rawEmail, password) => {
      const email = rawEmail.trim().toLowerCase();
      const users = readUsers();
      let stored = users.find((candidate) => candidate.email === email);

      if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
        stored = stored ?? {
          uid: "local-admin",
          displayName: "Administrador",
          email: ADMIN_EMAIL,
          photoURL: null,
          password: ADMIN_PASSWORD,
          role: "admin"
        };
        stored.role = "admin";
        saveUsers([...users.filter((candidate) => candidate.uid !== stored?.uid), stored]);
      }

      if (!stored || stored.password !== password) throw new Error("INVALID_CREDENTIALS");
      localStorage.setItem(SESSION_KEY, stored.uid);
      setUser(publicUser(stored));
      setRole(stored.role);
    },
    signupEmail: async (name, rawEmail, password) => {
      const email = rawEmail.trim().toLowerCase();
      if (!name.trim()) throw new Error("NAME_REQUIRED");
      if (!isValidEmail(email)) throw new Error("INVALID_EMAIL");
      if (password.length < 6) throw new Error("WEAK_PASSWORD");
      if (readUsers().some((candidate) => candidate.email === email)) throw new Error("EMAIL_IN_USE");

      const stored: StoredUser = {
        uid: `local-${crypto.randomUUID()}`,
        displayName: name.trim(),
        email,
        photoURL: null,
        password,
        role: "cliente"
      };
      saveUsers([...readUsers(), stored]);
      localStorage.setItem(SESSION_KEY, stored.uid);
      setUser(publicUser(stored));
      setRole("cliente");
    },
    loginGoogle: async () => {
      throw new Error("GOOGLE_LOGIN_UNAVAILABLE");
    }
  }), [loading, role, user]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth deve ser usado dentro de AuthProvider");
  return context;
}
