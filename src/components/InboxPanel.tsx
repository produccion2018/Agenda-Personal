import { Mail, MailOpen } from "lucide-react";
import { useLifeSync } from "@/context/LifeSyncContext";

/**
 * Bandeja simulada de correos / notificaciones importantes.
 * TODO: Conectar con tu API de correo o servicio de notificaciones (websocket/push).
 */
export function InboxPanel() {
  const { mails, markMailRead } = useLifeSync();
  const unread = mails.filter((m) => m.unread).length;

  return (
    <section className="glass-strong rounded-3xl p-6">
      <header className="mb-5 flex items-center justify-between">
        <div>
          <h3 className="font-display text-lg font-semibold">Bandeja de entrada</h3>
          <p className="text-sm text-muted-foreground">
            {unread > 0 ? `¡Tienes ${unread} mensajes nuevos!` : "Todo al día"}
          </p>
        </div>
        <span className="gradient-primary grid h-10 w-10 place-items-center rounded-xl text-sm font-semibold text-primary-foreground glow-ring">
          {unread}
        </span>
      </header>

      <ul className="space-y-2">
        {mails.map((m) => (
          <li key={m.id}>
            <button
              onClick={() => markMailRead(m.id)}
              className={`glass flex w-full items-start gap-3 rounded-2xl px-4 py-3 text-left transition-colors hover:bg-secondary/40 ${
                m.unread ? "" : "opacity-60"
              }`}
            >
              {m.unread ? (
                <Mail className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
              ) : (
                <MailOpen className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" />
              )}
              <div className="min-w-0 flex-1">
                <div className="flex items-baseline justify-between gap-2">
                  <p className="truncate text-sm font-semibold">{m.from}</p>
                  <span className="shrink-0 text-[11px] text-muted-foreground">{m.time}</span>
                </div>
                <p className="truncate text-sm">{m.subject}</p>
                <p className="truncate text-xs text-muted-foreground">{m.preview}</p>
              </div>
            </button>
          </li>
        ))}
      </ul>
    </section>
  );
}
