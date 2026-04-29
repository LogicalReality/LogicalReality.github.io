import { useEffect, useRef } from 'react';
import { ACCENT_COLOR } from '../config';

/**
 * MatrixBackground
 * 
 * Efecto de lluvia digital nativo (puro Canvas + JS).
 * Cero dependencias externas, optimizado con requestAnimationFrame.
 */
export const MatrixBackground = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    // Manejo de redimensionamiento
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Configuración del efecto
    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*()_+{}[]|;:<>?,./=';
    const fontSize = 16;
    const columns = Math.floor(canvas.width / fontSize);
    const drops = Array(columns).fill(1);

    // Loop de animación
    const draw = () => {
      // Fondo negro semi-transparente para crear el efecto de desvanecimiento
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = ACCENT_COLOR;
      ctx.font = `${fontSize}px monospace`;

      for (let i = 0; i < drops.length; i++) {
        // Caracter aleatorio
        const text = letters.charAt(Math.floor(Math.random() * letters.length));
        
        // Dibujar el caracter
        const x = i * fontSize;
        const y = drops[i] * fontSize;
        ctx.fillText(text, x, y);

        // Resetear la gota si llega al final o de forma aleatoria para variar las longitudes
        if (y > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }

        // Mover la gota hacia abajo
        drops[i]++;
      }
    };

    const interval = setInterval(draw, 40); // 20% más lento (25 fps)

    // Cleanup
    return () => {
      clearInterval(interval);
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-0 pointer-events-none opacity-40"
      aria-hidden="true"
    />
  );
};
