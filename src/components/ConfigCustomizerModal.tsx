/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { X, Sliders, RotateCcw, Check, User, Mail, Github, Linkedin, Shield } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';
import { cyberAudio } from '../utils/audio';

export const ConfigCustomizerModal: React.FC = () => {
  const { data, updateData, resetData, isCustomizerOpen, setIsCustomizerOpen } = usePortfolio();

  const [name, setName] = useState(data.personal.name);
  const [handle, setHandle] = useState(data.personal.handle);
  const [title, setTitle] = useState(data.personal.title);
  const [email, setEmail] = useState(data.personal.email);
  const [github, setGithub] = useState(data.personal.github);
  const [linkedin, setLinkedin] = useState(data.personal.linkedin);
  const [location, setLocation] = useState(data.personal.location);
  const [bio, setBio] = useState(data.personal.bio);
  const [savedToast, setSavedToast] = useState(false);

  if (!isCustomizerOpen) return null;

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateData({
      personal: {
        ...data.personal,
        name,
        handle,
        title,
        email,
        github,
        linkedin,
        location,
        bio
      }
    });

    cyberAudio.playSuccess();
    setSavedToast(true);
    setTimeout(() => {
      setSavedToast(false);
      setIsCustomizerOpen(false);
    }, 900);
  };

  const handleReset = () => {
    if (confirm('Reset portfolio details to original defaults?')) {
      resetData();
      setName(data.personal.name);
      setHandle(data.personal.handle);
      setTitle(data.personal.title);
      setEmail(data.personal.email);
      setGithub(data.personal.github);
      setLinkedin(data.personal.linkedin);
      setLocation(data.personal.location);
      setBio(data.personal.bio);
      cyberAudio.playCommandExecute();
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Portfolio Configuration Customizer"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-sm"
    >
      <div className="w-full max-w-xl bg-[#0a0f0d] border border-[#00ff41]/50 shadow-[0_0_35px_rgba(0,255,65,0.25)] rounded-sm overflow-hidden text-zinc-200">
        <div className="flex items-center justify-between px-5 py-3.5 bg-black border-b border-[#00ff41]/30">
          <div className="flex items-center gap-2 text-sm font-bold text-[#00ff41]">
            <Sliders className="w-4 h-4 text-[#00ff41]" />
            <span>PORTFOLIO_CONFIG_OVERRIDE</span>
          </div>
          <button
            onClick={() => setIsCustomizerOpen(false)}
            className="text-zinc-400 hover:text-white p-1"
            aria-label="Close customizer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <form onSubmit={handleSave} className="p-5 space-y-4 max-h-[75vh] overflow-y-auto">
          <p className="text-xs text-zinc-400">
            Edit your personal details live. You can also edit code directly in{' '}
            <code className="text-[#00e5ff] bg-black/60 px-1 py-0.5 rounded">src/data/portfolioData.ts</code>.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-zinc-400 mb-1 flex items-center gap-1.5">
                <User className="w-3.5 h-3.5 text-[#00ff41]" /> Full Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-black/80 border border-zinc-700 focus:border-[#00ff41] px-3 py-1.5 text-xs text-white rounded outline-hidden"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-zinc-400 mb-1 flex items-center gap-1.5">
                <Shield className="w-3.5 h-3.5 text-[#00e5ff]" /> Terminal Handle
              </label>
              <input
                type="text"
                value={handle}
                onChange={(e) => setHandle(e.target.value)}
                className="w-full bg-black/80 border border-zinc-700 focus:border-[#00ff41] px-3 py-1.5 text-xs text-white rounded outline-hidden"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-zinc-400 mb-1">
              Professional Title
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full bg-black/80 border border-zinc-700 focus:border-[#00ff41] px-3 py-1.5 text-xs text-white rounded outline-hidden"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-zinc-400 mb-1 flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5 text-[#00ff41]" /> Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-black/80 border border-zinc-700 focus:border-[#00ff41] px-3 py-1.5 text-xs text-white rounded outline-hidden"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-zinc-400 mb-1">
                Location
              </label>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full bg-black/80 border border-zinc-700 focus:border-[#00ff41] px-3 py-1.5 text-xs text-white rounded outline-hidden"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-zinc-400 mb-1 flex items-center gap-1.5">
                <Github className="w-3.5 h-3.5 text-zinc-300" /> GitHub URL
              </label>
              <input
                type="text"
                value={github}
                onChange={(e) => setGithub(e.target.value)}
                className="w-full bg-black/80 border border-zinc-700 focus:border-[#00ff41] px-3 py-1.5 text-xs text-white rounded outline-hidden"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-zinc-400 mb-1 flex items-center gap-1.5">
                <Linkedin className="w-3.5 h-3.5 text-[#00e5ff]" /> LinkedIn URL
              </label>
              <input
                type="text"
                value={linkedin}
                onChange={(e) => setLinkedin(e.target.value)}
                className="w-full bg-black/80 border border-zinc-700 focus:border-[#00ff41] px-3 py-1.5 text-xs text-white rounded outline-hidden"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-zinc-400 mb-1">
              Short Introduction / Bio
            </label>
            <textarea
              rows={3}
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              className="w-full bg-black/80 border border-zinc-700 focus:border-[#00ff41] px-3 py-1.5 text-xs text-white rounded outline-hidden"
            />
          </div>

          {savedToast && (
            <div className="p-2 bg-[#00ff41]/20 border border-[#00ff41] text-[#00ff41] text-xs flex items-center gap-2 rounded">
              <Check className="w-4 h-4" /> Changes successfully committed to runtime state!
            </div>
          )}

          <div className="flex items-center justify-between pt-3 border-t border-zinc-800">
            <button
              type="button"
              onClick={handleReset}
              className="flex items-center gap-1.5 text-xs text-zinc-400 hover:text-white px-3 py-1.5 rounded hover:bg-zinc-800 transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" /> Reset Defaults
            </button>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setIsCustomizerOpen(false)}
                className="text-xs text-zinc-400 hover:text-white px-3 py-1.5 rounded hover:bg-zinc-800"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex items-center gap-1.5 bg-[#00ff41] text-black font-bold text-xs px-4 py-1.5 rounded shadow-[0_0_15px_rgba(0,255,65,0.4)] hover:bg-[#33ff66] transition-all cursor-pointer"
              >
                <Check className="w-3.5 h-3.5" /> Save Changes
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
