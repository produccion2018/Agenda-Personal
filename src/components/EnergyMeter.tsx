import { Sparkles } from "lucide-react";
import { useLifeSync } from "@/context/LifeSyncContext";

/** Indicador de energía/enfoque del día, calculado con hábitos y tareas cumplidas. */
export function EnergyMeter() {
  const { energy } = useLifeSync();

  const label =
    energy >= 75 ? "Enfoque máximo" : energy >= 45 ? "Buen ritmo" : "Necesitas impulso";

  const circumference = 2 * Math.PI * 52;

  return (
    <section className="glass-strong rounded-3xl p-6">
      <header className="mb-4 flex items-center gap-2">
        <Sparkles className="h-4 w-4 text-accent" />
        <h3 className="font-display text-sm font-semibold uppercase tracking-widest text-muted-foreground">
          Energía del día
        </h3>
      </header>

      <div className="flex items-center gap-6">
        <div className="relative h-32 w-32 shrink-0">
          <svg viewBox="0 0 120 120" className="h-full w-full -rotate-90">
            <circle
              cx="60"
              cy="60"
              r="52"
              fill="none"
              strokeWidth="10"
              className="stroke-secondary"
            />
            <circle
              cx="60"
              cy="60"
              r="52"
              fill="none"
              strokeWidth="10"
              strokeLinecap="round"
              className="stroke-accent transition-[stroke-dashoffset] duration-700"
              strokeDasharray={circumference}
              strokeDashoffset={circumference - (circumference * energy) / 100}
            />
          </svg>
          <div className="absolute inset-0 grid place-items-center">
            <span className="font-display text-3xl font-bold text-gradient">{energy}%</span>
          </div>
        </div>

        <div>
          <p className="font-display text-lg font-semibold">{label}</p>
          <p className="mt-1 text-sm text-muted-foreground">
            Tu nivel sube al completar hábitos y cerrar entregas. Marca “Ir al gimnasio” para
            ganar un 14% extra hoy.
          </p>
        </div>
      </div>
    </section>
  );
}
