import { ExternalLink } from 'lucide-react';

/**
 * ProjectCard — Tarjeta individual de un repositorio de GitHub.
 *
 * El ÁTOMO más pequeño de la sección de proyectos.
 * Recibe un objeto `project` con la forma que define useGitHubRepos.
 *
 * ¿Por qué es útil separar esto?
 * Si mañana querés mostrar proyectos en un modal, en una página diferente,
 * o en un slider, reutilizás este componente sin copiar HTML.
 * Un copy-paste de HTML es el peor tipo de deuda técnica — cuando tenés
 * que cambiar algo, lo tenés que cambiar en N lugares.
 *
 * @param {{ project: { name: string, lang: string, stars: number, desc: string, url: string }, accentColor: string }} props
 */
export function ProjectCard({ project, accentColor }) {
  return (
    <a
      href={project.url}
      target="_blank"
      rel="noreferrer"
      className="border p-4 hover:bg-[#00FF4111] transition-all group cursor-pointer block"
      style={{ borderColor: `${accentColor}33` }}
    >
      <div className="flex justify-between items-start">
        <h3
          className="text-lg font-bold group-hover:text-white italic tracking-tight"
          style={{ color: accentColor }}
        >
          /{project.name}
        </h3>
        <ExternalLink className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
      </div>

      <p className="text-sm opacity-70 my-2 text-zinc-300 line-clamp-2">{project.desc}</p>

      <div className="flex gap-4 text-[10px] font-bold uppercase tracking-tighter opacity-60">
        <span className="flex items-center gap-1">
          <div className="w-2 h-2 rounded-full" style={{ backgroundColor: accentColor }} />
          {project.lang}
        </span>
        <span>★ {project.stars}</span>
      </div>
    </a>
  );
}
