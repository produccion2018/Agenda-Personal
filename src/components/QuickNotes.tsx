import { useState } from "react";
import { Mic, Plus, Trash2 } from "lucide-react";
import { useLifeSync } from "@/context/LifeSyncContext";

/**
 * Notas rápidas de texto o "voz" (la grabación es simulada).
 * TODO: Conectar la grabación real con MediaRecorder y subir el audio al backend.
 */
export function QuickNotes() {
  const { notes, addNote, removeNote } = useLifeSync();
  const [text, setText] = useState("");
  const [recording, setRecording] = useState(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim()) return;
    addNote(text.trim(), "texto");
    setText("");
  };

  const toggleRecording = () => {
    if (recording) {
      setRecording(false);
      addNote("Nota de voz grabada (00:07) — pendiente de transcribir.", "voz");
      return;
    }
    setRecording(true);
  };

  return (
    <section className="glass-strong rounded-3xl p-6">
      <header className="mb-4">
        <h3 className="font-display text-lg font-semibold">Notas rápidas</h3>
        <p className="text-sm text-muted-foreground">Apunta ideas al vuelo</p>
      </header>

      <form onSubmit={submit} className="flex gap-2">
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Escribe una idea…"
          className="min-w-0 flex-1 rounded-xl border border-input bg-secondary/40 px-4 py-2.5 text-sm outline-none transition-colors placeholder:text-muted-foreground focus:border-ring"
        />
        <button
          type="submit"
          aria-label="Añadir nota"
          className="gradient-primary grid h-10 w-10 shrink-0 place-items-center rounded-xl text-primary-foreground transition-transform hover:scale-105"
        >
          <Plus className="h-5 w-5" />
        </button>
        <button
          type="button"
          onClick={toggleRecording}
          aria-label="Grabar nota de voz"
          className={`grid h-10 w-10 shrink-0 place-items-center rounded-xl border border-border transition-colors ${
            recording ? "animate-alarm bg-destructive text-destructive-foreground" : "bg-secondary/50"
          }`}
        >
          <Mic className="h-5 w-5" />
        </button>
      </form>
      {recording && (
        <p className="mt-2 text-xs text-accent">Grabando… pulsa el micrófono para guardar.</p>
      )}

      <ul className="mt-4 space-y-2">
        {notes.map((n) => (
          <li key={n.id} className="glass flex items-start gap-3 rounded-2xl px-4 py-3">
            <span className="text-xs text-accent">{n.kind === "voz" ? "🎙" : "✎"}</span>
            <p className="min-w-0 flex-1 text-sm">{n.text}</p>
            <span className="text-[11px] text-muted-foreground">{n.time}</span>
            <button
              onClick={() => removeNote(n.id)}
              aria-label="Eliminar nota"
              className="text-muted-foreground transition-colors hover:text-destructive"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          </li>
        ))}
      </ul>
    </section>
  );
}
