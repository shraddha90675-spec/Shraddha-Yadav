/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import {
  User,
  GraduationCap,
  Shield,
  Target,
  Terminal,
  Calendar,
  Compass,
  Award,
  ChevronRight,
  Sparkles,
  BookOpen
} from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';
import { GlitchText } from '../components/GlitchText';
import { executeTerminalCommand, TerminalOutputItem } from '../utils/terminalLogic';
import { cyberAudio } from '../utils/audio';

export const AboutPage: React.FC = () => {
  const { data } = usePortfolio();

  // Embedded Interactive Terminal section specifically for About page
  const [activeTab, setActiveTab] = useState<'whoami' | 'education' | 'interests' | 'mission'>('whoami');
  const [cliOutput, setCliOutput] = useState<TerminalOutputItem[]>(() => {
    return executeTerminalCommand('whoami', data).output;
  });

  const handleCommandClick = (cmd: 'whoami' | 'education' | 'interests' | 'mission') => {
    setActiveTab(cmd);
    cyberAudio.playCommandExecute();
    const res = executeTerminalCommand(cmd, data);
    setCliOutput(res.output);
  };

  return (
    <div className="py-10 max-w-7xl mx-auto px-4 sm:px-6 space-y-12 font-mono">
      {/* Page Header */}
      <div className="border-b border-[#00ff41]/25 pb-6">
        <div className="inline-flex items-center gap-2 text-xs text-[#00e5ff] tracking-widest mb-2">
          <span>// DOSSIER_EXPLORER</span>
          <span>::</span>
          <span>CLEARANCE_LEVEL_01</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-wide">
          ABOUT <GlitchText text="ME" as="span" glow="green" />
        </h1>
        <p className="text-zinc-400 text-xs sm:text-sm mt-2 max-w-3xl">
          Background, academic roots, defensive security philosophy, and software engineering journey.
        </p>
      </div>

      {/* Interactive Terminal Section */}
      <section className="bg-black/90 border border-[#00ff41]/40 rounded-sm overflow-hidden shadow-[0_0_25px_rgba(0,255,65,0.15)]">
        {/* Terminal Title Bar */}
        <div className="flex flex-wrap items-center justify-between px-4 py-2.5 bg-black border-b border-[#00ff41]/30 gap-2">
          <div className="flex items-center gap-2 text-xs text-[#00ff41] font-bold">
            <Terminal className="w-4 h-4 text-[#00ff41]" />
            <span>sys_inspect --module about</span>
          </div>

          {/* Quick command buttons */}
          <div className="flex items-center gap-1.5 overflow-x-auto text-xs">
            {(['whoami', 'education', 'interests', 'mission'] as const).map((cmd) => (
              <button
                key={cmd}
                onClick={() => handleCommandClick(cmd)}
                className={`px-3 py-1 rounded-xs transition-all cursor-pointer flex items-center gap-1 ${
                  activeTab === cmd
                    ? 'bg-[#00ff41] text-black font-bold shadow-[0_0_10px_rgba(0,255,65,0.5)]'
                    : 'bg-zinc-900 text-zinc-300 hover:text-white hover:bg-zinc-800 border border-zinc-800'
                }`}
              >
                <span>$ {cmd}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Terminal Output Area */}
        <div className="p-5 text-xs sm:text-sm space-y-2 bg-[#050806]/95 min-h-[140px]">
          <div className="text-zinc-500 flex items-center gap-2">
            <span className="text-[#00ff41] font-bold">root@portfolio:~$</span>
            <span className="text-white font-semibold">{activeTab}</span>
          </div>

          <div className="space-y-1.5 pt-2">
            {cliOutput.map((item, idx) => (
              <div
                key={idx}
                className={
                  item.type === 'success'
                    ? 'text-[#00ff41] font-semibold'
                    : item.type === 'system'
                    ? 'text-[#00e5ff] font-bold'
                    : 'text-zinc-300'
                }
              >
                {item.text}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Information Cards Grid */}
      <section className="space-y-6">
        <h2 className="text-xl font-bold text-white flex items-center gap-2 border-l-2 border-[#00ff41] pl-3">
          PERSONAL DETAILS &amp; ATTRIBUTES
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-4 rounded-sm bg-[#0a0f0d] border border-zinc-800 hover:border-[#00ff41]/40 transition-colors">
            <div className="flex items-center gap-2 text-[#00ff41] text-xs font-bold mb-2">
              <User className="w-4 h-4" /> IDENTITY
            </div>
            <div className="text-sm font-semibold text-white">{data.personal.name}</div>
            <div className="text-xs text-zinc-400 mt-1">Handle: @{data.personal.handle}</div>
            <div className="text-xs text-zinc-500 mt-1">{data.personal.location}</div>
          </div>

          <div className="p-4 rounded-sm bg-[#0a0f0d] border border-zinc-800 hover:border-[#00e5ff]/40 transition-colors">
            <div className="flex items-center gap-2 text-[#00e5ff] text-xs font-bold mb-2">
              <GraduationCap className="w-4 h-4" /> ACADEMIC STATUS
            </div>
            <div className="text-sm font-semibold text-white">{data.aboutDetails.degree}</div>
            <div className="text-xs text-zinc-400 mt-1">{data.aboutDetails.university}</div>
            <div className="text-xs text-[#00ff41] mt-1">GPA: {data.aboutDetails.gpa} ({data.aboutDetails.graduationYear})</div>
          </div>

          <div className="p-4 rounded-sm bg-[#0a0f0d] border border-zinc-800 hover:border-[#00ff41]/40 transition-colors">
            <div className="flex items-center gap-2 text-[#00ff41] text-xs font-bold mb-2">
              <Shield className="w-4 h-4" /> DEFENSIVE FOCUS
            </div>
            <div className="text-sm font-semibold text-white">{data.aboutDetails.coreFocus}</div>
            <div className="text-xs text-zinc-400 mt-1">{data.aboutDetails.clearanceStatus}</div>
          </div>

          <div className="p-4 rounded-sm bg-[#0a0f0d] border border-zinc-800 hover:border-[#00e5ff]/40 transition-colors">
            <div className="flex items-center gap-2 text-[#00e5ff] text-xs font-bold mb-2">
              <Target className="w-4 h-4" /> PRIMARY STACK
            </div>
            <div className="flex flex-wrap gap-1 mt-1">
              {data.aboutDetails.primaryLanguages.map((lang) => (
                <span
                  key={lang}
                  className="px-2 py-0.5 rounded-xs bg-black text-[11px] text-[#00ff41] border border-[#00ff41]/30"
                >
                  {lang}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Detailed Biography narrative */}
      <section className="p-6 rounded-sm bg-[#0a0f0d] border border-zinc-800 space-y-4">
        <h2 className="text-lg font-bold text-white flex items-center gap-2">
          <BookOpen className="w-4 h-4 text-[#00ff41]" />
          TECHNICAL JOURNEY &amp; PHILOSOPHY
        </h2>
        <div className="space-y-3 text-xs sm:text-sm text-zinc-300 leading-relaxed">
          {data.personal.detailedBio.map((paragraph, idx) => (
            <p key={idx} className="flex items-start gap-2">
              <span className="text-[#00ff41] mt-0.5">&gt;</span>
              <span>{paragraph}</span>
            </p>
          ))}
        </div>
      </section>

      {/* Learning Journey Timeline */}
      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-white flex items-center gap-2 border-l-2 border-[#00ff41] pl-3">
            LEARNING JOURNEY &amp; ACHIEVEMENTS TIMELINE
          </h2>
          <span className="text-xs text-zinc-500 hidden sm:inline">CHRONOLOGICAL_LOG</span>
        </div>

        <div className="relative border-l border-[#00ff41]/40 ml-4 pl-6 sm:pl-8 space-y-8">
          {data.timeline.map((item, idx) => (
            <div key={idx} className="relative group">
              {/* Timeline node */}
              <div className="absolute -left-[31px] sm:-left-[39px] top-1.5 w-3.5 h-3.5 rounded-full bg-black border-2 border-[#00ff41] group-hover:bg-[#00ff41] transition-colors shadow-[0_0_8px_rgba(0,255,65,0.6)]" />

              <div className="p-5 rounded-sm bg-[#0a0f0d] border border-zinc-800 group-hover:border-[#00ff41]/40 transition-all space-y-2">
                <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
                  <span className="text-[#00e5ff] font-bold flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5" /> {item.period}
                  </span>
                  <span className="px-2 py-0.5 rounded bg-black text-[10px] text-zinc-400 border border-zinc-800 uppercase">
                    {item.type}
                  </span>
                </div>

                <h3 className="text-base font-bold text-white">
                  {item.title} <span className="text-zinc-500 font-normal">@ {item.organization}</span>
                </h3>

                <p className="text-xs text-zinc-300 leading-relaxed">
                  {item.description}
                </p>

                {item.highlights && item.highlights.length > 0 && (
                  <ul className="pt-2 space-y-1 text-xs text-zinc-400 border-t border-zinc-900">
                    {item.highlights.map((h, hIdx) => (
                      <li key={hIdx} className="flex items-center gap-2">
                        <ChevronRight className="w-3 h-3 text-[#00ff41] shrink-0" />
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
