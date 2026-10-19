"use client";

import { useEffect, useState } from "react";

export function InstallPrompt() {
  const [event, setEvent] = useState<BeforeInstallPromptEvent | null>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const handler = (e: Event) => {
      e.preventDefault();
      setEvent(e as BeforeInstallPromptEvent);
      setVisible(true);
    };
    window.addEventListener("beforeinstallprompt", handler);
    return () => window.removeEventListener("beforeinstallprompt", handler);
  }, []);
  if (!visible || !event) return null;
  return (
    <aside className="fixed bottom-20 left-4 right-4 z-50 flex items-center justify-between gap-3 rounded-2xl bg-gold p-4 text-sm font-semibold text-ink shadow-2xl sm:bottom-6 sm:left-auto sm:max-w-sm">
      <span>Instale o atalho da Barbearia do Pongo.</span>
      <button className="rounded-xl bg-ink px-3 py-2 text-white" onClick={async () => { await event.prompt(); setVisible(false); }}>Instalar</button>
    </aside>
  );
}

declare global {
  interface BeforeInstallPromptEvent extends Event {
    prompt: () => Promise<void>;
  }
}
