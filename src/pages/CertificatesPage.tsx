/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import {
  Award,
  ExternalLink,
  ShieldCheck,
  Calendar,
  CheckCircle2,
  Clock,
  Sparkles,
  Trophy,
  FileCheck
} from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';
import { GlitchText } from '../components/GlitchText';
import { cyberAudio } from '../utils/audio';

export const CertificatesPage: React.FC = () => {
  const { data } = usePortfolio();

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Verified':
        return (
          <span className="flex items-center gap-1 text-[10px] text-[#00ff41] bg-[#00ff41]/10 border border-[#00ff41]/40 px-2 py-0.5 rounded-xs font-bold">
            <CheckCircle2 className="w-3 h-3" /> VERIFIED
          </span>
        );
      case 'In Progress':
        return (
          <span className="flex items-center gap-1 text-[10px] text-yellow-400 bg-yellow-400/10 border border-yellow-400/40 px-2 py-0.5 rounded-xs font-bold">
            <Clock className="w-3 h-3" /> IN PROGRESS
          </span>
        );
      default:
        return (
          <span className="flex items-center gap-1 text-[10px] text-zinc-400 bg-zinc-900 border border-zinc-700 px-2 py-0.5 rounded-xs">
            ROADMAP PLACEHOLDER
          </span>
        );
    }
  };

  return (
    <div className="py-10 max-w-7xl mx-auto px-4 sm:px-6 space-y-12 font-mono">
      {/* Header */}
      <div className="border-b border-[#00ff41]/25 pb-6">
        <div className="inline-flex items-center gap-2 text-xs text-[#00e5ff] tracking-widest mb-2">
          <span>// ATTESTATION_LEDGER</span>
          <span>::</span>
          <span>AUTHENTIC_CREDENTIALS</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-wide">
          CERTIFICATES &amp; <GlitchText text="ACHIEVEMENTS" as="span" glow="green" />
        </h1>
        <p className="text-zinc-400 text-xs sm:text-sm mt-2 max-w-3xl">
          Verified academic and professional certifications, CTF achievements, and honors.
          Future roadmap targets are explicitly labeled as placeholders to ensure 100% honesty.
        </p>
      </div>

      {/* Certificates Grid */}
      <section className="space-y-6">
        <h2 className="text-xl font-bold text-white flex items-center gap-2 border-l-2 border-[#00ff41] pl-3">
          CERTIFICATIONS &amp; CREDENTIALS
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {data.certificates.map((cert) => (
            <div
              key={cert.id}
              className="p-6 rounded-sm bg-[#0a0f0d] border border-zinc-800 hover:border-[#00ff41]/40 hover:shadow-[0_0_20px_rgba(0,255,65,0.12)] transition-all flex flex-col justify-between space-y-4 group"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <div className="p-2 rounded bg-black border border-zinc-800 group-hover:border-[#00ff41]/50 text-[#00ff41]">
                      <FileCheck className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="text-[10px] text-[#00e5ff] font-semibold">{cert.issuer}</span>
                      <div className="text-[10px] text-zinc-500">{cert.date}</div>
                    </div>
                  </div>
                  <div>{getStatusBadge(cert.status)}</div>
                </div>

                <h3 className="text-base font-bold text-white group-hover:text-[#00ff41] transition-colors">
                  {cert.title}
                </h3>

                <p className="text-xs text-zinc-400 leading-relaxed">
                  {cert.description}
                </p>

                {/* Skills Learned */}
                <div className="pt-2">
                  <div className="text-[10px] text-zinc-500 uppercase tracking-wider mb-1.5">
                    Competencies Validated:
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {cert.skillsLearned.map((skill) => (
                      <span
                        key={skill}
                        className="px-2 py-0.5 rounded-xs bg-black text-[10px] text-zinc-300 border border-zinc-800"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Credential link / verification */}
              <div className="pt-3 border-t border-zinc-900 flex items-center justify-between text-xs">
                <div className="text-[11px] text-zinc-500 font-mono">
                  ID: <span className="text-zinc-300">{cert.credentialId}</span>
                </div>

                {cert.status !== 'Candidate Placeholder' ? (
                  <a
                    href={cert.credentialUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => cyberAudio.playKeyClick()}
                    className="text-xs text-[#00ff41] hover:underline flex items-center gap-1 font-semibold"
                  >
                    <span>Verify Credential</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                ) : (
                  <span className="text-[11px] text-zinc-600">Pending Examination</span>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Achievements Timeline */}
      <section className="space-y-6 pt-6 border-t border-[#00ff41]/20">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-white flex items-center gap-2 border-l-2 border-[#00e5ff] pl-3">
            ACHIEVEMENTS &amp; COMPETITION HONORS
          </h2>
          <span className="text-xs text-zinc-500 hidden sm:inline">HONORS_RECORD</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {data.achievements.map((ach) => (
            <div
              key={ach.id}
              className="p-5 rounded-sm bg-black/90 border border-zinc-800 hover:border-[#00e5ff]/50 transition-all space-y-3 group"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-[#00e5ff] flex items-center gap-1.5">
                  <Trophy className="w-4 h-4 text-yellow-400" />
                  {ach.badge}
                </span>
                <span className="text-xs text-zinc-500 font-mono">{ach.year}</span>
              </div>

              <h3 className="text-base font-bold text-white group-hover:text-[#00e5ff] transition-colors">
                {ach.title}
              </h3>

              <div className="text-xs text-zinc-400 font-semibold">{ach.organization}</div>

              <p className="text-xs text-zinc-400 leading-relaxed">
                {ach.description}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
