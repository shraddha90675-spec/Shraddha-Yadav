/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Terminal,
  ArrowRight,
  Shield,
  Code,
  Cpu,
  Lock,
  ChevronDown,
  Sparkles,
  ExternalLink,
  CheckCircle2,
  Server
} from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';
import { GlitchText } from '../components/GlitchText';
import { cyberAudio } from '../utils/audio';

export const HomePage: React.FC = () => {
  const { data, setIsTerminalOpen, executeTerminalExternal } = usePortfolio();

  // Animated typing effect
  const roles = data.personal.typingRoles;
  const [currentRoleIndex, setCurrentRoleIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const fullText = roles[currentRoleIndex] || '> Developer';
    const typingSpeed = isDeleting ? 40 : 80;

    const timer = setTimeout(() => {
      if (!isDeleting) {
        setDisplayedText(fullText.substring(0, displayedText.length + 1));
        if (displayedText.length === fullText.length) {
          setTimeout(() => setIsDeleting(true), 1600);
        }
      } else {
        setDisplayedText(fullText.substring(0, displayedText.length - 1));
        if (displayedText.length === 0) {
          setIsDeleting(false);
          setCurrentRoleIndex((prev) => (prev + 1) % roles.length);
        }
      }
    }, typingSpeed);

    return () => clearTimeout(timer);
  }, [displayedText, isDeleting, currentRoleIndex, roles]);

  return (
    <div className="relative min-h-[calc(100vh-4rem)] flex flex-col justify-between">
      {/* Hero Section */}
      <section className="relative pt-8 pb-16 md:py-20 max-w-7xl mx-auto px-4 sm:px-6 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Greeting, Name, Typing effect, Intro & Glowing Buttons */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Terminal greeting banner */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xs bg-black/80 border border-[#00ff41]/40 text-xs font-mono text-[#00ff41] shadow-[0_0_15px_rgba(0,255,65,0.15)]">
              <span className="w-2 h-2 rounded-full bg-[#00ff41] animate-ping" />
              <span>{data.terminalGreeting}</span>
            </div>

            {/* Name with cyberpunk glitch effect */}
            <div className="space-y-2">
              <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white">
                Hi, I'm <GlitchText text={data.personal.name} as="span" glow="green" />
              </h1>
              <div className="text-base sm:text-xl font-medium text-zinc-300">
                {data.personal.title}
              </div>
            </div>

            {/* Animated Typing Effect Display */}
            <div className="h-10 sm:h-12 flex items-center bg-black/60 border-l-2 border-[#00ff41] px-4 py-2 text-[#00e5ff] font-mono text-lg sm:text-xl md:text-2xl font-bold rounded-r-xs shadow-[inset_0_0_10px_rgba(0,229,255,0.1)]">
              <span>{displayedText}</span>
              <span className="cursor-blink ml-1 text-[#00ff41]">▋</span>
            </div>

            {/* Short Introduction */}
            <p className="text-zinc-400 text-sm sm:text-base leading-relaxed max-w-2xl font-mono">
              {data.personal.bio}
            </p>

            {/* Glowing Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <Link
                to="/projects"
                onClick={() => cyberAudio.playCommandExecute()}
                className="px-6 py-3 rounded-xs font-bold font-mono text-sm tracking-wider bg-[#00ff41] text-black hover:bg-[#25ff5e] transition-all duration-300 shadow-[0_0_20px_rgba(0,255,65,0.4)] hover:shadow-[0_0_25px_rgba(0,255,65,0.7)] flex items-center gap-2 group cursor-pointer"
              >
                <span>EXPLORE MY WORK</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>

              <Link
                to="/contact"
                onClick={() => cyberAudio.playKeyClick()}
                className="px-6 py-3 rounded-xs font-bold font-mono text-sm tracking-wider bg-black/80 text-[#00e5ff] border border-[#00e5ff]/50 hover:bg-[#00e5ff]/15 hover:border-[#00e5ff] transition-all duration-300 shadow-[0_0_15px_rgba(0,229,255,0.2)] flex items-center gap-2 cursor-pointer"
              >
                <span>CONTACT ME</span>
                <Lock className="w-4 h-4" />
              </Link>

              <button
                onClick={() => executeTerminalExternal('help')}
                className="px-4 py-3 rounded-xs font-mono text-xs text-zinc-400 border border-zinc-800 hover:border-zinc-600 hover:text-white transition-all flex items-center gap-1.5 cursor-pointer"
                title="Launch command line assistant"
              >
                <Terminal className="w-3.5 h-3.5 text-[#00ff41]" />
                <span>CLI HELPER</span>
              </button>
            </div>

            {/* Quick security badges */}
            <div className="pt-4 flex flex-wrap gap-2 text-xs font-mono text-zinc-400">
              <span className="flex items-center gap-1.5 px-2.5 py-1 bg-black/60 border border-zinc-800 rounded-xs">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#00ff41]" /> DEFENSIVE CYBERSECURITY
              </span>
              <span className="flex items-center gap-1.5 px-2.5 py-1 bg-black/60 border border-zinc-800 rounded-xs">
                <Code className="w-3.5 h-3.5 text-[#00e5ff]" /> CLEAN ARCHITECTURE
              </span>
              <span className="flex items-center gap-1.5 px-2.5 py-1 bg-black/60 border border-zinc-800 rounded-xs">
                <Server className="w-3.5 h-3.5 text-[#00ff41]" /> LINUX HARDENING
              </span>
            </div>
          </div>

          {/* Right Column: Futuristic Cyber Avatar & Interactive Mini Terminal */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Cyberpunk HUD Frame with Avatar */}
            <div className="relative group mx-auto max-w-sm">
              {/* Corner crosshairs */}
              <div className="absolute -top-2 -left-2 w-4 h-4 border-t-2 border-l-2 border-[#00ff41] z-10" />
              <div className="absolute -top-2 -right-2 w-4 h-4 border-t-2 border-r-2 border-[#00ff41] z-10" />
              <div className="absolute -bottom-2 -left-2 w-4 h-4 border-b-2 border-l-2 border-[#00ff41] z-10" />
              <div className="absolute -bottom-2 -right-2 w-4 h-4 border-b-2 border-r-2 border-[#00ff41] z-10" />

              <div className="relative rounded-sm overflow-hidden border border-[#00ff41]/40 bg-black/80 shadow-[0_0_25px_rgba(0,255,65,0.2)]">
                {/* HUD Overlay scan banner */}
                <div className="absolute top-2 left-2 z-10 bg-black/90 px-2 py-0.5 rounded text-[10px] font-mono text-[#00ff41] border border-[#00ff41]/30 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#00ff41] animate-ping" />
                  <span>SUBJECT: ID_0X92F</span>
                </div>

                <div className="absolute top-2 right-2 z-10 bg-black/90 px-2 py-0.5 rounded text-[10px] font-mono text-[#00e5ff] border border-[#00e5ff]/30">
                  SCANNER: ACTIVE
                </div>

                {/* Avatar Image with scanline/glitch filter */}
                <div className="h-64 sm:h-72 w-full bg-gradient-to-b from-zinc-900 to-black relative flex items-center justify-center overflow-hidden">
                  <img
                    src={data.personal.avatarUrl}
                    alt={data.personal.name}
                    className="w-full h-full object-cover filter contrast-125 brightness-95 opacity-85 group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  {/* Digital HUD Reticle & Scan Grid */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/40 pointer-events-none" />
                  <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-[11px] font-mono text-zinc-300 bg-black/80 p-2 border border-[#00ff41]/30 backdrop-blur-xs">
                    <span className="text-[#00ff41]">CLEARANCE: CANDIDATE</span>
                    <span className="text-[#00e5ff]">DEFENSE LEVEL: S</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Embedded Live Terminal Widget */}
            <div className="rounded-sm border border-[#00ff41]/30 bg-black/90 p-4 font-mono text-xs shadow-lg space-y-2">
              <div className="flex items-center justify-between border-b border-zinc-800 pb-2 text-[11px] text-zinc-400">
                <span className="flex items-center gap-1.5 text-[#00ff41]">
                  <Terminal className="w-3.5 h-3.5" /> root@security-host:~
                </span>
                <span className="text-zinc-500">LIVE FEED</span>
              </div>

              <div className="space-y-1.5 text-zinc-300">
                <p className="text-zinc-500">$ systemctl status cyber-sentinel.service</p>
                <p className="text-[#00ff41]">● cyber-sentinel.service - Defensive Perimeter Monitor</p>
                <p className="text-zinc-400 pl-3">Loaded: loaded (/etc/systemd/system/cyber-sentinel.service)</p>
                <p className="text-zinc-400 pl-3">Active: <span className="text-[#00ff41] font-semibold">active (running)</span> since boot</p>
                <p className="text-[#00e5ff] pl-3">Telemetry: 0 intrusion threats detected. All ports safe.</p>
              </div>

              <div className="pt-2 flex justify-between items-center text-[10px] text-zinc-500 border-t border-zinc-900">
                <span>INTERACTIVE_SHELL</span>
                <button
                  onClick={() => setIsTerminalOpen(true)}
                  className="text-[#00ff41] hover:underline cursor-pointer"
                >
                  [ OPEN FULL CLI &gt;&gt; ]
                </button>
              </div>
            </div>

          </div>

        </div>

        {/* Scroll Indicator */}
        <div className="mt-16 flex flex-col items-center justify-center text-center space-y-2 select-none">
          <Link
            to="/about"
            onClick={() => cyberAudio.playKeyClick()}
            className="flex flex-col items-center text-zinc-500 hover:text-[#00ff41] transition-colors group cursor-pointer"
          >
            <span className="text-[11px] font-mono tracking-widest uppercase">
              SCROLL DOWN TO INITIALIZE ABOUT
            </span>
            <ChevronDown className="w-5 h-5 animate-bounce mt-1 text-[#00ff41]" />
          </Link>
        </div>
      </section>

      {/* Cyber Highlight Cards Section */}
      <section className="border-t border-[#00ff41]/20 bg-black/60 py-12 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-sm bg-[#0a0f0d] border border-zinc-800 hover:border-[#00ff41]/50 transition-all hover:shadow-[0_0_20px_rgba(0,255,65,0.15)] group">
            <div className="w-10 h-10 rounded bg-black border border-[#00ff41]/40 flex items-center justify-center text-[#00ff41] mb-4 group-hover:scale-110 transition-transform">
              <Shield className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-white font-mono mb-2 flex items-center gap-2">
              Defensive Mindset
            </h3>
            <p className="text-xs text-zinc-400 font-mono leading-relaxed">
              Applying the principle of least privilege, input sanitization, and OWASP mitigation across all application layers.
            </p>
          </div>

          <div className="p-6 rounded-sm bg-[#0a0f0d] border border-zinc-800 hover:border-[#00e5ff]/50 transition-all hover:shadow-[0_0_20px_rgba(0,229,255,0.15)] group">
            <div className="w-10 h-10 rounded bg-black border border-[#00e5ff]/40 flex items-center justify-center text-[#00e5ff] mb-4 group-hover:scale-110 transition-transform">
              <Code className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-white font-mono mb-2">
              Full-Stack Engineering
            </h3>
            <p className="text-xs text-zinc-400 font-mono leading-relaxed">
              Crafting reactive, resilient interfaces in React and TypeScript supported by secure backend APIs and automation pipelines.
            </p>
          </div>

          <div className="p-6 rounded-sm bg-[#0a0f0d] border border-zinc-800 hover:border-[#00ff41]/50 transition-all hover:shadow-[0_0_20px_rgba(0,255,65,0.15)] group">
            <div className="w-10 h-10 rounded bg-black border border-[#00ff41]/40 flex items-center justify-center text-[#00ff41] mb-4 group-hover:scale-110 transition-transform">
              <Cpu className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-white font-mono mb-2">
              Linux &amp; Systems
            </h3>
            <p className="text-xs text-zinc-400 font-mono leading-relaxed">
              Automating system tasks with Python and Bash, analyzing network packets with Wireshark, and containerizing with Docker.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};
