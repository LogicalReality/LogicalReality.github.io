/**
 * CRTOverlay — El efecto de tubo de TV antiguo (Cathode Ray Tube).
 *
 * Este componente es el más extremo en minimalismo: una sola línea de JSX.
 * ¿Justifica tener su propio archivo? SÍ, y por estas razones:
 *
 * 1. SEMÁNTICA: cuando ves <CRTOverlay /> en App.jsx sabes exactamente
 *    qué es ese div sin necesidad de leer sus 40 clases de Tailwind.
 *
 * 2. REEMPLAZABILIDAD: si mañana querés cambiar el efecto por un shader
 *    WebGL, cambiás solo este archivo. El App.jsx no se entera.
 *
 * 3. CONSISTENCIA: el principio es que TODO lo visual es un componente.
 *    Si hacemos excepciones, el sistema pierde coherencia.
 *
 * La clase .crt-overlay está definida en index.css — ya no vive en JSX.
 */
export function CRTOverlay() {
  return <div className="crt-overlay" aria-hidden="true" />;
}
