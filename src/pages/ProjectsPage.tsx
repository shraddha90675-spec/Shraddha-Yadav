/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import {
  FolderGit2,
  ExternalLink,
  Github,
  Terminal,
  Sparkles,
  Layers,
  Search,
  Check,
  Code2,
  Cpu,
  Shield,
  Bot
} from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';
import { ProjectItem } from '../data/portfolioData';
import { GlitchText } from '../components/GlitchText';
import { filterProjects } from '../utils/filters';
import { cyberAudio } from '../utils/audio';

export const ProjectsPage: React.FC = () => {
  const { data, executeTerminalExternal } = usePortfolio();

  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeProjectModal, setActiveProjectModal] = useState<ProjectItem | null>(null);

  const categories = ['All', 'Web Dev', 'Cybersecurity', 'Automation', 'AI / Systems'];

  const filteredProjects = filterProjects(data.projects, selectedCategory, searchQuery);

  const getCategoryBadgeColor = (cat: string) => {
    switch (cat) {
      case 'Cybersecurity':
        return 'text-[#00ff41] border-[#00ff41]/40 bg-[#00ff41]/10';
      case 'AI / Systems':
        return 'text-[#00e5ff] border-[#00e5ff]/40 bg-[#00e5ff]/10';
      case 'Automation':
        return 'text-yellow-400 border-yellow-400/40 bg-yellow-400/10';
      default:
        return 'text-purple-400 border-purple-400/40 bg-purple-400/10';
    }
  };

  const getProjectVisualPreview = (id: string, name: string) => {
    switch (id) {
      case 'personal-portfolio':
        return (
          <div className="w-full h-44 bg-gradient-to-br from-black via-[#051508] to-black p-4 flex flex-col justify-between font-mono text-[11px] border-b border-zinc-800 relative overflow-hidden">
            <div className="flex items-center justify-between text-[#00ff41]">
              <span className="flex items-center gap-1.5"><Terminal className="w-3.5 h-3.5" /> matrix_engine.bin</span>
              <span className="text-[10px] text-zinc-500">LIVE_PREVIEW</span>
            </div>
            <div className="text-zinc-400 space-y-1">
              <p className="text-[#00ff41]">&gt; npm run dev -- --host</p>
              <p>&gt; Local: http://localhost:3000</p>
              <p className="text-[#00e5ff]">&gt; Terminal CLI: ACTIVE [OK]</p>
            </div>
            <div className="flex gap-2">
              <span className="px-1.5 py-0.5 bg-black/80 text-[10px] text-[#00ff41] border border-[#00ff41]/30">REACT 19</span>
              <span className="px-1.5 py-0.5 bg-black/80 text-[10px] text-[#00e5ff] border border-[#00e5ff]/30">MATRIX_CANVAS</span>
            </div>
          </div>
        );

      case 'eco-snap':
        return (
          <div className="w-full h-44 bg-gradient-to-br from-black via-[#041c18] to-black p-4 flex flex-col justify-between font-mono text-[11px] border-b border-zinc-800 relative overflow-hidden">
            <div className="flex items-center justify-between text-[#00e5ff]">
              <span className="flex items-center gap-1.5"><Bot className="w-3.5 h-3.5" /> ai_classifier_v2</span>
              <span className="text-[10px] text-emerald-400">98.2% CONFIDENCE</span>
            </div>
            <div className="p-2 bg-black/60 border border-[#00e5ff]/30 text-xs text-zinc-300 rounded">
              <span className="text-[#00e5ff] font-bold">DETECTED:</span> Aluminum Beverage Can
              <div className="text-[10px] text-[#00ff41] mt-0.5">&gt; Recommended: Blue Recycling Bin (-0.14kg CO2)</div>
            </div>
            <div className="flex gap-2">
              <span className="px-1.5 py-0.5 bg-black/80 text-[10px] text-[#00e5ff] border border-[#00e5ff]/30">TENSORFLOW</span>
              <span className="px-1.5 py-0.5 bg-black/80 text-[10px] text-zinc-400 border border-zinc-800">OPENCV</span>
            </div>
          </div>
        );

      case 'student-management':
        return (
          <div className="w-full h-44 bg-gradient-to-br from-black via-[#100d1c] to-black p-4 flex flex-col justify-between font-mono text-[11px] border-b border-zinc-800 relative overflow-hidden">
            <div className="flex items-center justify-between text-purple-400">
              <span className="flex items-center gap-1.5"><Shield className="w-3.5 h-3.5" /> rbac_auth_guard</span>
              <span className="text-[10px] text-zinc-500">AUDIT_LOG_ACTIVE</span>
            </div>
            <div className="space-y-1 text-zinc-400">
              <p className="text-purple-300">&gt; JWT Verification: PASSED (HS256)</p>
              <p>&gt; Role: STUDENT_ADVISOR // Scope: GRADES_RW</p>
              <p className="text-zinc-500">&gt; 12,400 active student records secured</p>
            </div>
            <div className="flex gap-2">
              <span className="px-1.5 py-0.5 bg-black/80 text-[10px] text-purple-400 border border-purple-400/30">POSTGRESQL</span>
              <span className="px-1.5 py-0.5 bg-black/80 text-[10px] text-zinc-400 border border-zinc-800">DOCKER</span>
            </div>
          </div>
        );

      case 'python-automation-tools':
        return (
          <div className="w-full h-44 bg-gradient-to-br from-black via-[#1c1804] to-black p-4 flex flex-col justify-between font-mono text-[11px] border-b border-zinc-800 relative overflow-hidden">
            <div className="flex items-center justify-between text-yellow-400">
              <span className="flex items-center gap-1.5"><Cpu className="w-3.5 h-3.5" /> log_parser_daemon</span>
              <span className="text-[10px] text-yellow-500">SCAN_COMPLETE</span>
            </div>
            <div className="space-y-1 text-zinc-400">
              <p className="text-yellow-300">&gt; /var/log/auth.log [42,800 lines parsed]</p>
              <p className="text-[#00ff41]">&gt; 4 brute-force IP ranges quarantined</p>
              <p className="text-zinc-500">&gt; SHA-256 baseline integrity: VERIFIED</p>
            </div>
            <div className="flex gap-2">
              <span className="px-1.5 py-0.5 bg-black/80 text-[10px] text-yellow-400 border border-yellow-400/30">PYTHON 3.12</span>
              <span className="px-1.5 py-0.5 bg-black/80 text-[10px] text-zinc-400 border border-zinc-800">AUTOMATION</span>
            </div>
          </div>
        );

      default:
        return (
          <div className="w-full h-44 bg-gradient-to-br from-black via-[#051515] to-black p-4 flex flex-col justify-between font-mono text-[11px] border-b border-zinc-800 relative overflow-hidden">
            <div className="flex items-center justify-between text-[#00ff41]">
              <span className="flex items-center gap-1.5"><Shield className="w-3.5 h-3.5" /> packet_sentinel</span>
              <span className="text-[10px] text-emerald-400">PROMISCUOUS_MODE</span>
            </div>
            <div className="space-y-1 text-zinc-400">
              <p className="text-[#00ff41]">&gt; Sniffing eth0 [1,450 pps]</p>
              <p className="text-[#00e5ff]">&gt; SYN Flood heuristic: NORMAL</p>
              <p className="text-zinc-500">&gt; Exported: capture_20261027.pcap</p>
            </div>
            <div className="flex gap-2">
              <span className="px-1.5 py-0.5 bg-black/80 text-[10px] text-[#00ff41] border border-[#00ff41]/30">SCAPY</span>
              <span className="px-1.5 py-0.5 bg-black/80 text-[10px] text-[#00e5ff] border border-[#00e5ff]/30">PCAP</span>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="py-10 max-w-7xl mx-auto px-4 sm:px-6 space-y-10 font-mono">
      {/* Header */}
      <div className="border-b border-[#00ff41]/25 pb-6">
        <div className="inline-flex items-center gap-2 text-xs text-[#00e5ff] tracking-widest mb-2">
          <span>// PROJECT_REPOSITORY</span>
          <span>::</span>
          <span>SYSTEM_ARCHITECTURES</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-wide">
          FEATURED <GlitchText text="PROJECTS" as="span" glow="green" />
        </h1>
        <p className="text-zinc-400 text-xs sm:text-sm mt-2 max-w-3xl">
          Engineered applications, defensive cybersecurity tools, and automation scripts.
          Placeholder URLs are ready to be linked to your live repositories.
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 bg-black/80 p-3 rounded-sm border border-zinc-800">
        {/* Category buttons */}
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
              <Layers className="w-3.5 h-3.5" />
              <span>{cat}</span>
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="relative min-w-[220px]">
          <Search className="w-3.5 h-3.5 text-zinc-500 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search projects or stack..."
            className="w-full pl-8 pr-3 py-1.5 text-xs bg-black border border-zinc-800 focus:border-[#00ff41] text-white rounded-xs outline-hidden"
          />
        </div>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProjects.map((project) => (
          <div
            key={project.id}
            className="rounded-sm bg-[#0a0f0d] border border-zinc-800 hover:border-[#00ff41]/50 hover:shadow-[0_0_20px_rgba(0,255,65,0.15)] transition-all flex flex-col justify-between overflow-hidden group"
          >
            <div>
              {/* Visual preview */}
              {getProjectVisualPreview(project.id, project.name)}

              {/* Card Body */}
              <div className="p-5 space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <span
                    className={`px-2 py-0.5 rounded-xs text-[10px] border uppercase font-bold ${getCategoryBadgeColor(
                      project.category
                    )}`}
                  >
                    {project.category}
                  </span>
                  <span className="text-[10px] text-zinc-500 font-mono">
                    STATUS: {project.status}
                  </span>
                </div>

                <h3 className="text-base font-bold text-white group-hover:text-[#00ff41] transition-colors">
                  {project.name}
                </h3>

                <p className="text-xs text-zinc-400 line-clamp-3 leading-relaxed">
                  {project.description}
                </p>

                {/* Tech Pills */}
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-0.5 rounded-xs bg-black text-[10px] text-zinc-300 border border-zinc-800"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Card Action Buttons */}
            <div className="p-5 pt-0 border-t border-zinc-900 mt-4 flex items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => cyberAudio.playKeyClick()}
                  className="px-3 py-1.5 rounded-xs bg-black border border-zinc-700 hover:border-[#00ff41] text-xs text-zinc-300 hover:text-white flex items-center gap-1.5 transition-colors"
                >
                  <Github className="w-3.5 h-3.5" />
                  <span>Code</span>
                </a>

                <a
                  href={project.demoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => cyberAudio.playKeyClick()}
                  className="px-3 py-1.5 rounded-xs bg-[#00ff41]/10 border border-[#00ff41]/50 hover:bg-[#00ff41] hover:text-black text-xs text-[#00ff41] font-semibold flex items-center gap-1.5 transition-all"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>Demo</span>
                </a>
              </div>

              <button
                onClick={() => {
                  cyberAudio.playCommandExecute();
                  setActiveProjectModal(project);
                }}
                className="text-xs text-zinc-500 hover:text-[#00e5ff] flex items-center gap-1 cursor-pointer"
                title="Inspect architecture details"
              >
                <Terminal className="w-3.5 h-3.5" /> Inspect
              </button>
            </div>
          </div>
        ))}
      </div>

      {filteredProjects.length === 0 && (
        <div className="text-center py-12 p-6 bg-black/60 border border-zinc-800 rounded-sm">
          <Terminal className="w-8 h-8 text-zinc-600 mx-auto mb-2" />
          <p className="text-sm text-zinc-400">No projects match the specified filter or query.</p>
          <button
            onClick={() => {
              setSelectedCategory('All');
              setSearchQuery('');
            }}
            className="mt-3 px-3 py-1 text-xs border border-[#00ff41]/40 text-[#00ff41] rounded"
          >
            Reset Filters
          </button>
        </div>
      )}

      {/* Project Detail Modal */}
      {activeProjectModal && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={activeProjectModal.name}
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-sm"
        >
          <div className="w-full max-w-2xl bg-[#0a0f0d] border border-[#00ff41]/60 shadow-[0_0_35px_rgba(0,255,65,0.25)] rounded-sm overflow-hidden text-zinc-200">
            <div className="flex items-center justify-between px-5 py-3.5 bg-black border-b border-[#00ff41]/30">
              <div className="flex items-center gap-2 text-sm font-bold text-[#00ff41]">
                <Terminal className="w-4 h-4 text-[#00ff41]" />
                <span>ARCH_INSPECTION // {activeProjectModal.id}</span>
              </div>
              <button
                onClick={() => setActiveProjectModal(null)}
                className="text-zinc-400 hover:text-white p-1"
                aria-label="Close inspection modal"
              >
                ✕
              </button>
            </div>

            <div className="p-6 space-y-4 max-h-[75vh] overflow-y-auto text-xs sm:text-sm">
              <h2 className="text-xl font-bold text-white">{activeProjectModal.name}</h2>
              <p className="text-zinc-300 leading-relaxed">{activeProjectModal.longDescription}</p>

              {activeProjectModal.commandPreview && (
                <div className="bg-black p-3 rounded border border-zinc-800 space-y-1">
                  <div className="text-[10px] text-zinc-500 uppercase tracking-widest">
                    SYSTEM EXECUTION COMMAND
                  </div>
                  <div className="text-[#00ff41] font-mono text-xs">
                    $ {activeProjectModal.commandPreview}
                  </div>
                </div>
              )}

              <div>
                <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-2 flex items-center gap-1.5 text-[#00e5ff]">
                  <Sparkles className="w-3.5 h-3.5" /> Key Architectural Features:
                </h4>
                <ul className="space-y-1.5 text-xs text-zinc-400">
                  {activeProjectModal.features.map((f, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <Check className="w-3.5 h-3.5 text-[#00ff41] shrink-0 mt-0.5" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-2">
                <span className="text-xs text-zinc-500 block mb-1">Technologies:</span>
                <div className="flex flex-wrap gap-1.5">
                  {activeProjectModal.technologies.map((t) => (
                    <span
                      key={t}
                      className="px-2 py-0.5 rounded-xs bg-black text-xs text-[#00ff41] border border-[#00ff41]/30"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-zinc-800">
                <a
                  href={activeProjectModal.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 bg-black border border-zinc-700 hover:border-[#00ff41] text-xs text-white rounded flex items-center gap-1.5"
                >
                  <Github className="w-3.5 h-3.5" /> View Repository
                </a>
                <a
                  href={activeProjectModal.demoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 bg-[#00ff41] text-black font-bold text-xs rounded hover:bg-[#33ff66] flex items-center gap-1.5"
                >
                  <ExternalLink className="w-3.5 h-3.5" /> Launch Demo
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
