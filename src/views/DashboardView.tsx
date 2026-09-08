import { useEffect, useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { AlarmClock, Bell, Search } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { useLifeSync } from "@/context/LifeSyncContext";
import { Sidebar } from "@/components/Sidebar";
import { AlarmOverlay } from "@/components/AlarmOverlay";
import { EnergyMeter } from "@/components/EnergyMeter";
import { ProjectTasks } from "@/components/ProjectTasks";
import { HabitTracker } from "@/components/HabitTracker";
import { LifeReminders } from "@/components/LifeReminders";
import { InboxPanel } from "@/components/InboxPanel";
import { QuickNotes } from "@/components/QuickNotes";

/**
 * Vista principal "LifeSync": centro de control de trabajo, salud y vida.
 * TODO: Proteger esta ruta con tu middleware real de sesión (hoy sólo mira localStorage).
 */
export function DashboardView() {
  const navigate = useNavigate();
  const { user, token, ready } = useAuth();
  const { mails, triggerAlarm } = useLifeSync();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [active, setActive] = useState("panel");

  // Guardia de sesión simulada
  useEffect(() => {
    if (ready && !token) navigate({ to: "/" });
  }, [ready, token, navigate]);

  // Demostración: la alarma salta a los 8 segundos de entrar.
  // TODO: Reemplazar por recordatorios reales programados desde el backend.
  useEffect(() => {
    const t = setTimeout(() => {
      triggerAlarm({
        title: "Gimnasio — sesión de pierna",
        message: `${user?.name ?? "Mauro"}, tienes que estar en el gimnasio Vértice a las 19:00. Sal en 15 minutos.`,
        time: "19:00",
      });
    }, 8000);
    return () => clearTimeout(t);
  }, [triggerAlarm, user]);

  if (!ready || !token) return null;

  const unread = mails.filter((m) => m.unread).length;

  return (
    <div className="flex min-h-screen">
      <Sidebar
        open={sidebarOpen}
        onToggle={() => setSidebarOpen((s) => !s)}
        active={active}
        onSelect={setActive}
      />

      <main className="min-w-0 flex-1 px-4 py-6 md:px-8">
        <header className="glass-strong mb-6 flex flex-wrap items-center gap-4 rounded-3xl p-5">
          <div className="min-w-0 flex-1">
            <p className="text-xs uppercase tracking-[0.3em] text-accent">Martes, 8 de Septiembre</p>
            <h1 className="mt-1 font-display text-2xl font-bold">
              Buenas tardes, {user?.name ?? "Mauro"}
            </h1>
            <p className="text-sm text-muted-foreground">
              Tienes una entrega el 28 de Noviembre y el gimnasio a las 19:00.
            </p>
          </div>

          <div className="relative hidden lg:block">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              placeholder="Buscar tarea, hábito o nota…"
              className="w-64 rounded-2xl border border-input bg-secondary/30 py-2.5 pl-10 pr-4 text-sm outline-none focus:border-ring"
            />
          </div>

          <button
            className="glass relative grid h-11 w-11 place-items-center rounded-2xl"
            aria-label="Notificaciones"
          >
            <Bell className="h-5 w-5" />
            {unread > 0 && (
              <span className="absolute -right-1 -top-1 grid h-5 w-5 place-items-center rounded-full bg-destructive text-[10px] font-bold text-destructive-foreground">
                {unread}
              </span>
            )}
          </button>

          <button
            onClick={() =>
              triggerAlarm({
                title: "Reunión con Lucía Herrera",
                message: `${user?.name ?? "Mauro"}, tienes que conectarte a la videollamada de Nova Labs ahora mismo.`,
                time: "09:30",
              })
            }
            className="gradient-primary flex items-center gap-2 rounded-2xl px-4 py-2.5 text-sm font-semibold text-primary-foreground glow-ring transition-transform hover:scale-[1.03]"
          >
            <AlarmClock className="h-4 w-4" /> Probar despertador
          </button>
        </header>

        <div className="grid gap-6 xl:grid-cols-3">
          <div className="space-y-6 xl:col-span-2">
            <ProjectTasks />
            <LifeReminders />
            <QuickNotes />
          </div>
          <div className="space-y-6">
            <EnergyMeter />
            <HabitTracker />
            <InboxPanel />
          </div>
        </div>
      </main>

      <AlarmOverlay />
    </div>
  );
}
