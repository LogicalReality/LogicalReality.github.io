/**
 * useGitHubRepos — Custom Hook para obtener repositorios de GitHub.
 *
 * Este hook encapsula TODO el ciclo de vida de los datos:
 * - Estado inicial (vacío, cargando)
 * - La llamada asíncrona a la API
 * - La transformación de los datos crudos al formato que la UI necesita
 * - El estado de éxito (repos disponibles)
 * - El estado de error (algo falló)
 *
 * ¿Por qué importa esto?
 * Tu componente App.jsx NO debería saber que los datos vienen de GitHub.
 * Podría venir de una base de datos local, de un archivo JSON, de cualquier
 * lado. Cuando la fuente cambia, solo cambiás el hook — la UI no se toca.
 *
 * Este patrón se llama "Data Fetching Hook" y es el equivalente React
 * de la capa Repository en arquitecturas hexagonales.
 *
 * @param {string} username - El nombre de usuario de GitHub
 * @param {number} [limit=6] - Máximo de repositorios a retornar
 * @returns {{ repos: Array, loading: boolean, error: string|null }}
 */
import { useState, useEffect } from 'react';

export function useGitHubRepos(username, limit = 6) {
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!username) return;

    const fetchRepos = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(
          `https://api.github.com/users/${username}/repos?sort=updated&per_page=${limit}`
        );

        if (!response.ok) {
          throw new Error(`GitHub API respondió con status ${response.status}`);
        }

        const data = await response.json();

        const formatted = data.map(repo => ({
          name: repo.name,
          lang: repo.language || 'Plain Text',
          stars: repo.stargazers_count,
          desc: repo.description || 'Sin descripción disponible.',
          url: repo.html_url,
        }));

        setRepos(formatted);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchRepos();
  }, [username, limit]);

  return { repos, loading, error };
}
