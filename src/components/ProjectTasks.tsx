import { CalendarClock, Check, Flag } from "lucide-react";
import { useLifeSync } from "@/context/LifeSyncContext";

/** Tareas de proyectos y entregas con fecha límite. */
export function ProjectTasks() {
  const { projects, toggleProject } = useLifeSync();

  const priorityStyle: Record<string, string> = {
    alta: "text-destructive",
    media: "text-warning",
    baja: "text-success",
  };

  return (
    <section className="glass-strong rounded-3xl p-6">
      <header className="mb-5 flex items-center justify-between">
        <div>
          <h3 className="font-display text-lg font-semibold">Proyectos y entregas</h3>
          <p className="text-sm text-muted-foreground">
            {projects.filter((p) => !p.done).length} pendientes esta semana
          </p>
        </div>
      </header>

      <ul className="space-y-3">
        {projects.map((p) => (
          <li
            key={p.id}
            className={`glass rounded-2xl p-4 transition-opacity ${p.done ? "opacity-50" : ""}`}
          >
            <div className="flex items-start gap-3">
              <button
                onClick={() => toggleProject(p.id)}
                aria-label={`Marcar ${p.title}`}
                className={`mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-lg border border-border transition-colors ${
                  p.done ? "gradient-primary" : "bg-secondary/50 hover:bg-secondary"
                }`}
              >
                {p.done && <Check className="h-4 w-4 text-primary-foreground" />}
              </button>

              <div className="min-w-0 flex-1">
                <p className={`font-medium ${p.done ? "line-through" : ""}`}>{p.title}</p>
                <div className="mt-1 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-muted-foreground">
                  <span>{p.client}</span>
                  <span className="flex items-center gap-1">
                    <CalendarClock className="h-3.5 w-3.5" /> {p.due}
                  </span>
                  <span className={`flex items-center gap-1 ${priorityStyle[p.priority]}`}>
                    <Flag className="h-3.5 w-3.5" /> Prioridad {p.priority}
                  </span>
                </div>

                <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-secondary">
                  <div
                    className="gradient-primary h-full rounded-full transition-[width] duration-500"
                    style={{ width: `${p.progress}%` }}
                  />
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
