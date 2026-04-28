/**
 * Procesa un comando de la terminal y retorna la respuesta.
 *
 * ¿Por qué separamos esto del componente React?
 * Porque el switch/case de comandos es LÓGICA DE NEGOCIO PURA.
 * No necesita saber nada de React, ni de useState, ni del DOM.
 *
 * Fijate que retornamos un objeto { response, action } en vez
 * de ejecutar efectos directamente. Eso permite:
 * 1. Testear sin un navegador (no hay window.open aquí)
 * 2. El componente decide QUÉ HACER con la acción
 * 3. Agregar comandos nuevos sin tocar la UI
 *
 * @param {string} cmd - El comando ingresado por el usuario
 * @param {Object} context - Datos que algunos comandos necesitan
 * @param {number} context.age - La edad actual del usuario
 * @param {number} context.projectCount - Cantidad de repos cargados
 * @returns {{ response: string|null, action: string|null }}
 */
export function processCommand(cmd, context = {}) {
  const { age = 0, projectCount = 0 } = context;
  const normalized = cmd.toLowerCase().trim();

  switch (normalized) {
    case 'help':
      return {
        response: 'Comandos: whoami, projects, contact, clear, github',
        action: null,
      };

    case 'whoami':
      return {
        response: `User: LogicalReality | Age: ${age} | Status: Coding & PC Lover.`,
        action: null,
      };

    case 'projects':
      return {
        response: `Mostrando ${projectCount} repositorios activos desde GitHub.`,
        action: null,
      };

    case 'contact':
      return {
        response: 'X (Twitter): @carlos26ch01',
        action: null,
      };

    case 'github':
      return {
        response: 'Redirigiendo a https://github.com/LogicalReality ...',
        action: 'openGitHub',
      };

    case 'clear':
      return {
        response: null,
        action: 'clear',
      };

    default:
      return {
        response: `Error: '${normalized}' no es un comando interno.`,
        action: null,
      };
  }
}
