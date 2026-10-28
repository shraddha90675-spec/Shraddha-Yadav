/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import {
  Download,
  Printer,
  Terminal,
  FileText,
  Briefcase,
  GraduationCap,
  Code,
  Shield,
  Copy,
  Check,
  ExternalLink
} from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';
import { GlitchText } from '../components/GlitchText';
import { cyberAudio } from '../utils/audio';

export const ResumePage: React.FC = () => {
  const { data } = usePortfolio();

  const [viewMode, setViewMode] = useState<'visual' | 'terminal'>('visual');
  const [copiedRaw, setCopiedRaw] = useState(false);

  const rawResumeText = `================================================================================
                               ${data.personal.name.toUpperCase()}
          ${data.personal.title}
          Location: ${data.personal.location} | Email: ${data.personal.email}
          GitHub: ${data.personal.github} | LinkedIn: ${data.personal.linkedin}
================================================================================

[ 01 // PROFESSIONAL SUMMARY ]
${data.personal.bio}

[ 02 // EDUCATION ]
* ${data.aboutDetails.degree}
  ${data.aboutDetails.university}
  Graduation: ${data.aboutDetails.graduationYear} | GPA: ${data.aboutDetails.gpa}
  Status: ${data.aboutDetails.clearanceStatus}

[ 03 // CORE TECHNICAL SKILLS ]
* Languages: ${data.aboutDetails.primaryLanguages.join(', ')}
* Web Engineering: React, HTML5, CSS3, Tailwind CSS, REST APIs, Express
* Cybersecurity & Systems: Linux Hardening, Wireshark, OWASP Top 10, TCP/IP
* Developer Tooling: Git, GitHub Actions, Docker, VS Code, Bash Scripting

[ 04 // FEATURED ENGINEERING PROJECTS ]
${data.projects
  .map(
    (p, i) => `* [0${i + 1}] ${p.name} (${p.category})
  - ${p.description}
  - Tech: ${p.technologies.join(', ')}
  - Repo: ${p.githubUrl}`
  )
  .join('\n\n')}

[ 05 // EXPERIENCE & MILESTONES ]
${data.timeline
  .map(
    (t) => `* ${t.period}: ${t.title} - ${t.organization} (${t.role})
  ${t.description}`
  )
  .join('\n\n')}

================================================================================
Generated via CyberPortfolio Terminal Environment. SHA-256 Verified.
================================================================================`;

  const handleDownload = () => {
    cyberAudio.playSuccess();
    // Create text file download for immediate offline consumption
    const blob = new Blob([rawResumeText], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${data.personal.name.toLowerCase().replace(/\s+/g, '_')}_resume.txt`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const handlePrint = () => {
    cyberAudio.playCommandExecute();
    window.print();
  };

  const handleCopyRaw = () => {
    cyberAudio.playKeyClick();
    navigator.clipboard.writeText(rawResumeText);
    setCopiedRaw(true);
    setTimeout(() => setCopiedRaw(false), 2000);
  };

  return (
    <div className="py-10 max-w-5xl mx-auto px-4 sm:px-6 space-y-10 font-mono">
      {/* Header */}
      <div className="border-b border-[#00ff41]/25 pb-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 text-xs text-[#00e5ff] tracking-widest mb-2">
            <span>// CURRICULUM_VITAE</span>
            <span>::</span>
            <span>EXPORT_INTERFACE</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-wide">
            RESUME &amp; <GlitchText text="DOSSIER" as="span" glow="green" />
          </h1>
          <p className="text-zinc-400 text-xs sm:text-sm mt-2 max-w-2xl">
            Complete credentials, experience, projects, and academic history.
          </p>
        </div>

        {/* View toggle and Action buttons */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Mode switch */}
          <div className="bg-black border border-zinc-800 p-1 rounded flex items-center gap-1 text-xs">
            <button
              onClick={() => {
                cyberAudio.playKeyClick();
                setViewMode('visual');
              }}
              className={`px-3 py-1 rounded transition-colors cursor-pointer flex items-center gap-1.5 ${
                viewMode === 'visual'
                  ? 'bg-[#00ff41] text-black font-bold'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              <FileText className="w-3.5 h-3.5" /> Visual Layout
            </button>
            <button
              onClick={() => {
                cyberAudio.playKeyClick();
                setViewMode('terminal');
              }}
              className={`px-3 py-1 rounded transition-colors cursor-pointer flex items-center gap-1.5 ${
                viewMode === 'terminal'
                  ? 'bg-[#00e5ff] text-black font-bold'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              <Terminal className="w-3.5 h-3.5" /> cat resume.txt
            </button>
          </div>

          {/* Glowing Download Button */}
          <button
            onClick={handleDownload}
            className="px-4 py-2 bg-[#00ff41] text-black font-bold text-xs rounded-xs shadow-[0_0_20px_rgba(0,255,65,0.4)] hover:bg-[#33ff66] transition-all flex items-center gap-2 cursor-pointer"
          >
            <Download className="w-4 h-4" />
            <span>DOWNLOAD RESUME</span>
          </button>

          {/* Print button */}
          <button
            onClick={handlePrint}
            title="Print or Save as PDF"
            aria-label="Print or Save as PDF"
            className="p-2 bg-black border border-zinc-700 hover:border-[#00ff41] text-zinc-300 hover:text-white rounded-xs transition-colors cursor-pointer"
          >
            <Printer className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      {viewMode === 'visual' ? (
        /* Visual Formatted Resume */
        <div className="p-6 sm:p-10 bg-[#0a0f0d] border border-zinc-800 rounded-sm shadow-2xl space-y-8 text-zinc-300 text-xs sm:text-sm">
          {/* Header Block */}
          <div className="border-b border-zinc-800 pb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-wide">
                {data.personal.name}
              </h2>
              <div className="text-sm text-[#00ff41] font-semibold mt-1">
                {data.personal.title}
              </div>
            </div>

            <div className="text-xs text-zinc-400 space-y-1 sm:text-right font-mono">
              <div>{data.personal.location}</div>
              <div>{data.personal.email}</div>
              <div className="text-[#00e5ff]">{data.personal.github}</div>
            </div>
          </div>

          {/* Section: Summary */}
          <div className="space-y-2">
            <h3 className="text-xs font-bold text-[#00ff41] uppercase tracking-wider flex items-center gap-2">
              <Shield className="w-3.5 h-3.5" /> 01 // PROFESSIONAL STATEMENT
            </h3>
            <p className="text-zinc-300 leading-relaxed">{data.personal.bio}</p>
          </div>

          {/* Section: Education */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold text-[#00e5ff] uppercase tracking-wider flex items-center gap-2">
              <GraduationCap className="w-3.5 h-3.5" /> 02 // EDUCATION
            </h3>
            <div className="p-4 bg-black/60 border border-zinc-800 rounded space-y-1">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="font-bold text-white">{data.aboutDetails.degree}</span>
                <span className="text-xs text-[#00ff41]">{data.aboutDetails.graduationYear}</span>
              </div>
              <div className="text-xs text-zinc-400">{data.aboutDetails.university}</div>
              <div className="text-xs text-zinc-500">Cumulative GPA: {data.aboutDetails.gpa} | {data.aboutDetails.clearanceStatus}</div>
            </div>
          </div>

          {/* Section: Technical Skills */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold text-[#00ff41] uppercase tracking-wider flex items-center gap-2">
              <Code className="w-3.5 h-3.5" /> 03 // CORE COMPETENCIES
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="p-3 bg-black/60 border border-zinc-800 rounded">
                <div className="text-xs font-semibold text-white mb-1">Languages:</div>
                <div className="text-xs text-zinc-400">Python, C, C++, JavaScript (ES6+), TypeScript, Bash</div>
              </div>
              <div className="p-3 bg-black/60 border border-zinc-800 rounded">
                <div className="text-xs font-semibold text-white mb-1">Web &amp; Frameworks:</div>
                <div className="text-xs text-zinc-400">React 19, Tailwind CSS, Express, Node.js, HTML5/CSS3</div>
              </div>
              <div className="p-3 bg-black/60 border border-zinc-800 rounded">
                <div className="text-xs font-semibold text-white mb-1">Security &amp; Systems:</div>
                <div className="text-xs text-zinc-400">Linux Administration, Wireshark, Nmap, OWASP Top 10, TCP/IP</div>
              </div>
              <div className="p-3 bg-black/60 border border-zinc-800 rounded">
                <div className="text-xs font-semibold text-white mb-1">Tools &amp; DevOps:</div>
                <div className="text-xs text-zinc-400">Git, GitHub Actions, Docker, VS Code, Neovim</div>
              </div>
            </div>
          </div>

          {/* Section: Projects */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold text-[#00e5ff] uppercase tracking-wider flex items-center gap-2">
              <Briefcase className="w-3.5 h-3.5" /> 04 // NOTABLE ENGINEERING PROJECTS
            </h3>
            <div className="space-y-3">
              {data.projects.slice(0, 4).map((p) => (
                <div key={p.id} className="p-4 bg-black/60 border border-zinc-800 rounded space-y-1.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-white">{p.name}</span>
                    <span className="text-[#00ff41]">{p.category}</span>
                  </div>
                  <p className="text-xs text-zinc-400">{p.description}</p>
                  <div className="text-[11px] text-zinc-500 font-mono">
                    Technologies: {p.technologies.join(', ')}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        /* Raw Terminal View */
        <div className="bg-black border border-[#00ff41]/50 rounded-sm p-4 sm:p-6 shadow-[0_0_30px_rgba(0,255,65,0.15)] relative">
          <div className="flex items-center justify-between border-b border-zinc-800 pb-3 mb-4 text-xs">
            <span className="text-[#00ff41] flex items-center gap-2 font-bold">
              <Terminal className="w-4 h-4" /> cat /home/arivera/documents/resume.txt
            </span>
            <button
              onClick={handleCopyRaw}
              className="text-xs text-zinc-400 hover:text-white flex items-center gap-1.5 bg-zinc-900 px-2.5 py-1 rounded border border-zinc-800 cursor-pointer"
            >
              {copiedRaw ? <Check className="w-3.5 h-3.5 text-[#00ff41]" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedRaw ? 'Copied' : 'Copy Text'}</span>
            </button>
          </div>

          <pre className="font-mono text-xs sm:text-sm text-zinc-300 overflow-x-auto whitespace-pre leading-relaxed select-all">
            {rawResumeText}
          </pre>
        </div>
      )}
    </div>
  );
};
