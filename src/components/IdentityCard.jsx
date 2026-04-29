/**
 * IdentityCard — Sidebar con foto de perfil y datos personales.
 *
 * Recibe `age` como prop (calculada por useAge en App).
 * Este componente no sabe CÓMO se calculó la edad, solo la muestra.
 * Eso es el principio de "tell, don't ask" — le decís al componente
 * qué mostrar, no le pedís que lo calcule él mismo.
 *
 * @param {{ age: number, accentColor: string }} props
 */
export function IdentityCard({ age, accentColor }) {
  return (
    <div className="space-y-6 flex flex-col items-center md:items-start">
      {/* Foto de Perfil con Efecto Fallout/CRT */}
      <div
        className="glass-panel p-1 inline-block transition-all duration-500 shadow-[0_0_30px_rgba(0,255,145,0.4)] hover:shadow-[0_0_50px_rgba(0,255,145,0.6)] animate-float"
        style={{ borderColor: accentColor }}
      >
        <div className="w-48 h-48 bg-zinc-900 flex items-center justify-center relative overflow-hidden group">
          <img
            src="https://github.com/LogicalReality.png"
            alt="LogicalReality GitHub Avatar"
            className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-all duration-500 scale-105 group-hover:scale-100"
          />

          {/* Barra horizontal descendente (Efecto Fallout/CRT) */}
          <div className="absolute inset-0 w-full h-full bg-gradient-to-b from-transparent via-[#00FF9144] to-transparent bg-[size:100%_32px] bg-no-repeat pointer-events-none animate-crt-roll opacity-40" />

          {/* Overlay de escaneo estático */}
          <div className="absolute inset-0 pointer-events-none opacity-30 bg-[linear-gradient(rgba(0,255,145,0.1)_1px,transparent_1px)] bg-[size:100%_4px]" />

          {/* Brillo en los bordes al hacer hover */}
          <div className="absolute inset-0 pointer-events-none border-4 border-transparent group-hover:border-[#00FF9122] transition-all" />
        </div>
      </div>

      {/* Datos personales */}
      <div
        className="glass-panel space-y-2 p-4 rounded neon-glow"
        style={{ borderColor: `${accentColor}33` }}
      >
        <h2 className="text-xl text-white underline underline-offset-8 mb-4 tracking-widest text-center md:text-left">
          IDENTIDAD
        </h2>
        <p className="text-sm uppercase tracking-tighter">
          USER: <span style={{ color: '#fff' }}>LogicalReality</span>
        </p>
        <p className="text-sm uppercase tracking-tighter">
          LOC: <span style={{ color: '#fff' }}>Barcelona, VZLA</span>
        </p>
        <p className="text-sm uppercase tracking-tighter">
          LVL: <span style={{ color: '#fff' }}>{age} | Code &amp; PC Lover</span>
        </p>
      </div>
    </div>
  );
}
