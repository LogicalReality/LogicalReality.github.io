import { FaGithub, FaXTwitter } from 'react-icons/fa6';

/**
 * Header — Barra superior estilo BIOS.
 *
 * Componente PRESENTACIONAL: no sabe nada de lógica.
 * Recibe accentColor como prop en vez de hardcodearlo
 * porque mañana podés tener un tema diferente sin tocar este componente.
 *
 * @param {{ accentColor: string }} props
 */
export function Header({ accentColor }) {
  return (
    <div
      className="w-full max-w-4xl border-b pb-4 mb-8 flex justify-between items-center relative z-10"
      style={{ borderColor: `${accentColor}33` }}
    >
      <div>
        <h1 className="text-2xl font-bold tracking-tighter uppercase italic opacity-90">
          Logical_Reality_OS_v2.6
        </h1>
        <p className="text-[10px] opacity-60">CPU_TEMP: 42°C // MEM: 16GB // DISK: OK</p>
      </div>

      <div className="flex gap-4">
        <a href="https://github.com/LogicalReality" target="_blank" rel="noreferrer" title="GitHub">
          <FaGithub className="w-5 h-5 cursor-pointer hover:text-white transition-colors" />
        </a>
        <a href="https://x.com/carlos26ch01" target="_blank" rel="noreferrer" title="X (Twitter)">
          <FaXTwitter className="w-5 h-5 cursor-pointer hover:text-white transition-colors" />
        </a>
      </div>
    </div>
  );
}
