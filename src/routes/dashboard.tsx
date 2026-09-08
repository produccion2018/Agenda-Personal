import { createFileRoute } from "@tanstack/react-router";
import { DashboardView } from "@/views/DashboardView";

export const Route = createFileRoute("/dashboard")({
  head: () => ({
    meta: [
      { title: "Panel LifeSync — Tareas, hábitos y recordatorios" },
      {
        name: "description",
        content:
          "Centro de control personal: entregas de proyectos, hábitos diarios, pagos, avisos y despertador visual.",
      },
      { property: "og:title", content: "Panel LifeSync — Tareas, hábitos y recordatorios" },
      {
        property: "og:description",
        content: "Tu día completo: entregas, gimnasio, pastillas, pagos y alertas urgentes.",
      },
    ],
  }),
  component: DashboardView,
});
