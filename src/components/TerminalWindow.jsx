/**
 * TerminalWindow — La ventana visual de la terminal interactiva.
 *
 * CONCEPTO CLAVE: Este componente es 100% PRESENTACIONAL.
 * No sabe qué comandos existen. No sabe qué responden.
 * Solo sabe pintar mensajes en pantalla y propagar eventos al padre.
 *
 * Observá las props: recibe `onCommandChange` y `onKeyDown` como funciones.
 * El componente no ejecuta lógica — la "delega hacia arriba" (lifting state up).
 * Quien controla el estado es el hook useTerminal en App.jsx.
 *
 * Esto es el patrón Contenedor-Presentacional en su forma más pura.
 *
 * ¿Por qué se llama TerminalWindow y no Terminal?
 * Para evitar conflicto con el import de lucide-react que también tiene un ícono
 * llamado Terminal (que ya eliminamos en refactors anteriores, pero es buena práctica
 * usar nombres que describan el componente, no el concepto genérico).
 *
 * @param {{ history: Array, command: string, onCommandChange: Function, onKeyDown: Function, accentColor: string }} props
 */
export function TerminalWindow({ history, command, onCommandChange, onKeyDown, accentColor }) {
  return (
    <div
      className="glass-panel neon-glow rounded-lg overflow-hidden animate-float"
      style={{ borderColor: accentColor }}
    >
      {/* Barra de título estilo macOS/terminal */}
      <div className="bg-zinc-800 p-2 flex gap-2 border-b border-zinc-700">
        <div className="w-3 h-3 rounded-full bg-red-900/50" />
        <div className="w-3 h-3 rounded-full bg-yellow-900/50" />
        <div className="w-3 h-3 rounded-full bg-green-900/50" />
        <span className="text-[10px] text-zinc-500 ml-2 tracking-widest">SSH: LOGICAL@REALITY</span>
      </div>

      {/* Área de historial + input */}
      <div className="h-64 overflow-y-auto p-3 md:p-4 text-xs md:text-sm leading-relaxed scrollbar-hide">
        {history.map((log, i) => (
          <div key={i} className={log.type === 'user' ? 'text-white font-bold' : 'opacity-90'}>
            {log.content}
          </div>
        ))}

        {/* Línea de input activa */}
        <div className="flex items-center mt-1">
          <span className="mr-2 font-bold" style={{ color: accentColor }}>$</span>
          <input
            type="text"
            value={command}
            onChange={onCommandChange}
            onKeyDown={onKeyDown}
            className="bg-transparent border-none outline-none flex-grow text-white"
            autoFocus
          />
        </div>
      </div>
    </div>
  );
}
