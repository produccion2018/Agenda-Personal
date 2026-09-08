import { useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { Eye, EyeOff, Loader2, Lock, Mail, ShieldCheck, User } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

/**
 * Pantalla de Login / Registro con glassmorphism violeta y validaciones visuales.
 * TODO: Conectar aquí la API de autenticación con Token (ver src/context/AuthContext.tsx).
 */
export function AuthView() {
  const navigate = useNavigate();
  const { login, register } = useAuth();

  const [mode, setMode] = useState<"login" | "register">("login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [touched, setTouched] = useState(false);
  const [loading, setLoading] = useState(false);

  // Validaciones puramente visuales
  const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const passValid = password.length >= 8;
  const nameValid = mode === "login" || name.trim().length >= 2;
  const formValid = emailValid && passValid && nameValid;

  const strength = Math.min(
    100,
    (password.length >= 8 ? 40 : password.length * 4) +
      (/[A-Z]/.test(password) ? 20 : 0) +
      (/\d/.test(password) ? 20 : 0) +
      (/[^A-Za-z0-9]/.test(password) ? 20 : 0),
  );

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setTouched(true);
    if (!formValid || loading) return;
    setLoading(true);
    try {
      if (mode === "login") await login(email, password);
      else await register(name.trim(), email, password);
      navigate({ to: "/dashboard" });
    } finally {
      setLoading(false);
    }
  };

  const fieldClass = (ok: boolean) =>
    `w-full rounded-2xl border bg-secondary/30 py-3 pl-11 pr-11 text-sm outline-none transition-colors placeholder:text-muted-foreground focus:border-ring ${
      touched && !ok ? "border-destructive" : "border-input"
    }`;

  return (
    <main className="relative grid min-h-screen place-items-center overflow-hidden px-4 py-12">
      <div className="animate-float pointer-events-none absolute -left-24 top-10 h-72 w-72 rounded-full bg-primary/25 blur-3xl" />
      <div className="animate-float pointer-events-none absolute -right-20 bottom-0 h-80 w-80 rounded-full bg-accent/20 blur-3xl" />

      <div className="relative grid w-full max-w-5xl items-center gap-10 lg:grid-cols-[1.1fr_1fr]">
        <div className="hidden lg:block">
          <p className="text-xs uppercase tracking-[0.4em] text-accent">LifeSync Pro</p>
          <h1 className="mt-4 font-display text-5xl font-bold leading-tight">
            Tu vida entera, <span className="text-gradient">sincronizada</span>.
          </h1>
          <p className="mt-5 max-w-md text-muted-foreground">
            Entregas de trabajo, pastillas, gimnasio, la misa del domingo y el cine del sábado.
            Un solo panel que te avisa a tiempo, con alarmas que no puedes ignorar.
          </p>
          <ul className="mt-8 space-y-3 text-sm text-muted-foreground">
            <li className="flex items-center gap-3">
              <ShieldCheck className="h-4 w-4 text-accent" /> Sesión guardada en tu dispositivo
            </li>
            <li className="flex items-center gap-3">
              <ShieldCheck className="h-4 w-4 text-accent" /> Hábitos, rachas y energía diaria
            </li>
            <li className="flex items-center gap-3">
              <ShieldCheck className="h-4 w-4 text-accent" /> Despertador visual a pantalla completa
            </li>
          </ul>
        </div>

        <div className="glass-strong rounded-3xl p-8">
          <div className="mb-6 grid grid-cols-2 gap-1 rounded-2xl bg-secondary/40 p-1">
            {(["login", "register"] as const).map((m) => (
              <button
                key={m}
                onClick={() => {
                  setMode(m);
                  setTouched(false);
                }}
                className={`rounded-xl py-2 text-sm font-medium transition-colors ${
                  mode === m
                    ? "gradient-primary text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {m === "login" ? "Iniciar sesión" : "Crear cuenta"}
              </button>
            ))}
          </div>

          <h2 className="font-display text-2xl font-semibold">
            {mode === "login" ? "Hola de nuevo, Mauro" : "Empieza a sincronizar tu vida"}
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            {mode === "login"
              ? "Entra para ver tus entregas y hábitos de hoy."
              : "Crea tu cuenta en menos de un minuto."}
          </p>

          <form onSubmit={submit} className="mt-6 space-y-4" noValidate>
            {mode === "register" && (
              <div>
                <div className="relative">
                  <User className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Mauro Salazar"
                    className={fieldClass(nameValid)}
                    autoComplete="name"
                  />
                </div>
                {touched && !nameValid && (
                  <p className="mt-1.5 text-xs text-destructive">Escribe tu nombre completo.</p>
                )}
              </div>
            )}

            <div>
              <div className="relative">
                <Mail className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="mauro@correo.com"
                  className={fieldClass(emailValid)}
                  autoComplete="email"
                />
              </div>
              {touched && !emailValid && (
                <p className="mt-1.5 text-xs text-destructive">Introduce un correo válido.</p>
              )}
            </div>

            <div>
              <div className="relative">
                <Lock className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <input
                  type={showPass ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Mínimo 8 caracteres"
                  className={fieldClass(passValid)}
                  autoComplete={mode === "login" ? "current-password" : "new-password"}
                />
                <button
                  type="button"
                  onClick={() => setShowPass((s) => !s)}
                  aria-label="Mostrar contraseña"
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground transition-colors hover:text-foreground"
                >
                  {showPass ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
              {mode === "register" && password.length > 0 && (
                <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-secondary">
                  <div
                    className="gradient-primary h-full transition-[width] duration-300"
                    style={{ width: `${strength}%` }}
                  />
                </div>
              )}
              {touched && !passValid && (
                <p className="mt-1.5 text-xs text-destructive">
                  La contraseña necesita al menos 8 caracteres.
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="gradient-primary flex w-full items-center justify-center gap-2 rounded-2xl py-3 text-sm font-semibold text-primary-foreground glow-ring transition-transform hover:scale-[1.01] disabled:opacity-70"
            >
              {loading && <Loader2 className="h-4 w-4 animate-spin" />}
              {mode === "login" ? "Entrar a mi panel" : "Crear mi cuenta"}
            </button>

            <p className="text-center text-xs text-muted-foreground">
              Demo visual: la sesión se guarda solo en este navegador.
            </p>
          </form>
        </div>
      </div>
    </main>
  );
}
