/**
 * Tests para calculateAge()
 *
 * CONCEPTO CLAVE: Usamos vi.useFakeTimers() para "congelar" el tiempo.
 * ¿Por qué? Porque si testeamos con la fecha real, los tests se romperían
 * cada año cuando cambie la edad. Un test que depende del reloj del sistema
 * no es un test confiable — es una bomba de tiempo.
 *
 * vi.useFakeTimers() le dice a Vitest: "cuando el código pregunte
 * qué hora es, respondé con ESTA fecha que yo te digo".
 */
import { describe, it, expect, vi, afterEach } from 'vitest';
import { calculateAge } from '../../utils/calculateAge';

describe('calculateAge', () => {
  afterEach(() => {
    // Restauramos el reloj real después de cada test
    vi.useRealTimers();
  });

  it('retorna la edad correcta cuando el cumpleaños ya pasó este año', () => {
    // Simulamos que "hoy" es 15 de marzo de 2026
    vi.useFakeTimers();
    vi.setSystemTime(new Date('2026-03-15'));

    // Alguien nacido el 26 de enero de 1996 ya cumplió años en 2026
    // 2026 - 1996 = 30
    expect(calculateAge('1996-01-26')).toBe(30);
  });

  it('retorna un año menos si el cumpleaños aún no llegó', () => {
    // Simulamos que "hoy" es 10 de enero de 2026
    vi.useFakeTimers();
    vi.setSystemTime(new Date('2026-01-10'));

    // El cumpleaños es el 26 de enero, aún no llegó
    // 2026 - 1996 = 30, pero restamos 1 = 29
    expect(calculateAge('1996-01-26')).toBe(29);
  });

  it('retorna la edad correcta el día exacto del cumpleaños', () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date('2026-01-26'));

    // Hoy ES el cumpleaños → la edad es 30
    expect(calculateAge('1996-01-26')).toBe(30);
  });

  it('funciona con cualquier fecha de nacimiento, no solo una hardcodeada', () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date('2026-06-15'));

    // Alguien nacido el 1 de diciembre de 2000
    // En junio de 2026, aún no cumplió → 25
    expect(calculateAge('2000-12-01')).toBe(25);

    // Alguien nacido el 1 de marzo de 2000
    // En junio de 2026, ya cumplió → 26
    expect(calculateAge('2000-03-01')).toBe(26);
  });
});
