/**
 * Footer — Pie de página con copyright.
 *
 * El componente más simple de todo el sistema.
 * Podría parecer excesivo tener un archivo solo para esto,
 * pero hay valor en la consistencia: TODO lo visual es un componente.
 * Si mañana el footer necesita un link de privacidad o redes sociales,
 * ya sabés exactamente dónde ir a modificarlo.
 *
 * @param {{ accentColor: string }} props
 */
export function Footer({ accentColor }) {
  return (
    <footer
      className="mt-16 text-xs uppercase tracking-[0.3em] border-t pt-6 w-full max-w-4xl text-center relative z-10 font-bold shadow-[0_-10px_20px_-10px_rgba(0,255,65,0.1)]"
      style={{ borderColor: `${accentColor}66`, color: accentColor }}
    >
      © 2026
    </footer>
  );
}
