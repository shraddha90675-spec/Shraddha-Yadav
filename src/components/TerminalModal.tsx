/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Terminal, X, CornerDownLeft, Maximize2, Minimize2, Trash2, HelpCircle } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';
import { executeTerminalCommand, TerminalOutputItem } from '../utils/terminalLogic';
import { cyberAudio } from '../utils/audio';

export const TerminalModal: React.FC = () => {
  const {
    data,
    isTerminalOpen,
    setIsTerminalOpen,
    pendingExternalCommand,
    clearPendingCommand,
    toggleMatrixRain
  } = usePortfolio();

  const navigate = useNavigate();

  const [input, setInput] = useState('');
  const [history, setHistory] = useState<TerminalOutputItem[]>([
    { type: 'system', text: 'CYBER_CLI v2.4 (x86_64-pc-linux-gnu)' },
    { type: 'system', text: 'Type "help" for a list of commands or click suggestion chips below.' },
    { type: 'output', text: `Session initialized for root@portfolio` }
  ]);
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState<number>(-1);
  const [isMaximized, setIsMaximized] = useState(false);

  const bottomRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  // Auto scroll
  useEffect(() => {
    if (isTerminalOpen) {
      bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
      inputRef.current?.focus();
    }
  }, [history, isTerminalOpen]);

  // Handle external triggers (e.g. from page buttons)
  useEffect(() => {
    if (pendingExternalCommand && isTerminalOpen) {
      runCommand(pendingExternalCommand);
      clearPendingCommand();
    }
  }, [pendingExternalCommand, isTerminalOpen]);

  const runCommand = (cmdText: string) => {
    const trimmed = cmdText.trim();
    if (!trimmed) return;

    cyberAudio.playCommandExecute();

    const newHistory: TerminalOutputItem[] = [
      ...history,
      { type: 'input', text: `root@portfolio:~$ ${trimmed}` }
    ];

    setCommandHistory((prev) => [...prev, trimmed]);
    setHistoryIndex(-1);

    const result = executeTerminalCommand(trimmed, data);

    if (result.action === 'clear') {
      setHistory([]);
      setInput('');
      return;
    }

    if (result.action === 'toggle-matrix') {
      toggleMatrixRain();
    }

    if (result.action === 'navigate' && result.targetPath) {
      navigate(result.targetPath);
      setIsTerminalOpen(false);
    }

    setHistory([...newHistory, ...result.output]);
    setInput('');
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    cyberAudio.playKeyClick();

    if (e.key === 'Enter') {
      e.preventDefault();
      runCommand(input);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (commandHistory.length === 0) return;
      const nextIndex = historyIndex === -1 ? commandHistory.length - 1 : Math.max(0, historyIndex - 1);
      setHistoryIndex(nextIndex);
      setInput(commandHistory[nextIndex]);
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex === -1) return;
      const nextIndex = historyIndex + 1;
      if (nextIndex >= commandHistory.length) {
        setHistoryIndex(-1);
        setInput('');
      } else {
        setHistoryIndex(nextIndex);
        setInput(commandHistory[nextIndex]);
      }
    }
  };

  if (!isTerminalOpen) return null;

  const quickCommands = ['help', 'whoami', 'skills', 'projects', 'resume', 'contact', 'sysinfo', 'clear'];

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Interactive Terminal CLI"
      className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/75 backdrop-blur-sm"
    >
      <div
        className={`w-full flex flex-col bg-[#050806] border border-[#00ff41]/50 shadow-[0_0_40px_rgba(0,255,65,0.25)] rounded-sm overflow-hidden transition-all duration-200 ${
          isMaximized ? 'h-[96vh] max-w-[96vw]' : 'h-[600px] max-w-3xl'
        }`}
      >
        {/* Terminal Header */}
        <div className="flex items-center justify-between px-4 py-2.5 bg-black/90 border-b border-[#00ff41]/30 select-none">
          <div className="flex items-center gap-2 text-xs font-bold text-[#00ff41] tracking-wider">
            <Terminal className="w-4 h-4 text-[#00ff41]" />
            <span>root@portfolio: /bin/zsh</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => runCommand('clear')}
              title="Clear Terminal"
              aria-label="Clear Terminal"
              className="p-1 text-zinc-400 hover:text-[#00ff41] transition-colors"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>

            <button
              onClick={() => setIsMaximized((prev) => !prev)}
              title={isMaximized ? 'Restore' : 'Maximize'}
              aria-label={isMaximized ? 'Restore Terminal' : 'Maximize Terminal'}
              className="p-1 text-zinc-400 hover:text-[#00e5ff] transition-colors"
            >
              {isMaximized ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
            </button>

            <button
              onClick={() => setIsTerminalOpen(false)}
              title="Close Terminal"
              aria-label="Close Terminal"
              className="p-1 text-zinc-400 hover:text-red-400 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Quick Suggestion Chips */}
        <div className="flex items-center gap-1.5 px-4 py-1.5 bg-zinc-950/80 border-b border-zinc-900 overflow-x-auto text-xs scrollbar-none">
          <span className="text-zinc-500 text-[10px] uppercase tracking-wider flex items-center gap-1 mr-1">
            <HelpCircle className="w-3 h-3 text-[#00e5ff]" /> Quick:
          </span>
          {quickCommands.map((cmd) => (
            <button
              key={cmd}
              onClick={() => runCommand(cmd)}
              className="px-2 py-0.5 text-[11px] rounded bg-zinc-900 text-[#00ff41] hover:bg-[#00ff41]/20 border border-[#00ff41]/20 transition-all cursor-pointer whitespace-nowrap"
            >
              {cmd}
            </button>
          ))}
        </div>

        {/* Terminal Body */}
        <div
          onClick={() => inputRef.current?.focus()}
          className="flex-1 p-4 overflow-y-auto font-mono text-xs md:text-sm space-y-1.5 cursor-text text-zinc-200"
        >
          {history.map((item, idx) => {
            if (item.type === 'input') {
              return (
                <div key={idx} className="text-[#00e5ff] font-semibold flex items-center gap-1">
                  <span>{item.text}</span>
                </div>
              );
            }
            if (item.type === 'system') {
              return (
                <div key={idx} className="text-zinc-500 font-mono text-xs">
                  {item.text}
                </div>
              );
            }
            if (item.type === 'error') {
              return (
                <div key={idx} className="text-red-400 bg-red-950/30 p-1 rounded border-l-2 border-red-500">
                  {item.text}
                </div>
              );
            }
            if (item.type === 'success') {
              return (
                <div key={idx} className="text-[#00ff41] font-semibold">
                  {item.text}
                </div>
              );
            }
            return (
              <div key={idx} className="text-zinc-300 whitespace-pre-wrap">
                {item.text}
              </div>
            );
          })}

          {/* Active Command Input Line */}
          <div className="flex items-center gap-2 pt-2 text-[#00ff41]">
            <span className="font-bold select-none text-xs sm:text-sm text-[#00ff41]">
              root@portfolio:~$
            </span>
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              aria-label="Terminal command input"
              autoFocus
              className="flex-1 bg-transparent border-none outline-hidden text-[#00ff41] font-mono text-xs sm:text-sm focus:ring-0 p-0"
              placeholder="type a command ('help')..."
            />
            <button
              onClick={() => runCommand(input)}
              className="text-zinc-400 hover:text-[#00ff41] p-1"
              aria-label="Execute command"
            >
              <CornerDownLeft className="w-3.5 h-3.5" />
            </button>
          </div>

          <div ref={bottomRef} />
        </div>

        {/* Footer info */}
        <div className="px-4 py-1.5 bg-black text-[10px] text-zinc-500 flex justify-between border-t border-zinc-900">
          <span>UP/DOWN: History | TAB: Focus</span>
          <span className="text-[#00ff41]">STATUS: 200_OK</span>
        </div>
      </div>
    </div>
  );
};
