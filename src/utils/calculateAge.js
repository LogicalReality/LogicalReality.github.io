/**
 * Calcula la edad a partir de una fecha de nacimiento.
 *
 * ¿Por qué es una función separada?
 * Porque calcular la edad es LÓGICA PURA: recibe un dato (fecha),
 * retorna un dato (número). No necesita saber nada de React,
 * ni de componentes, ni de la UI. Si mañana movemos esto a
 * una app de Node.js, funciona igual.
 *
 * @param {string} birthDateString - Fecha en formato 'YYYY-MM-DD'
 * @returns {number} La edad actual en años
 */
export function calculateAge(birthDateString) {
  const birthDate = new Date(birthDateString);
  const today = new Date();

  let age = today.getFullYear() - birthDate.getFullYear();

  const monthDiff = today.getMonth() - birthDate.getMonth();

  // Si aún no llegó el mes del cumpleaños, o si estamos en el mes
  // pero no llegó el día, restamos un año.
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }

  return age;
}
