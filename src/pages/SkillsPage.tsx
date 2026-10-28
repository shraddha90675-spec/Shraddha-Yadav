/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import {
  Code,
  Globe,
  ShieldCheck,
  Wrench,
  Search,
  Sparkles,
  Layers,
  ArrowUpRight,
  Clock,
  Terminal
} from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';
import { GlitchText } from '../components/GlitchText';
import { filterSkillsByCategory, calculateSkillStats } from '../utils/filters';
import { cyberAudio } from '../utils/audio';

export const SkillsPage: React.FC = () => {
  const { data } = usePortfolio();

  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const categories = ['All', 'Programming', 'Web Development', 'Cybersecurity', 'Tools'];

  const categoryIcons: Record<string, React.ReactNode> = {
    Programming: <Code className="w-4 h-4 text-[#00ff41]" />,
    'Web Development': <Globe className="w-4 h-4 text-[#00e5ff]" />,
    Cybersecurity: <ShieldCheck className="w-4 h-4 text-[#00ff41]" />,
    Tools: <Wrench className="w-4 h-4 text-[#00e5ff]" />
  };

  const filteredSkills = data.skills.filter((skill) => {
    const matchesCat = selectedCategory === 'All' || skill.category === selectedCategory;
    const matchesQuery =
      !searchQuery ||
      skill.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      skill.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesQuery;
  });

  const stats = calculateSkillStats(data.skills);

  return (
    <div className="py-10 max-w-7xl mx-auto px-4 sm:px-6 space-y-10 font-mono">
      {/* Header */}
      <div className="border-b border-[#00ff41]/25 pb-6">
        <div className="inline-flex items-center gap-2 text-xs text-[#00e5ff] tracking-widest mb-2">
          <span>// ARSENAL_MATRIX</span>
          <span>::</span>
          <span>COMPETENCY_AUDIT</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-wide">
          TECHNICAL <GlitchText text="SKILLS" as="span" glow="green" />
        </h1>
        <p className="text-zinc-400 text-xs sm:text-sm mt-2 max-w-3xl">
          Categorized technical competencies, verified toolchains, and configurable proficiency levels.
        </p>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
        <div className="p-4 bg-[#0a0f0d] border border-zinc-800 rounded-sm">
          <div className="text-zinc-500 uppercase tracking-wider text-[10px]">TOTAL ARSENAL</div>
          <div className="text-xl font-bold text-white mt-1">{stats.count} SKILLS</div>
        </div>

        <div className="p-4 bg-[#0a0f0d] border border-zinc-800 rounded-sm">
          <div className="text-zinc-500 uppercase tracking-wider text-[10px]">AVG PROFICIENCY</div>
          <div className="text-xl font-bold text-[#00ff41] mt-1">{stats.average}%</div>
        </div>

        <div className="p-4 bg-[#0a0f0d] border border-zinc-800 rounded-sm">
          <div className="text-zinc-500 uppercase tracking-wider text-[10px]">ADVANCED TIER</div>
          <div className="text-xl font-bold text-[#00e5ff] mt-1">{stats.advancedCount} DOMAINS</div>
        </div>

        <div className="p-4 bg-[#0a0f0d] border border-zinc-800 rounded-sm">
          <div className="text-zinc-500 uppercase tracking-wider text-[10px]">VERIFICATION</div>
          <div className="text-xl font-bold text-[#00ff41] mt-1">CONFIGURABLE</div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 bg-black/80 p-3 rounded-sm border border-zinc-800">
        {/* Category Pills */}
        <div className="flex flex-wrap items-center gap-1.5 overflow-x-auto text-xs">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                cyberAudio.playKeyClick();
                setSelectedCategory(cat);
              }}
              className={`px-3 py-1.5 rounded-xs transition-all cursor-pointer flex items-center gap-1.5 whitespace-nowrap ${
                selectedCategory === cat
                  ? 'bg-[#00ff41] text-black font-bold shadow-[0_0_10px_rgba(0,255,65,0.4)]'
                  : 'bg-zinc-900/80 text-zinc-400 hover:text-white hover:bg-zinc-800'
              }`}
            >
              {categoryIcons[cat] || <Layers className="w-3.5 h-3.5" />}
              <span>{cat}</span>
            </button>
          ))}
        </div>

        {/* Search input */}
        <div className="relative min-w-[220px]">
          <Search className="w-3.5 h-3.5 text-zinc-500 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search skills..."
            className="w-full pl-8 pr-3 py-1.5 text-xs bg-black border border-zinc-800 focus:border-[#00ff41] text-white rounded-xs outline-hidden"
          />
        </div>
      </div>

      {/* Skills Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredSkills.map((skill) => {
          const filledBlocks = Math.round(skill.level / 10);
          const emptyBlocks = 10 - filledBlocks;
          const barString = '[' + '#'.repeat(filledBlocks) + '-'.repeat(emptyBlocks) + ']';

          return (
            <div
              key={skill.name}
              className="p-5 rounded-sm bg-[#0a0f0d] border border-zinc-800 hover:border-[#00ff41]/50 hover:shadow-[0_0_15px_rgba(0,255,65,0.12)] transition-all space-y-3 group"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="p-1.5 rounded bg-black border border-zinc-800 group-hover:border-[#00ff41]/40">
                    {categoryIcons[skill.category] || <Code className="w-4 h-4 text-[#00ff41]" />}
                  </span>
                  <div>
                    <h3 className="text-sm font-bold text-white group-hover:text-[#00ff41] transition-colors">
                      {skill.name}
                    </h3>
                    <span className="text-[10px] text-zinc-500 uppercase tracking-wider">
                      {skill.category}
                    </span>
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-xs font-bold text-[#00e5ff]">{skill.level}%</span>
                  <div className="text-[10px] text-zinc-500">{skill.proficiencyLabel}</div>
                </div>
              </div>

              {/* Graphical Progress Bar */}
              <div className="space-y-1">
                <div className="w-full bg-black border border-zinc-800 h-2 rounded-xs overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-[#008f11] via-[#00ff41] to-[#00e5ff] transition-all duration-700"
                    style={{ width: `${skill.level}%` }}
                  />
                </div>
                <div className="flex justify-between text-[10px] text-zinc-600 font-mono">
                  <span>{barString}</span>
                  <span>PROFICIENCY_INDEX</span>
                </div>
              </div>

              <p className="text-xs text-zinc-400 leading-relaxed">
                {skill.description}
              </p>
            </div>
          );
        })}
      </div>

      {/* Currently Learning Section */}
      <section className="space-y-6 pt-6 border-t border-[#00ff41]/20">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-[10px] text-[#00e5ff] tracking-widest uppercase mb-1">
              // ACTIVE_UPGRADE_STREAM
            </div>
            <h2 className="text-xl font-bold text-white flex items-center gap-2 border-l-2 border-[#00e5ff] pl-3">
              CURRENTLY LEARNING &amp; EXPANDING
            </h2>
          </div>
          <span className="text-xs text-zinc-500 hidden sm:inline">HORIZON_2026/2027</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {data.currentlyLearning.map((item) => (
            <div
              key={item.topic}
              className="p-5 rounded-sm bg-black/90 border border-zinc-800 hover:border-[#00e5ff]/50 transition-all space-y-3"
            >
              <div className="flex items-center justify-between text-xs">
                <span className="text-[#00e5ff] font-bold">{item.topic}</span>
                <span className="text-[10px] text-zinc-500 flex items-center gap-1">
                  <Clock className="w-3 h-3" /> {item.targetDate}
                </span>
              </div>

              <p className="text-xs text-zinc-400 min-h-[36px]">{item.focus}</p>

              <div className="space-y-1 pt-1">
                <div className="flex justify-between text-[10px] text-zinc-500">
                  <span>Roadmap Progress</span>
                  <span className="text-[#00ff41]">{item.progress}%</span>
                </div>
                <div className="w-full bg-zinc-950 border border-zinc-800 h-1.5 rounded-xs overflow-hidden">
                  <div
                    className="h-full bg-[#00e5ff]"
                    style={{ width: `${item.progress}%` }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
