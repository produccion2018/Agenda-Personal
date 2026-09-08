import { AlarmClock, BellOff, Timer } from "lucide-react";
import { useLifeSync } from "@/context/LifeSyncContext";

/**
 * Despertador / alerta activa a pantalla completa.
 * TODO: Conectar aquí el sonido real (Audio API) y la vibración del dispositivo.
 * TODO: Al posponer, reprogramar el recordatorio en el backend (+10 minutos).
 */
export function AlarmOverlay() {
  const { alarm, snoozeAlarm, dismissAlarm } = useLifeSync();
  if (!alarm) return null;

  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-background/80 p-4 backdrop-blur-xl">
      <div className="glass-strong animate-alarm w-full max-w-lg rounded-3xl p-8 text-center">
        <div className="gradient-primary mx-auto grid h-20 w-20 place-items-center rounded-full glow-ring">
          <AlarmClock className="h-10 w-10 text-primary-foreground" />
        </div>
        <p className="mt-6 text-xs uppercase tracking-[0.3em] text-accent">Alerta activa</p>
        <h2 className="mt-3 font-display text-4xl font-bold text-gradient">{alarm.time}</h2>
        <h3 className="mt-4 font-display text-xl font-semibold">{alarm.title}</h3>
        <p className="mt-2 text-sm text-muted-foreground">{alarm.message}</p>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <button
            onClick={snoozeAlarm}
            className="flex flex-1 items-center justify-center gap-2 rounded-2xl border border-border bg-secondary/60 px-5 py-3 text-sm font-medium transition-colors hover:bg-secondary"
          >
            <Timer className="h-4 w-4" /> Posponer 10 min
          </button>
          <button
            onClick={dismissAlarm}
            className="gradient-primary flex flex-1 items-center justify-center gap-2 rounded-2xl px-5 py-3 text-sm font-semibold text-primary-foreground glow-ring transition-transform hover:scale-[1.02]"
          >
            <BellOff className="h-4 w-4" /> Descartar
          </button>
        </div>
      </div>
    </div>
  );
}
