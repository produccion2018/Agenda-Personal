import { Check, Flame } from "lucide-react";
import { useLifeSync } from "@/context/LifeSyncContext";

/** Hábitos y salud diaria. */
export function HabitTracker() {
  const { habits, toggleHabit } = useLifeSync();

  return (
    <section className="glass-strong rounded-3xl p-6">
      <header className="mb-5">
        <h3 className="font-display text-lg font-semibold">Hábitos y salud</h3>
        <p className="text-sm text-muted-foreground">
          {habits.filter((h) => h.done).length} de {habits.length} completados hoy
        </p>
      </header>

      <ul className="space-y-2">
        {habits.map((h) => (
          <li
            key={h.id}
            className="glass flex items-center gap-3 rounded-2xl px-4 py-3 transition-colors"
          >
            <span className="text-xl">{h.icon}</span>
            <div className="min-w-0 flex-1">
              <p className={`text-sm font-medium ${h.done ? "line-through opacity-60" : ""}`}>
                {h.title}
              </p>
              <p className="truncate text-xs text-muted-foreground">{h.detail}</p>
            </div>
            <span className="flex items-center gap-1 text-xs text-warning">
              <Flame className="h-3.5 w-3.5" /> {h.streak}
            </span>
            <button
              onClick={() => toggleHabit(h.id)}
              aria-label={`Completar ${h.title}`}
              className={`grid h-8 w-8 shrink-0 place-items-center rounded-full border border-border transition-colors ${
                h.done ? "gradient-primary" : "bg-secondary/50 hover:bg-secondary"
              }`}
            >
              <Check
                className={`h-4 w-4 ${h.done ? "text-primary-foreground" : "text-muted-foreground"}`}
              />
            </button>
          </li>
        ))}
      </ul>
    </section>
  );
}
