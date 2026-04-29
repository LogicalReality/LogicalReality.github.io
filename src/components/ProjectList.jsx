import { Loader2 } from 'lucide-react';
import { ProjectCard } from './ProjectCard';

/**
 * ProjectList — Contenedor de la sección de repositorios.
 *
 * Este componente orquesta dos estados visuales:
 * 1. Loading: muestra un spinner mientras llegan los datos
 * 2. Loaded: renderiza la lista de ProjectCards
 *
 * ¿Por qué separar ProjectList de ProjectCard?
 * Separamos la LISTA (lógica de colección) del ÍTEM (lógica de presentación).
 * La lista decide CUÁNTOS mostrar y CUÁNDO. El ítem decide CÓMO se ve uno.
 * Cada responsabilidad en su lugar.
 *
 * @param {{ projects: Array, loading: boolean, accentColor: string }} props
 */
export function ProjectList({ projects, loading, accentColor }) {
  return (
    <div className="glass-panel p-4 md:p-6 rounded-lg neon-glow animate-float" style={{ animationDelay: '1.5s' }}>
      <h2
        className="text-xl mb-4 flex items-center gap-2 border-l-4 pl-3 uppercase tracking-tighter"
        style={{ borderColor: accentColor }}
      >
        REPOSITORIOS_ACTIVOS
      </h2>

      <div className="grid grid-cols-1 gap-4">
        {loading ? (
          <div className="flex items-center justify-center py-8 opacity-40">
            <Loader2 className="w-6 h-6 animate-spin mr-2" />
            <span>Sincronizando con GitHub...</span>
          </div>
        ) : (
          projects.map((project, i) => (
            <ProjectCard key={i} project={project} accentColor={accentColor} />
          ))
        )}
      </div>
    </div>
  );
}
