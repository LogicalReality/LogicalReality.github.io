/**
 * useContributions — Custom Hook para obtener contribuciones reales de GitHub.
 *
 * Usa el proxy público deno.dev que scrapea el SVG de contribuciones de GitHub
 * y lo expone como JSON. No requiere token ni autenticación.
 *
 * La respuesta tiene esta estructura:
 * {
 *   contributions: Array<Array<{ contributionLevel: string, contributionCount: number, date: string }>>,
 *   totalContributions: number
 * }
 *
 * Donde contributions es un array de SEMANAS, cada semana tiene 7 días.
 * contributionLevel puede ser: "NONE", "FIRST_QUARTILE", "SECOND_QUARTILE",
 * "THIRD_QUARTILE", "FOURTH_QUARTILE".
 *
 * Implementa caché en localStorage con TTL de 1 hora para evitar requests
 * excesivos al proxy.
 *
 * @param {string} username - El nombre de usuario de GitHub
 * @param {number} [weeksToShow=8] - Cuántas semanas mostrar (7 días × weeksToShow = celdas)
 * @returns {{ days: Array, loading: boolean, error: string|null, total: number }}
 */
import { useState, useEffect } from 'react';

const CACHE_KEY = (username) => `contributions_cache_${username}`;
const CACHE_TTL_MS = 60 * 60 * 1000; // 1 hora

const LEVEL_MAP = {
  NONE: 0,
  FIRST_QUARTILE: 1,
  SECOND_QUARTILE: 2,
  THIRD_QUARTILE: 3,
  FOURTH_QUARTILE: 4,
};

function readCache(username) {
  try {
    const raw = localStorage.getItem(CACHE_KEY(username));
    if (!raw) return null;
    const { timestamp, data } = JSON.parse(raw);
    if (Date.now() - timestamp > CACHE_TTL_MS) return null;
    return data;
  } catch {
    return null;
  }
}

function writeCache(username, data) {
  try {
    localStorage.setItem(
      CACHE_KEY(username),
      JSON.stringify({ timestamp: Date.now(), data })
    );
  } catch {
    // localStorage puede estar deshabilitado — silencio intencional
  }
}

export function useContributions(username, weeksToShow = 8) {
  const [days, setDays] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    if (!username) return;

    const fetchContributions = async () => {
      setLoading(true);
      setError(null);

      // Intentar cache primero
      const cached = readCache(username);
      if (cached) {
        setDays(cached.days);
        setTotal(cached.total);
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(
          `https://github-contributions-api.deno.dev/${username}.json`
        );

        if (!response.ok) {
          throw new Error(`API respondió con status ${response.status}`);
        }

        const data = await response.json();

        // contributions es Array<Array<Day>> — aplanamos y tomamos las últimas N semanas
        const allWeeks = data.contributions ?? [];
        const recentWeeks = allWeeks.slice(-weeksToShow);
        const flatDays = recentWeeks
          .flat()
          .map((day) => ({
            date: day.date,
            count: day.contributionCount,
            level: LEVEL_MAP[day.contributionLevel] ?? 0,
          }));

        const result = { days: flatDays, total: data.totalContributions ?? 0 };
        writeCache(username, result);
        setDays(result.days);
        setTotal(result.total);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchContributions();
  }, [username, weeksToShow]);

  return { days, loading, error, total };
}
