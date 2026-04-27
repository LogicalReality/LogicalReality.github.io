/**
 * useAge — Custom Hook para calcular la edad.
 *
 * ¿Por qué existe esto si ya tenemos calculateAge()?
 * Porque calculateAge() es una función pura — no sabe nada de React.
 * useAge() es la "envoltura React": usa useMemo para garantizar
 * que el cálculo solo se ejecuta una vez (al montar), no en cada render.
 *
 * Analogía: calculateAge() es la calculadora. useAge() es la persona
 * que usa la calculadora UNA sola vez y guarda el resultado en un Post-it.
 * Si alguien pregunta de nuevo, muestra el Post-it — no vuelve a calcular.
 *
 * @param {string} birthDateString - Fecha en formato 'YYYY-MM-DD'
 * @returns {number} La edad actual en años (memoizada)
 */
import { useMemo } from 'react';
import { calculateAge } from '../utils/calculateAge';

export function useAge(birthDateString) {
  return useMemo(() => calculateAge(birthDateString), [birthDateString]);
}
