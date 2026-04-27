/**
 * Tests para processCommand()
 *
 * CONCEPTO CLAVE: Testeamos el COMPORTAMIENTO, no la implementación.
 * No nos importa si internamente usa un switch, un if, o un mapa.
 * Solo nos importa: "si le paso 'help', ¿qué me devuelve?"
 *
 * Esto es fundamental porque cuando refactoricemos (por ejemplo,
 * cambiar el switch por un objeto Map), los tests SIGUEN PASANDO
 * si el comportamiento no cambió. Eso es una "red de seguridad".
 */
import { describe, it, expect } from 'vitest';
import { processCommand } from '../../utils/processCommand';

describe('processCommand', () => {
  // Contexto que simula el estado de la app
  const context = { age: 30, projectCount: 6 };

  describe('comando: help', () => {
    it('retorna la lista de comandos disponibles', () => {
      const result = processCommand('help', context);

      expect(result.response).toContain('whoami');
      expect(result.response).toContain('projects');
      expect(result.response).toContain('contact');
      expect(result.response).toContain('clear');
      expect(result.response).toContain('github');
      expect(result.action).toBeNull();
    });
  });

  describe('comando: whoami', () => {
    it('incluye el username y la edad del contexto', () => {
      const result = processCommand('whoami', context);

      expect(result.response).toContain('LogicalReality');
      expect(result.response).toContain('30');
      expect(result.action).toBeNull();
    });
  });

  describe('comando: projects', () => {
    it('muestra la cantidad de repositorios del contexto', () => {
      const result = processCommand('projects', context);

      expect(result.response).toContain('6');
      expect(result.action).toBeNull();
    });
  });

  describe('comando: contact', () => {
    it('retorna la información de contacto', () => {
      const result = processCommand('contact', context);

      expect(result.response).toContain('@carlos26ch01');
      expect(result.action).toBeNull();
    });
  });

  describe('comando: github', () => {
    it('retorna un mensaje y la acción openGitHub', () => {
      const result = processCommand('github', context);

      // No abre la ventana directamente — retorna una ACCIÓN
      // El componente React decide qué hacer con ella
      expect(result.response).toContain('github.com/LogicalReality');
      expect(result.action).toBe('openGitHub');
    });
  });

  describe('comando: clear', () => {
    it('retorna null como response y la acción clear', () => {
      const result = processCommand('clear', context);

      expect(result.response).toBeNull();
      expect(result.action).toBe('clear');
    });
  });

  describe('comando desconocido', () => {
    it('retorna un mensaje de error con el comando ingresado', () => {
      const result = processCommand('hackear_nasa', context);

      expect(result.response).toContain('hackear_nasa');
      expect(result.response).toContain('Error');
      expect(result.action).toBeNull();
    });
  });

  describe('normalización de input', () => {
    it('ignora mayúsculas y espacios en blanco', () => {
      const result = processCommand('  HELP  ', context);

      expect(result.response).toContain('whoami');
    });
  });
});
