/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useRef } from 'react';
import { usePortfolio } from '../context/PortfolioContext';

export const MatrixBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const { matrixRainActive, theme } = usePortfolio();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Characters: Katakana, Cyrillic, Hex, Math, Cyber
    const characters = '0123456789ABCDEFｦｱｳｴｵｶｷｹｺｻｼｽｾｿﾀﾂﾃﾅﾆﾇﾈﾊﾋﾎﾏﾐﾑﾒﾓﾔﾕﾗﾘﾜ9876543210<>/*-+=!@#$%&';
    const charArray = characters.split('');

    const fontSize = 14;
    let columns = Math.floor(width / fontSize);

    // Array holding Y coordinates for each column
    const drops: number[] = [];
    const speeds: number[] = [];

    const initDrops = () => {
      columns = Math.floor(width / fontSize);
      drops.length = 0;
      speeds.length = 0;
      for (let i = 0; i < columns; i++) {
        drops[i] = Math.random() * -100;
        speeds[i] = 0.6 + Math.random() * 0.7;
      }
    };

    initDrops();

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      initDrops();
    };

    window.addEventListener('resize', handleResize);

    const isLight = theme === 'light';
    const primaryColor = isLight ? '#007020' : '#00ff41';
    const headColor = isLight ? '#004c15' : '#73ff9c';
    const bgFadeColor = isLight ? 'rgba(244, 246, 245, 0.16)' : 'rgba(5, 8, 6, 0.12)';

    let lastFrame = 0;
    const fpsInterval = 1000 / 30; // 30 FPS for silky, lightweight performance without high CPU

    const render = (currentTime: number) => {
      animationFrameId = requestAnimationFrame(render);

      if (!matrixRainActive) {
        ctx.clearRect(0, 0, width, height);
        return;
      }

      const elapsed = currentTime - lastFrame;
      if (elapsed < fpsInterval) return;
      lastFrame = currentTime - (elapsed % fpsInterval);

      // Translucent background fade for trailing effect
      ctx.fillStyle = bgFadeColor;
      ctx.fillRect(0, 0, width, height);

      ctx.font = `${fontSize}px 'JetBrains Mono', monospace`;

      for (let i = 0; i < drops.length; i++) {
        const char = charArray[Math.floor(Math.random() * charArray.length)];
        const x = i * fontSize;
        const y = drops[i] * fontSize;

        // Occasional bright lead glitch character
        if (Math.random() > 0.88) {
          ctx.fillStyle = headColor;
          ctx.shadowBlur = 8;
          ctx.shadowColor = headColor;
        } else {
          ctx.fillStyle = primaryColor;
          ctx.shadowBlur = 0;
        }

        ctx.fillText(char, x, y);

        // Reset drop to top with random delay
        if (y > height && Math.random() > 0.975) {
          drops[i] = 0;
        }

        drops[i] += speeds[i];
      }
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
    };
  }, [matrixRainActive, theme]);

  if (!matrixRainActive) return null;

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none z-0 transition-opacity duration-700 opacity-40 dark:opacity-35"
    />
  );
};
