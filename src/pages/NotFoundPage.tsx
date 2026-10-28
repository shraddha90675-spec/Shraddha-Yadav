/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Link } from 'react-router-dom';
import { AlertTriangle, Terminal, Home, ArrowLeft } from 'lucide-react';
import { GlitchText } from '../components/GlitchText';
import { cyberAudio } from '../utils/audio';

export const NotFoundPage: React.FC = () => {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center p-6 text-center font-mono">
      <div className="max-w-lg w-full bg-[#0a0f0d] border border-red-500/50 p-6 sm:p-8 rounded-sm shadow-[0_0_35px_rgba(239,68,68,0.2)] space-y-6">
        <div className="flex items-center justify-between text-xs text-red-400 border-b border-red-950 pb-3">
          <span className="flex items-center gap-1.5 font-bold">
            <AlertTriangle className="w-4 h-4 text-red-500" />
            KERNEL_EXCEPTION // 0x404
          </span>
          <span>STATUS: HALTED</span>
        </div>

        <div className="space-y-2">
          <h1 className="text-4xl sm:text-6xl font-extrabold text-red-500 tracking-wider">
            404
          </h1>
          <div className="text-lg font-bold text-white">
            <GlitchText text="PAGE_NOT_FOUND // ACCESS_DENIED" as="span" glow="none" />
          </div>
        </div>

        <div className="p-4 bg-black border border-zinc-800 rounded text-left text-xs text-zinc-400 space-y-1.5">
          <p className="text-red-400">&gt; ERROR: The requested memory address or URL route does not exist.</p>
          <p className="text-zinc-500">&gt; IP TRACE: Logged to defensive intrusion perimeter.</p>
          <p className="text-[#00ff41]">&gt; RECOMMENDATION: Fallback to root system directory.</p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <Link
            to="/"
            onClick={() => cyberAudio.playCommandExecute()}
            className="w-full sm:w-auto px-6 py-2.5 bg-[#00ff41] text-black font-bold text-xs rounded shadow-[0_0_15px_rgba(0,255,65,0.4)] hover:bg-[#33ff66] transition-all flex items-center justify-center gap-2"
          >
            <Home className="w-4 h-4" />
            <span>RETURN TO SAFE ZONE (HOME)</span>
          </Link>
        </div>
      </div>
    </div>
  );
};
