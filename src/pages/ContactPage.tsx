/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import {
  Mail,
  Send,
  Github,
  Linkedin,
  Copy,
  Check,
  Shield,
  Terminal,
  Lock,
  MessageSquare,
  AlertCircle,
  ExternalLink
} from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';
import { GlitchText } from '../components/GlitchText';
import { validateContactForm, generateChecksum } from '../utils/validation';
import { cyberAudio } from '../utils/audio';

export const ContactPage: React.FC = () => {
  const { data } = usePortfolio();

  const [form, setForm] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionReceipt, setSubmissionReceipt] = useState<{
    timestamp: string;
    checksum: string;
    name: string;
    email: string;
    subject: string;
  } | null>(null);

  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const handleCopy = (text: string, key: string) => {
    cyberAudio.playKeyClick();
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    cyberAudio.playCommandExecute();

    const validation = validateContactForm(form);
    if (!validation.isValid) {
      cyberAudio.playError();
      setErrors(validation.errors as Record<string, string>);
      return;
    }

    setErrors({});
    setIsSubmitting(true);

    // Simulate secure handshake & cryptographic verification
    setTimeout(() => {
      setIsSubmitting(false);
      const checksum = generateChecksum(`${form.name}:${form.email}:${form.message}`);
      setSubmissionReceipt({
        timestamp: new Date().toISOString(),
        checksum,
        name: form.name,
        email: form.email,
        subject: form.subject
      });
      cyberAudio.playSuccess();
    }, 900);
  };

  const handleResetForm = () => {
    setForm({ name: '', email: '', subject: '', message: '' });
    setSubmissionReceipt(null);
  };

  return (
    <div className="py-10 max-w-7xl mx-auto px-4 sm:px-6 space-y-12 font-mono">
      {/* Header */}
      <div className="border-b border-[#00ff41]/25 pb-6">
        <div className="inline-flex items-center gap-2 text-xs text-[#00e5ff] tracking-widest mb-2">
          <span>// TRANSMISSION_GATEWAY</span>
          <span>::</span>
          <span>ENCRYPTED_ENDPOINT</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-wide">
          CONTACT &amp; <GlitchText text="COMMUNICATIONS" as="span" glow="green" />
        </h1>
        <p className="text-zinc-400 text-xs sm:text-sm mt-2 max-w-3xl">
          Initiate secure communication for internships, collaborative engineering, or security research.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Direct Coordinates & Social Channels */}
        <div className="lg:col-span-5 space-y-6">
          {/* Terminal Connection Status Banner */}
          <div className="p-4 rounded-sm bg-black/90 border border-[#00ff41]/40 shadow-[0_0_15px_rgba(0,255,65,0.15)] space-y-2">
            <div className="flex items-center gap-2 text-[#00ff41] text-xs font-bold">
              <span className="w-2 h-2 rounded-full bg-[#00ff41] animate-ping" />
              <span>&gt; Establishing secure connection...</span>
            </div>
            <p className="text-xs text-zinc-400">
              Protocol: HTTPS / TLS 1.3 | Public Key Fingerprint: 0x8F94...42B1
            </p>
          </div>

          {/* Contact Coordinate Cards with Copy buttons */}
          <div className="space-y-3">
            {/* Email */}
            <div className="p-4 rounded-sm bg-[#0a0f0d] border border-zinc-800 hover:border-[#00ff41]/50 transition-colors flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-black rounded border border-zinc-800 text-[#00ff41]">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-[10px] text-zinc-500 uppercase tracking-wider">DIRECT EMAIL</div>
                  <div className="text-xs text-white font-semibold">{data.personal.email}</div>
                </div>
              </div>

              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => handleCopy(data.personal.email, 'email')}
                  title="Copy email to clipboard"
                  className="p-1.5 rounded bg-zinc-900 border border-zinc-700 hover:text-[#00ff41] text-zinc-400 transition-colors cursor-pointer"
                >
                  {copiedKey === 'email' ? <Check className="w-3.5 h-3.5 text-[#00ff41]" /> : <Copy className="w-3.5 h-3.5 text-zinc-400" />}
                </button>
                <a
                  href={`mailto:${data.personal.email}`}
                  className="p-1.5 rounded bg-zinc-900 border border-zinc-700 hover:text-[#00e5ff] text-zinc-400 transition-colors"
                  title="Open default email client"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

            {/* GitHub */}
            <div className="p-4 rounded-sm bg-[#0a0f0d] border border-zinc-800 hover:border-[#00ff41]/50 transition-colors flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-black rounded border border-zinc-800 text-zinc-300">
                  <Github className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-[10px] text-zinc-500 uppercase tracking-wider">GITHUB REPOSITORIES</div>
                  <div className="text-xs text-white font-semibold">@{data.personal.handle}</div>
                </div>
              </div>

              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => handleCopy(data.personal.github, 'github')}
                  title="Copy GitHub URL"
                  className="p-1.5 rounded bg-zinc-900 border border-zinc-700 hover:text-[#00ff41] text-zinc-400 transition-colors cursor-pointer"
                >
                  {copiedKey === 'github' ? <Check className="w-3.5 h-3.5 text-[#00ff41]" /> : <Copy className="w-3.5 h-3.5 text-zinc-400" />}
                </button>
                <a
                  href={data.personal.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-1.5 rounded bg-zinc-900 border border-zinc-700 hover:text-[#00e5ff] text-zinc-400 transition-colors"
                  title="Open GitHub"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

            {/* LinkedIn */}
            <div className="p-4 rounded-sm bg-[#0a0f0d] border border-zinc-800 hover:border-[#00e5ff]/50 transition-colors flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-black rounded border border-zinc-800 text-[#00e5ff]">
                  <Linkedin className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-[10px] text-zinc-500 uppercase tracking-wider">PROFESSIONAL NETWORK</div>
                  <div className="text-xs text-white font-semibold">LinkedIn Profile</div>
                </div>
              </div>

              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => handleCopy(data.personal.linkedin, 'linkedin')}
                  title="Copy LinkedIn URL"
                  className="p-1.5 rounded bg-zinc-900 border border-zinc-700 hover:text-[#00ff41] text-zinc-400 transition-colors cursor-pointer"
                >
                  {copiedKey === 'linkedin' ? <Check className="w-3.5 h-3.5 text-[#00ff41]" /> : <Copy className="w-3.5 h-3.5 text-zinc-400" />}
                </button>
                <a
                  href={data.personal.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-1.5 rounded bg-zinc-900 border border-zinc-700 hover:text-[#00e5ff] text-zinc-400 transition-colors"
                  title="Open LinkedIn"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

            {/* Availability dossier */}
            <div className="p-4 rounded-sm bg-black/60 border border-zinc-800 space-y-2 text-xs text-zinc-400">
              <div className="text-white font-bold flex items-center gap-2">
                <Shield className="w-3.5 h-3.5 text-[#00ff41]" />
                CURRENT RECRUITMENT STATUS
              </div>
              <p>
                Currently seeking <strong>Software Engineering Internships</strong> and <strong>Junior Cybersecurity Analyst</strong> opportunities.
              </p>
              <div className="text-[11px] text-[#00e5ff]">
                Location: {data.personal.location}
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Transmission Form */}
        <div className="lg:col-span-7">
          <div className="p-6 sm:p-8 rounded-sm bg-[#0a0f0d] border border-zinc-800 shadow-xl relative overflow-hidden">
            {/* Top terminal bar */}
            <div className="flex items-center justify-between pb-4 mb-6 border-b border-zinc-800 text-xs">
              <span className="flex items-center gap-2 text-[#00ff41] font-bold">
                <Terminal className="w-4 h-4 text-[#00ff41]" />
                TRANSMISSION_PAYLOAD_FORM
              </span>
              <span className="text-[10px] text-zinc-500">ENCRYPTION: ENABLED</span>
            </div>

            {submissionReceipt ? (
              /* Success state with cryptographic receipt */
              <div className="space-y-5 animate-in fade-in duration-300">
                <div className="p-5 rounded bg-black border border-[#00ff41]/60 shadow-[0_0_20px_rgba(0,255,65,0.2)] space-y-3">
                  <div className="flex items-center gap-2 text-[#00ff41] font-bold text-sm">
                    <Check className="w-5 h-5 text-[#00ff41]" />
                    <span>&gt; TRANSMISSION PREPARED &amp; VALIDATED</span>
                  </div>

                  <p className="text-xs text-zinc-300 leading-relaxed">
                    Thank you, <strong className="text-white">{submissionReceipt.name}</strong>. Your message payload has been verified against schema constraints.
                  </p>

                  <div className="p-3 bg-zinc-950 border border-zinc-800 rounded font-mono text-xs space-y-1 text-zinc-400">
                    <div>
                      <span className="text-zinc-600">TIMESTAMP: </span>
                      <span className="text-zinc-300">{submissionReceipt.timestamp}</span>
                    </div>
                    <div>
                      <span className="text-zinc-600">CHECKSUM: </span>
                      <span className="text-[#00e5ff]">{submissionReceipt.checksum}</span>
                    </div>
                    <div>
                      <span className="text-zinc-600">REPLY_TO: </span>
                      <span className="text-zinc-300">{submissionReceipt.email}</span>
                    </div>
                    <div>
                      <span className="text-zinc-600">SUBJECT: </span>
                      <span className="text-zinc-300">{submissionReceipt.subject}</span>
                    </div>
                  </div>

                  <div className="text-[11px] text-zinc-400 border-l-2 border-[#00ff41] pl-3 py-1">
                    <em>Notice:</em> As this portfolio runs in prototype client mode, you can also dispatch this directly to{' '}
                    <a
                      href={`mailto:${data.personal.email}?subject=${encodeURIComponent(
                        submissionReceipt.subject
                      )}&body=${encodeURIComponent(form.message)}`}
                      className="text-[#00ff41] underline font-semibold"
                    >
                      {data.personal.email}
                    </a>
                  </div>
                </div>

                <div className="flex justify-between items-center pt-2">
                  <button
                    onClick={handleResetForm}
                    className="px-4 py-2 text-xs bg-zinc-900 border border-zinc-700 text-zinc-300 hover:text-white rounded cursor-pointer"
                  >
                    &lt; Send Another Message
                  </button>

                  <a
                    href={`mailto:${data.personal.email}?subject=${encodeURIComponent(
                      submissionReceipt.subject
                    )}&body=${encodeURIComponent(form.message)}`}
                    className="px-4 py-2 text-xs bg-[#00ff41] text-black font-bold rounded shadow-[0_0_15px_rgba(0,255,65,0.4)] flex items-center gap-1.5"
                  >
                    <Mail className="w-3.5 h-3.5" /> Dispatch via Email App
                  </a>
                </div>
              </div>
            ) : (
              /* Input Form */
              <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Name field */}
                  <div>
                    <label className="block text-zinc-300 font-semibold mb-1">
                      Identity / Name <span className="text-[#00ff41]">*</span>
                    </label>
                    <input
                      type="text"
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      placeholder="e.g. Alex Carter"
                      className={`w-full bg-black border px-3 py-2 text-white rounded outline-hidden transition-colors ${
                        errors.name ? 'border-red-500' : 'border-zinc-800 focus:border-[#00ff41]'
                      }`}
                    />
                    {errors.name && (
                      <p className="text-red-400 text-[11px] mt-1 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" /> {errors.name}
                      </p>
                    )}
                  </div>

                  {/* Email field */}
                  <div>
                    <label className="block text-zinc-300 font-semibold mb-1">
                      Transmission Email <span className="text-[#00ff41]">*</span>
                    </label>
                    <input
                      type="email"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      placeholder="e.g. alex@company.com"
                      className={`w-full bg-black border px-3 py-2 text-white rounded outline-hidden transition-colors ${
                        errors.email ? 'border-red-500' : 'border-zinc-800 focus:border-[#00ff41]'
                      }`}
                    />
                    {errors.email && (
                      <p className="text-red-400 text-[11px] mt-1 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" /> {errors.email}
                      </p>
                    )}
                  </div>
                </div>

                {/* Subject field */}
                <div>
                  <label className="block text-zinc-300 font-semibold mb-1">
                    Subject Line <span className="text-[#00ff41]">*</span>
                  </label>
                  <input
                    type="text"
                    value={form.subject}
                    onChange={(e) => setForm({ ...form, subject: e.target.value })}
                    placeholder="e.g. Internship Opportunity / Security Inquiry"
                    className={`w-full bg-black border px-3 py-2 text-white rounded outline-hidden transition-colors ${
                      errors.subject ? 'border-red-500' : 'border-zinc-800 focus:border-[#00ff41]'
                    }`}
                  />
                  {errors.subject && (
                    <p className="text-red-400 text-[11px] mt-1 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" /> {errors.subject}
                    </p>
                  )}
                </div>

                {/* Message field */}
                <div>
                  <label className="block text-zinc-300 font-semibold mb-1">
                    Message Payload <span className="text-[#00ff41]">*</span>
                  </label>
                  <textarea
                    rows={5}
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    placeholder="Enter message details, role description, or inquiry..."
                    className={`w-full bg-black border px-3 py-2 text-white rounded outline-hidden transition-colors ${
                      errors.message ? 'border-red-500' : 'border-zinc-800 focus:border-[#00ff41]'
                    }`}
                  />
                  {errors.message && (
                    <p className="text-red-400 text-[11px] mt-1 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" /> {errors.message}
                    </p>
                  )}
                </div>

                {/* Submit button */}
                <div className="pt-2 flex justify-end">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="px-6 py-2.5 bg-[#00ff41] text-black font-bold rounded shadow-[0_0_20px_rgba(0,255,65,0.4)] hover:bg-[#33ff66] transition-all flex items-center gap-2 cursor-pointer disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <>
                        <span className="w-3.5 h-3.5 border-2 border-black border-t-transparent rounded-full animate-spin" />
                        <span>TRANSMITTING...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>TRANSMIT PAYLOAD</span>
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
