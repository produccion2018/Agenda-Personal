import { Check, Clock3 } from "lucide-react";
import { useLifeSync } from "@/context/LifeSyncContext";

/** Recordatorios de estilo de vida, sociales, familiares y pagos. */
const categoryLabel: Record<string, string> = {
  social: "Social",
  pago: "Pago",
  familia: "Familia",
  fe: "Fe",
};

export function LifeReminders() {
  const { reminders, toggleReminder, triggerAlarm } = useLifeSync();

  return (
    <section className="glass-strong rounded-3xl p-6">
      <header className="mb-5">
        <h3 className="font-display text-lg font-semibold">Vida y compromisos</h3>
        <p className="text-sm text-muted-foreground">Lo que no se te puede pasar</p>
      </header>

      <ul className="space-y-2">
        {reminders.map((r) => (
          <li
            key={r.id}
            className={`glass flex items-center gap-3 rounded-2xl px-4 py-3 ${
              r.done ? "opacity-50" : ""
            }`}
          >
            <span className="rounded-full bg-secondary px-2.5 py-1 text-[10px] uppercase tracking-wider text-accent">
              {categoryLabel[r.category]}
            </span>
            <div className="min-w-0 flex-1">
              <p className={`truncate text-sm font-medium ${r.done ? "line-through" : ""}`}>
                {r.title}
              </p>
              <p className="flex items-center gap-1 text-xs text-muted-foreground">
                <Clock3 className="h-3.5 w-3.5" /> {r.when}
              </p>
            </div>
            <button
              onClick={() =>
                triggerAlarm({
                  title: r.title,
                  message: `Mauro, este compromiso es ${r.when.toLowerCase()}. Prepárate con tiempo.`,
                  time: r.when,
                })
              }
              className="rounded-lg border border-border px-2.5 py-1 text-xs text-muted-foreground transition-colors hover:text-accent"
            >
              Probar alerta
            </button>
            <button
              onClick={() => toggleReminder(r.id)}
              aria-label={`Marcar ${r.title}`}
              className={`grid h-8 w-8 shrink-0 place-items-center rounded-full border border-border transition-colors ${
                r.done ? "gradient-primary" : "bg-secondary/50 hover:bg-secondary"
              }`}
            >
              <Check
                className={`h-4 w-4 ${r.done ? "text-primary-foreground" : "text-muted-foreground"}`}
              />
            </button>
          </li>
        ))}
      </ul>
    </section>
  );
}
