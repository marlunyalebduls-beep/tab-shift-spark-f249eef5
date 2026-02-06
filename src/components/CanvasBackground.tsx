import React, { useEffect, useRef } from 'react';

interface Dot {
  x: number;
  y: number;
  color: 'green' | 'blue' | 'mixed';
  baseSize: number;
  size: number;
  speedX: number;
  speedY: number;
  baseAlpha: number;
  alpha: number;
  pulse: number;
  pulseSpeed: number;
  glowIntensity: number;
}

export const CanvasBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();
  const dotsRef = useRef<{ green: Dot[]; blue: Dot[]; mixed: Dot[] }>({
    green: [],
    blue: [],
    mixed: [],
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      createDots();
    };

    const createDot = (color: 'green' | 'blue' | 'mixed'): Dot => ({
      x: Math.random() * (canvas.width - 260) + 260,
      y: Math.random() * canvas.height,
      color,
      baseSize: 1.5 + Math.random() * 2,
      size: 1.5 + Math.random() * 2,
      speedX: (Math.random() - 0.5) * 0.5,
      speedY: (Math.random() - 0.5) * 0.5,
      baseAlpha: Math.random() * 0.25 + 0.2,
      alpha: Math.random() * 0.25 + 0.2,
      pulse: Math.random() * Math.PI * 2,
      pulseSpeed: 0.008 + Math.random() * 0.015,
      glowIntensity: 0.3 + Math.random() * 0.5,
    });

    const createDots = () => {
      dotsRef.current = {
        green: Array.from({ length: 15 }, () => createDot('green')),
        blue: Array.from({ length: 15 }, () => createDot('blue')),
        mixed: Array.from({ length: 20 }, () => createDot('mixed')),
      };
    };

    const updateDot = (dot: Dot) => {
      dot.x += dot.speedX;
      dot.y += dot.speedY;

      if (dot.x < 0 || dot.x > canvas.width) {
        dot.speedX *= -0.9;
        dot.x = Math.max(0, Math.min(canvas.width, dot.x));
      }
      if (dot.y < 0 || dot.y > canvas.height) {
        dot.speedY *= -0.9;
        dot.y = Math.max(0, Math.min(canvas.height, dot.y));
      }

      dot.pulse += dot.pulseSpeed;
      dot.size = dot.baseSize + Math.sin(dot.pulse) * 0.3;
      dot.alpha = dot.baseAlpha + Math.sin(dot.pulse) * 0.05;
    };

    const drawDot = (dot: Dot) => {
      const glowSize = dot.size * 2.5 * dot.glowIntensity;

      const colorConfigs = {
        green: {
          core: `rgba(0, 240, 120, ${dot.alpha + 0.12})`,
          gradient: [
            `rgba(0, 220, 100, ${dot.alpha * 0.6})`,
            `rgba(0, 180, 80, ${dot.alpha * 0.25})`,
            'rgba(0, 140, 60, 0)',
          ],
        },
        blue: {
          core: `rgba(100, 190, 250, ${dot.alpha + 0.12})`,
          gradient: [
            `rgba(60, 160, 240, ${dot.alpha * 0.6})`,
            `rgba(40, 140, 220, ${dot.alpha * 0.25})`,
            'rgba(20, 120, 200, 0)',
          ],
        },
        mixed: {
          core: `rgba(0, 220, 200, ${dot.alpha + 0.12})`,
          gradient: [
            `rgba(0, 200, 180, ${dot.alpha * 0.6})`,
            `rgba(0, 170, 150, ${dot.alpha * 0.25})`,
            'rgba(0, 140, 120, 0)',
          ],
        },
      };

      const config = colorConfigs[dot.color];
      const gradient = ctx.createRadialGradient(dot.x, dot.y, 0, dot.x, dot.y, glowSize);
      gradient.addColorStop(0, config.gradient[0]);
      gradient.addColorStop(0.5, config.gradient[1]);
      gradient.addColorStop(1, config.gradient[2]);

      ctx.beginPath();
      ctx.arc(dot.x, dot.y, glowSize, 0, Math.PI * 2);
      ctx.fillStyle = gradient;
      ctx.fill();

      ctx.beginPath();
      ctx.arc(dot.x, dot.y, dot.size, 0, Math.PI * 2);
      ctx.fillStyle = config.core;
      ctx.fill();
    };

    const distance = (x1: number, y1: number, x2: number, y2: number) =>
      Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));

    const drawConnections = () => {
      const { green, blue } = dotsRef.current;

      green.forEach((greenDot) => {
        blue.forEach((blueDot) => {
          const dist = distance(greenDot.x, greenDot.y, blueDot.x, blueDot.y);

          if (dist < 120) {
            const alpha = (1 - dist / 120) * 0.25;

            ctx.beginPath();
            ctx.moveTo(greenDot.x, greenDot.y);
            ctx.lineTo(blueDot.x, blueDot.y);

            const lineGradient = ctx.createLinearGradient(
              greenDot.x,
              greenDot.y,
              blueDot.x,
              blueDot.y
            );
            lineGradient.addColorStop(0, `rgba(255, 255, 255, ${alpha})`);
            lineGradient.addColorStop(0.5, `rgba(200, 255, 255, ${alpha * 0.6})`);
            lineGradient.addColorStop(1, `rgba(255, 255, 255, ${alpha})`);

            ctx.strokeStyle = lineGradient;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        });
      });
    };

    const animate = () => {
      ctx.fillStyle = '#09090b';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const allDots = [
        ...dotsRef.current.green,
        ...dotsRef.current.blue,
        ...dotsRef.current.mixed,
      ];

      allDots.forEach((dot) => {
        updateDot(dot);
        drawDot(dot);
      });

      drawConnections();
      animationRef.current = requestAnimationFrame(animate);
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-0 hidden md:block"
      style={{ pointerEvents: 'none' }}
    />
  );
};
