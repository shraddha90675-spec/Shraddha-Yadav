/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import {
  Terminal,
  Volume2,
  VolumeX,
  Sun,
  Moon,
  Tv,
  Binary,
  Settings,
  Menu,
  X,
  ShieldCheck
} from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';
import { cyberAudio } from '../utils/audio';

export const Navbar: React.FC = () => {
  const {
    data,
    theme,
    toggleTheme,
    matrixRainActive,
    toggleMatrixRain,
    scanlinesActive,
    toggleScanlines,
    soundEnabled,
    toggleSound,
    setIsTerminalOpen,
    setIsCustomizerOpen
  } = usePortfolio();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { path: '/', label: 'HOME', num: '01' },
    { path: '/about', label: 'ABOUT', num: '02' },
    { path: '/skills', label: 'SKILLS', num: '03' },
    { path: '/projects', label: 'PROJECTS', num: '04' },
    { path: '/certificates', label: 'CERTS', num: '05' },
    { path: '/resume', label: 'RESUME', num: '06' },
    { path: '/contact', label: 'CONTACT', num: '07' }
  ];

  const handleNavClick = () => {
    cyberAudio.playKeyClick();
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-[#050806]/90 backdrop-blur-md border-b border-[#00ff41]/25 select-none">
      {/* Top Telemetry strip */}
      <div className="hidden md:flex items-center justify-between px-4 py-1 text-[11px] bg-black/80 border-b border-zinc-900 text-zinc-400 font-mono">
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1.5 text-[#00ff41]">
            <ShieldCheck className="w-3.5 h-3.5 text-[#00ff41]" />
            SECURE_SHELL://ACTIVE
          </span>
          <span className="text-zinc-600">|</span>
          <span className="text-zinc-300">USER: {data.personal.handle}</span>
          <span className="text-zinc-600">|</span>
          <span className="text-[#00e5ff]">DEFENSE: 100% OK</span>
        </div>

        <div className="flex items-center gap-4">
          <span className="text-zinc-400">STATUS: {data.personal.status}</span>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between h-14 md:h-16">
        {/* Brand */}
        <Link
          to="/"
          onClick={() => cyberAudio.playKeyClick()}
          className="flex items-center gap-2 group cursor-pointer"
        >
          <div className="w-8 h-8 rounded bg-black border border-[#00ff41]/60 flex items-center justify-center text-[#00ff41] group-hover:border-[#00ff41] group-hover:shadow-[0_0_12px_rgba(0,255,65,0.6)] transition-all">
            <span className="font-bold text-sm">&gt;_</span>
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-sm sm:text-base tracking-wider text-white group-hover:text-[#00ff41] transition-colors">
              CYBER<span className="text-[#00ff41]">PORTFOLIO</span>
            </span>
            <span className="text-[10px] text-zinc-500 tracking-widest hidden sm:inline">
              SYS.SEC.V2
            </span>
          </div>
        </Link>

        {/* Desktop Nav Links */}
        <nav className="hidden lg:flex items-center space-x-1" aria-label="Main Navigation">
          {navLinks.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              onClick={() => cyberAudio.playKeyClick()}
              className={({ isActive }) =>
                `px-3 py-1.5 text-xs font-mono tracking-wider transition-all rounded-xs flex items-center gap-1 ${
                  isActive
                    ? 'text-[#00ff41] bg-[#00ff41]/10 border border-[#00ff41]/60 shadow-[0_0_10px_rgba(0,255,65,0.25)] font-semibold'
                    : 'text-zinc-400 hover:text-white hover:bg-zinc-900/60'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <span className={`text-[10px] ${isActive ? 'text-[#00e5ff]' : 'text-zinc-600'}`}>
                    [{link.num}]
                  </span>
                  <span>{link.label}</span>
                </>
              )}
            </NavLink>
          ))}
        </nav>

        {/* Control Switches & Terminal launcher */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          {/* Quick Terminal Button */}
          <button
            onClick={() => {
              cyberAudio.playCommandExecute();
              setIsTerminalOpen(true);
            }}
            title="Open Interactive Terminal (CLI)"
            aria-label="Open Interactive Terminal"
            className="px-2.5 py-1 text-xs border border-[#00ff41]/60 bg-black/80 text-[#00ff41] hover:bg-[#00ff41] hover:text-black font-bold transition-all shadow-[0_0_10px_rgba(0,255,65,0.2)] flex items-center gap-1.5 cursor-pointer rounded-xs"
          >
            <Terminal className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">CLI</span>
          </button>

          {/* Matrix toggle */}
          <button
            onClick={toggleMatrixRain}
            title={`Toggle Matrix Rain (${matrixRainActive ? 'Active' : 'Off'})`}
            aria-label="Toggle Matrix Falling Code"
            className={`p-1.5 rounded-xs border transition-colors cursor-pointer ${
              matrixRainActive
                ? 'border-[#00ff41]/50 text-[#00ff41] bg-[#00ff41]/10'
                : 'border-zinc-800 text-zinc-600 hover:text-zinc-400'
            }`}
          >
            <Binary className="w-3.5 h-3.5" />
          </button>

          {/* Scanlines toggle */}
          <button
            onClick={toggleScanlines}
            title={`Toggle CRT Scanlines (${scanlinesActive ? 'Active' : 'Off'})`}
            aria-label="Toggle CRT Scanlines"
            className={`p-1.5 rounded-xs border transition-colors cursor-pointer ${
              scanlinesActive
                ? 'border-[#00e5ff]/50 text-[#00e5ff] bg-[#00e5ff]/10'
                : 'border-zinc-800 text-zinc-600 hover:text-zinc-400'
            }`}
          >
            <Tv className="w-3.5 h-3.5" />
          </button>

          {/* Audio toggle */}
          <button
            onClick={toggleSound}
            title={`Toggle Cyber Audio Effects (${soundEnabled ? 'Enabled' : 'Muted'})`}
            aria-label="Toggle Audio Sound Effects"
            className={`p-1.5 rounded-xs border transition-colors cursor-pointer ${
              soundEnabled
                ? 'border-[#00ff41]/50 text-[#00ff41] bg-[#00ff41]/10'
                : 'border-zinc-800 text-zinc-600 hover:text-zinc-400'
            }`}
          >
            {soundEnabled ? <Volume2 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5" />}
          </button>

          {/* Theme toggle */}
          <button
            onClick={toggleTheme}
            title={`Switch to ${theme === 'dark' ? 'Light Stealth Mode' : 'Hacker Dark Mode'}`}
            aria-label="Toggle Theme"
            className="p-1.5 rounded-xs border border-zinc-800 text-zinc-400 hover:text-white hover:border-[#00ff41]/50 transition-colors cursor-pointer"
          >
            {theme === 'dark' ? <Sun className="w-3.5 h-3.5 text-yellow-400" /> : <Moon className="w-3.5 h-3.5 text-cyan-400" />}
          </button>

          {/* Live Config Customizer trigger */}
          <button
            onClick={() => {
              cyberAudio.playKeyClick();
              setIsCustomizerOpen(true);
            }}
            title="Edit Portfolio Profile Data"
            aria-label="Customize Portfolio Data"
            className="p-1.5 rounded-xs border border-zinc-800 text-zinc-400 hover:text-[#00ff41] hover:border-[#00ff41]/50 transition-colors cursor-pointer"
          >
            <Settings className="w-3.5 h-3.5" />
          </button>

          {/* Mobile Hamburger toggle */}
          <button
            onClick={() => {
              cyberAudio.playKeyClick();
              setMobileMenuOpen(!mobileMenuOpen);
            }}
            aria-expanded={mobileMenuOpen}
            aria-label="Toggle Mobile Menu"
            className="lg:hidden p-1.5 text-zinc-300 hover:text-[#00ff41] border border-zinc-800 rounded-xs"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div
          role="navigation"
          aria-label="Mobile Navigation"
          className="lg:hidden bg-[#050806]/98 border-b border-[#00ff41]/30 p-4 space-y-2 backdrop-blur-xl animate-in slide-in-from-top-4 duration-200"
        >
          <div className="text-[10px] text-zinc-500 font-mono pb-1 border-b border-zinc-900 flex justify-between">
            <span>TERMINAL ROUTING DIRECTORY</span>
            <span className="text-[#00ff41]">ONLINE</span>
          </div>

          <div className="grid grid-cols-2 gap-2 pt-2">
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                onClick={handleNavClick}
                className={({ isActive }) =>
                  `px-3 py-2 text-xs font-mono tracking-wider rounded border transition-all flex items-center justify-between ${
                    isActive
                      ? 'text-[#00ff41] bg-[#00ff41]/10 border-[#00ff41] shadow-[0_0_8px_rgba(0,255,65,0.3)] font-bold'
                      : 'text-zinc-300 border-zinc-800/80 hover:bg-zinc-900/60 hover:border-zinc-700'
                  }`
                }
              >
                <span>{link.label}</span>
                <span className="text-[10px] text-zinc-500">/{link.num}</span>
              </NavLink>
            ))}
          </div>

          <div className="pt-3 border-t border-zinc-900 flex items-center justify-between text-xs text-zinc-400">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                setIsTerminalOpen(true);
              }}
              className="flex items-center gap-1.5 text-[#00ff41] font-bold"
            >
              <Terminal className="w-3.5 h-3.5" /> Launch Terminal CLI
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                setIsCustomizerOpen(true);
              }}
              className="flex items-center gap-1.5 text-zinc-300 hover:text-white"
            >
              <Settings className="w-3.5 h-3.5" /> Edit Info
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
