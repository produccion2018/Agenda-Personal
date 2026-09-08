import { createFileRoute } from "@tanstack/react-router";
import { AuthView } from "@/views/AuthView";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "LifeSync Pro — Acceso a tu centro de vida" },
      {
        name: "description",
        content:
          "Inicia sesión en LifeSync Pro y organiza entregas, hábitos, salud y recordatorios en un solo panel oscuro y elegante.",
      },
      { property: "og:title", content: "LifeSync Pro — Acceso a tu centro de vida" },
      {
        property: "og:description",
        content: "Entregas, hábitos, pagos y alarmas visuales en un único panel violeta.",
      },
    ],
  }),
  component: AuthView,
});
