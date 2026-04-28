/**
 * ContributionGraph — Gráfico de contribuciones reales de GitHub.
 *
 * Este componente muestra las últimas 8 semanas de actividad real del usuario.
 * La lógica de fetch está en useContributions — este componente solo se ocupa
 * de CÓMO se ve, no de DÓNDE vienen los datos.
 *
 * Estados:
 * - loading: muestra un skeleton con celdas apagadas animadas
 * - error: fallback a datos simulados con un indicador "Offline"
 * - success: celdas coloreadas según nivel de actividad real
 *
 * Paleta de intensidades (neon verde sobre negro):
 * 0 → casi transparente  (sin actividad)
 * 1 → #00FF41 al 20%
 * 2 → #00FF41 al 40%
 * 3 → #00FF41 al 70%
 * 4 → #00FF41 sólido     (máxima actividad)
 */
import { useContributions } from '../hooks/useContributions';
import { GITHUB_USERNAME } from '../config';

const INTENSITIES = [
  'bg-[#00FF4114]',
  'bg-[#00FF4133]',
  'bg-[#00FF4166]',
  'bg-[#00FF41B3]',
  'bg-[#00FF41]',
];

const SKELETON_DAYS = Array.from({ length: 56 }, (_, i) => i);

export function ContributionGraph() {
  const { days, loading, error, total } = useContributions(GITHUB_USERNAME, 8);

  if (loading) {
    return (
      <div className="pt-4">
        <h2 className="text-[10px] mb-3 uppercase tracking-[0.2em] opacity-40 italic">
          System_Contribution_Log
        </h2>
        <div className="flex flex-wrap gap-1">
          {SKELETON_DAYS.map((i) => (
            <div
              key={i}
              className="w-3 h-3 rounded-sm bg-[#00FF4114] animate-pulse"
            />
          ))}
        </div>
        <p className="text-[9px] mt-2 opacity-30 italic">Syncing data...</p>
      </div>
    );
  }

  if (error) {
    // Fallback: datos simulados con patrón senoidal
    const fallbackDays = SKELETON_DAYS.map((i) => ({
      level: Math.floor(Math.sin(i * 0.5) * 2 + 2),
      date: '',
      count: 0,
    }));

    return (
      <div className="pt-4">
        <h2 className="text-[10px] mb-3 uppercase tracking-[0.2em] opacity-40 italic">
          System_Contribution_Log
        </h2>
        <div className="flex flex-wrap gap-1">
          {fallbackDays.map((day, i) => (
            <div
              key={i}
              className={`w-3 h-3 rounded-sm ${INTENSITIES[day.level] ?? INTENSITIES[0]}`}
              title="Simulated (offline)"
            />
          ))}
        </div>
        <p className="text-[9px] mt-2 opacity-30 italic">⚠ Data_Offline — Simulated</p>
      </div>
    );
  }

  return (
    <div className="pt-4">
      <h2 className="text-[10px] mb-3 uppercase tracking-[0.2em] opacity-40 italic">
        System_Contribution_Log — {total} contributions/year
      </h2>
      <div className="flex flex-wrap gap-1">
        {days.map((day) => (
          <div
            key={day.date}
            className={`w-3 h-3 rounded-sm ${INTENSITIES[day.level] ?? INTENSITIES[0]}`}
            title={`${day.date}: ${day.count} contributions`}
          />
        ))}
      </div>
      <p className="text-[9px] mt-2 opacity-30 italic">
        github.com/{GITHUB_USERNAME} — last 8 weeks
      </p>
    </div>
  );
}
