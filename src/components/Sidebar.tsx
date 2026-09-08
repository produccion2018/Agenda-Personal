import {
  CalendarDays,
  CheckCircle2,
  Heart,
  LayoutDashboard,
  LogOut,
  PanelLeftClose,
  PanelLeftOpen,
  Settings,
  StickyNote,
  User,
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";

/**
 * Barra lateral retráctil con accesos directos.
 * TODO: Conectar cada acceso a una ruta real cuando existan más vistas.
 */

const items = [
  { id: "panel", label: "Panel", icon: LayoutDashboard },
  { id: "calendario", label: "Calendario", icon: CalendarDays },
  { id: "tareas", label: "Tareas", icon: CheckCircle2 },
  { id: "habitos", label: "Hábitos", icon: Heart },
  { id: "notas", label: "Notas", icon: StickyNote },
  { id: "perfil", label: "Perfil", icon: User },
  { id: "config", label: "Configuración", icon: Settings },
];

export function Sidebar({
  open,
  onToggle,
  active,
  onSelect,
}: {
  open: boolean;
  onToggle: () => void;
  active: string;
  onSelect: (id: string) => void;
}) {
  const { user, logout } = useAuth();

  return (
    <aside
      className={`glass sticky top-0 z-30 hidden h-screen shrink-0 flex-col justify-between rounded-r-3xl p-4 transition-[width] duration-300 md:flex ${
        open ? "w-64" : "w-20"
      }`}
    >
      <div>
        <div className="mb-8 flex items-center gap-3">
          <div className="gradient-primary grid h-10 w-10 shrink-0 place-items-center rounded-xl font-display text-lg font-bold text-primary-foreground">
            L
          </div>
          {open && (
            <div className="min-w-0">
              <p className="truncate font-display text-sm font-semibold">LifeSync Pro</p>
              <p className="truncate text-xs text-muted-foreground">Centro de control</p>
            </div>
          )}
        </div>

        <nav className="space-y-1">
          {items.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => onSelect(id)}
              className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition-colors ${
                active === id
                  ? "gradient-primary text-primary-foreground glow-ring"
                  : "text-muted-foreground hover:bg-secondary/60 hover:text-foreground"
              }`}
            >
              <Icon className="h-5 w-5 shrink-0" />
              {open && <span className="truncate">{label}</span>}
            </button>
          ))}
        </nav>
      </div>

      <div className="space-y-2">
        <button
          onClick={onToggle}
          className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-muted-foreground transition-colors hover:bg-secondary/60 hover:text-foreground"
        >
          {open ? <PanelLeftClose className="h-5 w-5" /> : <PanelLeftOpen className="h-5 w-5" />}
          {open && <span>Contraer</span>}
        </button>

        <div className="glass-strong flex items-center gap-3 rounded-xl p-3">
          <div className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-accent font-semibold text-accent-foreground">
            {(user?.name ?? "M").charAt(0).toUpperCase()}
          </div>
          {open && (
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium">{user?.name ?? "Mauro"}</p>
              <p className="truncate text-xs text-muted-foreground">{user?.email}</p>
            </div>
          )}
          {open && (
            <button
              onClick={logout}
              aria-label="Cerrar sesión"
              className="text-muted-foreground transition-colors hover:text-destructive"
            >
              <LogOut className="h-4 w-4" />
            </button>
          )}
        </div>
      </div>
    </aside>
  );
}
