/**
 * useTerminal — Custom Hook para el motor de la terminal interactiva.
 *
 * Este hook gestiona TODO lo relacionado con la terminal:
 * - El estado del input actual (command)
 * - El historial de mensajes (history)
 * - El procesamiento de comandos al presionar Enter
 *
 * ¿Por qué recibe `age` y `projectCount` como parámetros
 * en vez de calcularlos él mismo?
 *
 * INYECCIÓN DE DEPENDENCIAS.
 * El hook no debería ser responsable de saber quién es el usuario
 * ni cuántos proyectos hay. Esos datos vienen de otros hooks
 * (useAge, useGitHubRepos). Le llegamos los datos ya calculados
 * y él los usa para responder comandos como `whoami` o `projects`.
 *
 * Beneficio: si mañana `age` viene de una base de datos en vez de
 * una fecha hardcodeada, el hook de terminal NO cambia en absoluto.
 *
 * @param {Object} context - Datos externos que los comandos necesitan
 * @param {number} context.age - La edad del usuario
 * @param {number} context.projectCount - Cantidad de repos cargados
 */
import { useState, useCallback } from 'react';
import { processCommand } from '../utils/processCommand';

const INITIAL_HISTORY = [
  { type: 'system', content: 'Iniciando sistema... OK' },
  { type: 'system', content: 'Conexión establecida con gateway: LogicalReality' },
  { type: 'system', content: 'Sincronizando con GitHub API... ESPERE' },
];

export function useTerminal({ age = 0, projectCount = 0 } = {}) {
  const [command, setCommand] = useState('');
  const [history, setHistory] = useState(INITIAL_HISTORY);

  // useCallback memoriza la función entre renders.
  // Sin esto, handleCommand se recrea en cada render → el input
  // recibe una nueva referencia en cada keystroke → ineficiencia.
  // age y projectCount son dependencias: si cambian, recreamos la función.
  const handleCommand = useCallback((e) => {
    if (e.key !== 'Enter') return;

    const result = processCommand(command, { age, projectCount });

    // El action 'clear' es el único que vacía el historial
    if (result.action === 'clear') {
      setHistory([]);
      setCommand('');
      return;
    }

    // Efecto de navegador delegado al límite del hook:
    // el hook sabe que la acción es "abrir GitHub", pero
    // podríamos moverlo al componente si quisiéramos 100% pure.
    if (result.action === 'openGitHub') {
      window.open('https://github.com/LogicalReality', '_blank');
    }

    setHistory(prev => [
      ...prev,
      { type: 'user', content: `> ${command}` },
      { type: 'system', content: result.response },
    ]);

    setCommand('');
  }, [command, age, projectCount]);

  return { history, command, setCommand, handleCommand };
}
