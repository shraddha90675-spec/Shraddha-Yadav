/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { PortfolioProvider, usePortfolio } from './context/PortfolioContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { MatrixBackground } from './components/MatrixBackground';
import { TerminalModal } from './components/TerminalModal';
import { ConfigCustomizerModal } from './components/ConfigCustomizerModal';
import { InitializingScreen } from './components/InitializingScreen';

import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { SkillsPage } from './pages/SkillsPage';
import { ProjectsPage } from './pages/ProjectsPage';
import { CertificatesPage } from './pages/CertificatesPage';
import { ResumePage } from './pages/ResumePage';
import { ContactPage } from './pages/ContactPage';
import { NotFoundPage } from './pages/NotFoundPage';

// Scroll to top upon route change
const ScrollToTop: React.FC = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const PortfolioAppContent: React.FC = () => {
  const { scanlinesActive, setIsTerminalOpen } = usePortfolio();
  const [isInitializing, setIsInitializing] = useState(true);

  // Global keyboard shortcut to open terminal (Backtick ` or Ctrl+~)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey && e.key === '`') || (e.key === '`' && !['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement).tagName))) {
        e.preventDefault();
        setIsTerminalOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [setIsTerminalOpen]);

  return (
    <div className="relative min-h-screen bg-[#050806] text-white flex flex-col font-mono selection:bg-[#00ff41] selection:text-black">
      {/* Boot Loading sequence on first mount */}
      {isInitializing && (
        <InitializingScreen onComplete={() => setIsInitializing(false)} />
      )}

      {/* Matrix rain canvas background */}
      <MatrixBackground />

      {/* Cyber Digital Grid Background */}
      <div className="fixed inset-0 cyber-grid pointer-events-none z-0 opacity-60" />

      {/* Scanline CRT overlay */}
      {scanlinesActive && (
        <div className="fixed inset-0 scanlines-overlay pointer-events-none z-30" />
      )}

      {/* Top Navigation */}
      <Navbar />

      {/* Main Page Route View */}
      <main className="flex-1 relative z-10">
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/skills" element={<SkillsPage />} />
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="/certificates" element={<CertificatesPage />} />
          <Route path="/resume" element={<ResumePage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>

      {/* Footer */}
      <Footer />

      {/* Global Interactive Terminal Modal */}
      <TerminalModal />

      {/* Global Configuration Customizer Modal */}
      <ConfigCustomizerModal />
    </div>
  );
};

export default function App() {
  return (
    <PortfolioProvider>
      <BrowserRouter>
        <PortfolioAppContent />
      </BrowserRouter>
    </PortfolioProvider>
  );
}
