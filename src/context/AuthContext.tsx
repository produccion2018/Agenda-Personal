import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

/**
 * Contexto de autenticación SIMULADO (solo frontend).
 * Guarda un "token" en localStorage para desbloquear la app principal.
 *
 * TODO: Conectar aquí la API de autenticación con Token (login/registro reales).
 * TODO: Reemplazar el token simulado por el JWT devuelto por tu backend.
 * TODO: Añadir refresh token / expiración y logout en el servidor.
 */

const TOKEN_KEY = "lifesync.token";
const USER_KEY = "lifesync.user";

export type SyncUser = {
  name: string;
  email: string;
};

type AuthContextValue = {
  user: SyncUser | null;
  token: string | null;
  ready: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<SyncUser | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [ready, setReady] = useState(false);

  // Lectura del almacenamiento sólo en cliente (evita desajustes de hidratación).
  useEffect(() => {
    try {
      const storedToken = localStorage.getItem(TOKEN_KEY);
      const storedUser = localStorage.getItem(USER_KEY);
      if (storedToken) setToken(storedToken);
      if (storedUser) setUser(JSON.parse(storedUser) as SyncUser);
    } catch {
      // almacenamiento no disponible
    }
    setReady(true);
  }, []);

  const persist = useCallback((nextUser: SyncUser) => {
    // TODO: Sustituir por el token real que devuelva tu endpoint /auth/login
    const fakeToken = `demo.${btoa(nextUser.email)}.${Date.now()}`;
    localStorage.setItem(TOKEN_KEY, fakeToken);
    localStorage.setItem(USER_KEY, JSON.stringify(nextUser));
    setToken(fakeToken);
    setUser(nextUser);
  }, []);

  const login = useCallback(
    async (email: string, _password: string) => {
      // TODO: fetch("/api/auth/login", { method: "POST", body: ... })
      await new Promise((r) => setTimeout(r, 700));
      const name = email.split("@")[0] ?? "Mauro";
      persist({ name: name.charAt(0).toUpperCase() + name.slice(1), email });
    },
    [persist],
  );

  const register = useCallback(
    async (name: string, email: string, _password: string) => {
      // TODO: fetch("/api/auth/register", { method: "POST", body: ... })
      await new Promise((r) => setTimeout(r, 900));
      persist({ name, email });
    },
    [persist],
  );

  const logout = useCallback(() => {
    // TODO: Invalidar el token en el backend antes de limpiar el almacenamiento.
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
    setToken(null);
    setUser(null);
  }, []);

  const value = useMemo(
    () => ({ user, token, ready, login, register, logout }),
    [user, token, ready, login, register, logout],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth debe usarse dentro de <AuthProvider>");
  return ctx;
}
