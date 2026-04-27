/**
 * ContributionGraph — Gráfico simulado de contribuciones.
 *
 * Este componente contiene la única "lógica de presentación" del sistema:
 * el cálculo de intensidades usando seno para simular un patrón natural.
 *
 * ¿Por qué está acá y no en un hook?
 * Porque es lógica que SOLO existe para decidir CÓMO se ve algo (el color
 * de cada cuadradito). No tiene efectos secundarios, no llama APIs, no
 * modifica estado. Es parte de la PRESENTACIÓN, no de la lógica de negocio.
 * Si la movemos a un hook, estaríamos sobrearquitectando.
 *
 * Regla de oro: no todo necesita un hook. Los hooks son para estado y efectos.
 *
 * @param {{ accentColor: string }} props
 */
export function ContributionGraph() {
  const intensities = [
    'bg-[#00FF4111]',
    'bg-[#00FF4133]',
    'bg-[#00FF4166]',
    'bg-[#00FF41]',
  ];

  return (
    <div className="pt-4">
      <h2 className="text-[10px] mb-3 uppercase tracking-[0.2em] opacity-40 italic">
        System_Contribution_Log (Simulated)
      </h2>

      <div className="flex flex-wrap gap-1">
        {[...Array(56)].map((_, i) => {
          const level = Math.floor(Math.sin(i * 0.5) * 2 + 2);
          return (
            <div
              key={i}
              className={`w-3 h-3 rounded-sm ${intensities[level] || intensities[0]}`}
              title="Simulated Contribution Data"
            />
          );
        })}
      </div>

      <p className="text-[9px] mt-2 opacity-30 italic">
        Nota: Los datos del calendario real requieren API GraphQL o proxy externo.
      </p>
    </div>
  );
}
