/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { cyberAudio } from '../utils/audio';

export const InitializingScreen: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState('BOOTING KERNEL...');

  const steps = [
    { threshold: 15, text: 'MOUNTING ROOT FILE SYSTEM...' },
    { threshold: 35, text: 'INITIALIZING DEFENSIVE SENTINELS...' },
    { threshold: 55, text: 'CALIBRATING MATRIX CANVAS STREAM...' },
    { threshold: 75, text: 'PARSING REPOSITORIES & CREDENTIALS...' },
    { threshold: 90, text: 'STARTING SECURE SHELL INTERFACE...' },
    { threshold: 100, text: 'INITIALIZATION COMPLETE. ACCESS GRANTED.' }
  ];

  useEffect(() => {
    // Check if user already saw intro in this session or ?autostart=1 query param
    const params = new URLSearchParams(window.location.search);
    if (params.get('autostart') === '1' || sessionStorage.getItem('cyber_initialized')) {
      onComplete();
      return;
    }

    const interval = setInterval(() => {
      setProgress((prev) => {
        const next = prev + Math.floor(Math.random() * 8) + 4;
        if (next >= 100) {
          clearInterval(interval);
          sessionStorage.setItem('cyber_initialized', 'true');
          cyberAudio.playSuccess();
          setTimeout(onComplete, 400);
          return 100;
        }

        const match = steps.find((s) => s.threshold >= next);
        if (match) setCurrentStep(match.text);

        return next;
      });
    }, 45);

    return () => clearInterval(interval);
  }, [onComplete]);

  const handleSkip = () => {
    sessionStorage.setItem('cyber_initialized', 'true');
    cyberAudio.playKeyClick();
    onComplete();
  };

  return (
    <div
      role="dialog"
      aria-label="System Initializing"
      className="fixed inset-0 z-50 bg-[#050806] flex flex-col items-center justify-center p-6 text-[#00ff41] font-mono selection:bg-[#00ff41] selection:text-black"
    >
      <div className="max-w-md w-full border border-[#00ff41]/50 bg-black/90 p-6 md:p-8 rounded-sm shadow-[0_0_30px_rgba(0,255,65,0.25)] relative overflow-hidden">
        {/* Top bar */}
        <div className="flex items-center justify-between border-b border-[#00ff41]/30 pb-3 mb-6 text-xs text-[#00e5ff]">
          <span className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#00ff41] animate-ping" />
            SYS_BOOT // ARCH_X64
          </span>
          <span>BUILD 2026.10</span>
        </div>

        <div className="space-y-4">
          <div className="text-xl md:text-2xl font-bold tracking-wider text-white neon-text-green">
            INITIALIZING PORTFOLIO...
          </div>

          <p className="text-xs text-zinc-400 h-6 overflow-hidden flex items-center">
            <span className="text-[#00ff41] mr-2">&gt;</span>
            {currentStep}
          </p>

          {/* Progress bar */}
          <div className="w-full bg-zinc-950 border border-[#00ff41]/40 h-5 p-0.5 relative">
            <div
              className="bg-gradient-to-r from-[#008f11] via-[#00ff41] to-[#00e5ff] h-full transition-all duration-75"
              style={{ width: `${progress}%` }}
            />
            <span className="absolute inset-0 flex items-center justify-center text-[10px] font-bold text-black tracking-widest mix-blend-difference">
              {progress}%
            </span>
          </div>

          <div className="flex justify-between items-center text-[11px] text-zinc-500 pt-2">
            <span>MEM: 64MB ALLOCATED</span>
            <span>SECURITY LEVEL: 0x01</span>
          </div>
        </div>

        {/* Skip button */}
        <div className="mt-8 flex justify-end">
          <button
            onClick={handleSkip}
            className="px-4 py-1.5 text-xs border border-[#00e5ff]/50 text-[#00e5ff] hover:bg-[#00e5ff]/15 hover:border-[#00e5ff] transition-all cursor-pointer rounded-xs"
          >
            [ SKIP SEQUENCE &gt;&gt; ]
          </button>
        </div>
      </div>
    </div>
  );
};
