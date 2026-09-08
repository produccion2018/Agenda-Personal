import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";

/**
 * Estado central de la vida del usuario (tareas, hábitos, recordatorios, notas).
 * Todo vive en memoria del cliente: es una maqueta funcional.
 *
 * TODO: Sincronizar recordatorios con el Backend (GET/POST/PATCH /api/reminders).
 * TODO: Cargar tareas y hábitos desde tu base de datos al montar el proveedor.
 * TODO: Reemplazar los datos semilla por la respuesta real de tu API.
 */

export type Project = {
  id: string;
  title: string;
  client: string;
  due: string;
  progress: number;
  priority: "alta" | "media" | "baja";
  done: boolean;
};

export type Habit = {
  id: string;
  title: string;
  detail: string;
  icon: string;
  streak: number;
  done: boolean;
};

export type Reminder = {
  id: string;
  title: string;
  when: string;
  category: "social" | "pago" | "familia" | "fe";
  done: boolean;
};

export type MailItem = {
  id: string;
  from: string;
  subject: string;
  preview: string;
  time: string;
  unread: boolean;
};

export type Note = {
  id: string;
  text: string;
  kind: "texto" | "voz";
  time: string;
};

export type AlarmPayload = {
  title: string;
  message: string;
  time: string;
};

// --- Datos semilla realistas (reemplazables por tu API) ---
const seedProjects: Project[] = [
  {
    id: "p1",
    title: "Entrega del proyecto Helios (documentación final)",
    client: "Estudio Nébula",
    due: "28 de Noviembre",
    progress: 72,
    priority: "alta",
    done: false,
  },
  {
    id: "p2",
    title: "Revisión de maquetas para la app del banco",
    client: "Banco Andino",
    due: "Viernes 14:00",
    progress: 40,
    priority: "media",
    done: false,
  },
  {
    id: "p3",
    title: "Enviar factura de Octubre a contabilidad",
    client: "Interno",
    due: "Mañana",
    progress: 90,
    priority: "alta",
    done: false,
  },
  {
    id: "p4",
    title: "Preparar demo para la reunión con Lucía",
    client: "Nova Labs",
    due: "Lunes 09:30",
    progress: 20,
    priority: "baja",
    done: true,
  },
];

const seedHabits: Habit[] = [
  { id: "h1", title: "Tomar 2L de agua", detail: "6 de 8 vasos", icon: "💧", streak: 12, done: false },
  { id: "h2", title: "Tomar pastilla diaria", detail: "08:00 con el desayuno", icon: "💊", streak: 31, done: true },
  { id: "h3", title: "Ir al gimnasio", detail: "Pierna y espalda · 19:00", icon: "🏋️", streak: 5, done: false },
  { id: "h4", title: "Leer 20 minutos", detail: "Sapiens · pág. 184", icon: "📖", streak: 9, done: true },
  { id: "h5", title: "Dormir antes de las 00:00", detail: "Ayer: 01:20", icon: "🌙", streak: 2, done: false },
];

const seedReminders: Reminder[] = [
  { id: "r1", title: "Ir al cine con Sofía — Dune 3", when: "Sábado 20:40", category: "social", done: false },
  { id: "r2", title: "Ir a la iglesia", when: "Domingo 10:00", category: "fe", done: false },
  { id: "r3", title: "Pagar la luz y el internet", when: "Vence en 2 días", category: "pago", done: false },
  { id: "r4", title: "Llamar a mamá por su cumpleaños", when: "Jueves 19:00", category: "familia", done: false },
  { id: "r5", title: "Renovar la suscripción del gimnasio", when: "30 de Noviembre", category: "pago", done: true },
];

const seedMails: MailItem[] = [
  {
    id: "m1",
    from: "Lucía Herrera",
    subject: "Confirmación de reunión del lunes",
    preview: "Mauro, movemos la demo a las 9:30. ¿Te queda bien?",
    time: "hace 4 min",
    unread: true,
  },
  {
    id: "m2",
    from: "Estudio Nébula",
    subject: "Feedback del proyecto Helios",
    preview: "Adjuntamos los comentarios de la última revisión...",
    time: "hace 38 min",
    unread: true,
  },
  {
    id: "m3",
    from: "Clínica San Rafael",
    subject: "Recordatorio de control médico",
    preview: "Su cita está agendada para el 3 de Diciembre a las 11:15.",
    time: "hace 2 h",
    unread: false,
  },
];

const seedNotes: Note[] = [
  { id: "n1", text: "Idea: agrupar los hábitos por bloques de mañana y noche.", kind: "texto", time: "09:12" },
  { id: "n2", text: "Nota de voz — lista del súper: café, avena, huevos.", kind: "voz", time: "08:40" },
];

type LifeSyncValue = {
  projects: Project[];
  habits: Habit[];
  reminders: Reminder[];
  mails: MailItem[];
  notes: Note[];
  alarm: AlarmPayload | null;
  energy: number;
  toggleProject: (id: string) => void;
  toggleHabit: (id: string) => void;
  toggleReminder: (id: string) => void;
  markMailRead: (id: string) => void;
  addNote: (text: string, kind: Note["kind"]) => void;
  removeNote: (id: string) => void;
  triggerAlarm: (payload: AlarmPayload) => void;
  snoozeAlarm: () => void;
  dismissAlarm: () => void;
};

const LifeSyncContext = createContext<LifeSyncValue | null>(null);

export function LifeSyncProvider({ children }: { children: ReactNode }) {
  const [projects, setProjects] = useState(seedProjects);
  const [habits, setHabits] = useState(seedHabits);
  const [reminders, setReminders] = useState(seedReminders);
  const [mails, setMails] = useState(seedMails);
  const [notes, setNotes] = useState(seedNotes);
  const [alarm, setAlarm] = useState<AlarmPayload | null>(null);

  const toggleProject = useCallback((id: string) => {
    // TODO: PATCH /api/tasks/:id { done }
    setProjects((p) => p.map((t) => (t.id === id ? { ...t, done: !t.done } : t)));
  }, []);

  const toggleHabit = useCallback((id: string) => {
    // TODO: PATCH /api/habits/:id { done, streak }
    setHabits((h) =>
      h.map((t) =>
        t.id === id
          ? { ...t, done: !t.done, streak: t.done ? Math.max(0, t.streak - 1) : t.streak + 1 }
          : t,
      ),
    );
  }, []);

  const toggleReminder = useCallback((id: string) => {
    // TODO: Sincronizar recordatorios con el Backend
    setReminders((r) => r.map((t) => (t.id === id ? { ...t, done: !t.done } : t)));
  }, []);

  const markMailRead = useCallback((id: string) => {
    // TODO: Conectar con tu servicio real de correo / notificaciones.
    setMails((m) => m.map((t) => (t.id === id ? { ...t, unread: false } : t)));
  }, []);

  const addNote = useCallback((text: string, kind: Note["kind"]) => {
    // TODO: POST /api/notes  (y para voz: subir el audio y transcribirlo)
    setNotes((n) => [
      {
        id: `n${Date.now()}`,
        text,
        kind,
        time: new Date().toLocaleTimeString("es-ES", { hour: "2-digit", minute: "2-digit" }),
      },
      ...n,
    ]);
  }, []);

  const removeNote = useCallback((id: string) => {
    setNotes((n) => n.filter((t) => t.id !== id));
  }, []);

  const triggerAlarm = useCallback((payload: AlarmPayload) => {
    // TODO: Aquí conectar el sonido real de la alarma (new Audio(...).play()).
    setAlarm(payload);
  }, []);

  const snoozeAlarm = useCallback(() => {
    // TODO: Reprogramar la alarma en el backend (+10 min) y detener el audio.
    setAlarm(null);
  }, []);

  const dismissAlarm = useCallback(() => {
    // TODO: Marcar el recordatorio como atendido en el backend.
    setAlarm(null);
  }, []);

  // Nivel de energía/enfoque = cumplimiento de hábitos + tareas del día.
  const energy = useMemo(() => {
    const habitScore = habits.filter((h) => h.done).length / habits.length;
    const taskScore = projects.filter((p) => p.done).length / projects.length;
    return Math.round((habitScore * 0.7 + taskScore * 0.3) * 100);
  }, [habits, projects]);

  const value = useMemo(
    () => ({
      projects,
      habits,
      reminders,
      mails,
      notes,
      alarm,
      energy,
      toggleProject,
      toggleHabit,
      toggleReminder,
      markMailRead,
      addNote,
      removeNote,
      triggerAlarm,
      snoozeAlarm,
      dismissAlarm,
    }),
    [
      projects,
      habits,
      reminders,
      mails,
      notes,
      alarm,
      energy,
      toggleProject,
      toggleHabit,
      toggleReminder,
      markMailRead,
      addNote,
      removeNote,
      triggerAlarm,
      snoozeAlarm,
      dismissAlarm,
    ],
  );

  return <LifeSyncContext.Provider value={value}>{children}</LifeSyncContext.Provider>;
}

export function useLifeSync() {
  const ctx = useContext(LifeSyncContext);
  if (!ctx) throw new Error("useLifeSync debe usarse dentro de <LifeSyncProvider>");
  return ctx;
}
