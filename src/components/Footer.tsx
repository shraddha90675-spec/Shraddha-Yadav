/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Terminal, Shield, Cpu, Activity, Clock, Heart } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';

export const Footer: React.FC = () => {
  const { data, setIsTerminalOpen } = usePortfolio();

  const [time, setTime] = useState<string>('');
  const [uptimeSeconds, setUptimeSeconds] = useState(14820);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(now.toISOString().replace('T', ' ').substring(0, 19) + ' UTC');
    };
    updateTime();
    const timer = setInterval(() => {
      updateTime();
      setUptimeSeconds((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatUptime = (totalSeconds: number) => {
    const days = Math.floor(totalSeconds / 86400);
    const hours = Math.floor((totalSeconds % 86400) / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    return `${days}d ${hours.toString().padStart(2, '0')}h ${minutes.toString().padStart(2, '0')}m ${seconds.toString().padStart(2, '0')}s`;
  };

  return (
    <footer className="border-t border-[#00ff41]/20 bg-black/95 text-zinc-400 font-mono text-xs select-none relative z-10">
      {/* Telemetry bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 border-b border-zinc-900/80">
        <div className="flex items-center gap-2">
          <Activity className="w-4 h-4 text-[#00ff41] animate-pulse" />
          <div>
            <div className="text-[10px] text-zinc-500 uppercase tracking-wider">SYSTEM UPTIME</div>
            <div className="text-zinc-200 font-semibold">{formatUptime(uptimeSeconds)}</div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Clock className="w-4 h-4 text-[#00e5ff]" />
          <div>
            <div className="text-[10px] text-zinc-500 uppercase tracking-wider">HOST TIMESTAMP</div>
            <div className="text-zinc-200 font-semibold">{time || 'SYNCING...'}</div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Shield className="w-4 h-4 text-[#00ff41]" />
          <div>
            <div className="text-[10px] text-zinc-500 uppercase tracking-wider">SECURITY PROTOCOL</div>
            <div className="text-[#00ff41] font-semibold">TLS 1.3 // ZERO-EXPOSURE</div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Cpu className="w-4 h-4 text-[#00e5ff]" />
          <div>
            <div className="text-[10px] text-zinc-500 uppercase tracking-wider">ENVIRONMENT</div>
            <div className="text-zinc-200 font-semibold">REACT 19 // TAILWIND // LINUX</div>
          </div>
        </div>
      </div>

      {/* Main Bottom strip */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex flex-col md:flex-row items-center justify-between gap-3 text-[11px] text-zinc-500">
        <div className="flex items-center gap-2 text-center md:text-left">
          <span>&copy; {new Date().getFullYear()} {data.personal.name}.</span>
          <span>Crafted with resilient code &amp; cybersecurity mindset.</span>
        </div>

        <div className="flex items-center gap-4">
          <button
            onClick={() => setIsTerminalOpen(true)}
            className="text-[#00ff41] hover:underline flex items-center gap-1 cursor-pointer"
          >
            <Terminal className="w-3.5 h-3.5" /> Launch Terminal CLI
          </button>
          <span className="text-zinc-700">|</span>
          <a
            href={data.personal.github}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-zinc-300 transition-colors"
          >
            GitHub
          </a>
          <a
            href={data.personal.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-zinc-300 transition-colors"
          >
            LinkedIn
          </a>
          <a
            href={`mailto:${data.personal.email}`}
            className="hover:text-zinc-300 transition-colors"
          >
            PGP / Email
          </a>
        </div>
      </div>
    </footer>
  );
};
