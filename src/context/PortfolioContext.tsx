/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { createContext, useContext, useState, useEffect } from 'react';
import { PortfolioConfig, initialPortfolioData } from '../data/portfolioData';
import { cyberAudio } from '../utils/audio';

interface PortfolioContextType {
  data: PortfolioConfig;
  updateData: (newData: Partial<PortfolioConfig>) => void;
  resetData: () => void;
  theme: 'dark' | 'light';
  toggleTheme: () => void;
  matrixRainActive: boolean;
  toggleMatrixRain: () => void;
  scanlinesActive: boolean;
  toggleScanlines: () => void;
  soundEnabled: boolean;
  toggleSound: () => void;
  isTerminalOpen: boolean;
  setIsTerminalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isCustomizerOpen: boolean;
  setIsCustomizerOpen: React.Dispatch<React.SetStateAction<boolean>>;
  executeTerminalExternal: (cmd: string) => void;
  pendingExternalCommand: string | null;
  clearPendingCommand: () => void;
}

const STORAGE_KEY = 'cyber_portfolio_data_v1';
const THEME_KEY = 'cyber_portfolio_theme';
const MATRIX_KEY = 'cyber_portfolio_matrix';
const SCANLINES_KEY = 'cyber_portfolio_scanlines';
const SOUND_KEY = 'cyber_portfolio_sound';

const PortfolioContext = createContext<PortfolioContextType | undefined>(undefined);

export const PortfolioProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [data, setData] = useState<PortfolioConfig>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch {
      // localStorage error fallback
    }
    return initialPortfolioData;
  });

  const [theme, setTheme] = useState<'dark' | 'light'>(() => {
    try {
      const saved = localStorage.getItem(THEME_KEY);
      if (saved === 'light' || saved === 'dark') return saved;
    } catch {
      // fallback
    }
    return 'dark'; // Hacker dark mode by default
  });

  const [matrixRainActive, setMatrixRainActive] = useState<boolean>(() => {
    try {
      const saved = localStorage.getItem(MATRIX_KEY);
      if (saved !== null) return saved === 'true';
    } catch {
      // fallback
    }
    return true;
  });

  const [scanlinesActive, setScanlinesActive] = useState<boolean>(() => {
    try {
      const saved = localStorage.getItem(SCANLINES_KEY);
      if (saved !== null) return saved === 'true';
    } catch {
      // fallback
    }
    return true;
  });

  const [soundEnabled, setSoundEnabled] = useState<boolean>(() => {
    try {
      const saved = localStorage.getItem(SOUND_KEY);
      if (saved !== null) return saved === 'true';
    } catch {
      // fallback
    }
    return false;
  });

  const [isTerminalOpen, setIsTerminalOpen] = useState(false);
  const [isCustomizerOpen, setIsCustomizerOpen] = useState(false);
  const [pendingExternalCommand, setPendingExternalCommand] = useState<string | null>(null);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch {
      // fallback
    }
  }, [data]);

  useEffect(() => {
    try {
      localStorage.setItem(THEME_KEY, theme);
    } catch {
      // fallback
    }
    if (theme === 'light') {
      document.documentElement.classList.add('theme-light');
      document.documentElement.classList.remove('theme-dark');
    } else {
      document.documentElement.classList.add('theme-dark');
      document.documentElement.classList.remove('theme-light');
    }
  }, [theme]);

  useEffect(() => {
    try {
      localStorage.setItem(MATRIX_KEY, String(matrixRainActive));
    } catch {
      // fallback
    }
  }, [matrixRainActive]);

  useEffect(() => {
    try {
      localStorage.setItem(SCANLINES_KEY, String(scanlinesActive));
    } catch {
      // fallback
    }
  }, [scanlinesActive]);

  useEffect(() => {
    cyberAudio.enabled = soundEnabled;
    try {
      localStorage.setItem(SOUND_KEY, String(soundEnabled));
    } catch {
      // fallback
    }
  }, [soundEnabled]);

  const updateData = (newData: Partial<PortfolioConfig>) => {
    setData((prev) => ({
      ...prev,
      ...newData
    }));
  };

  const resetData = () => {
    setData(initialPortfolioData);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      // fallback
    }
  };

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
    cyberAudio.playCommandExecute();
  };

  const toggleMatrixRain = () => {
    setMatrixRainActive((prev) => !prev);
    cyberAudio.playKeyClick();
  };

  const toggleScanlines = () => {
    setScanlinesActive((prev) => !prev);
    cyberAudio.playKeyClick();
  };

  const toggleSound = () => {
    setSoundEnabled((prev) => {
      const next = !prev;
      cyberAudio.enabled = next;
      if (next) cyberAudio.playSuccess();
      return next;
    });
  };

  const executeTerminalExternal = (cmd: string) => {
    setPendingExternalCommand(cmd);
    setIsTerminalOpen(true);
    cyberAudio.playCommandExecute();
  };

  const clearPendingCommand = () => {
    setPendingExternalCommand(null);
  };

  return (
    <PortfolioContext.Provider
      value={{
        data,
        updateData,
        resetData,
        theme,
        toggleTheme,
        matrixRainActive,
        toggleMatrixRain,
        scanlinesActive,
        toggleScanlines,
        soundEnabled,
        toggleSound,
        isTerminalOpen,
        setIsTerminalOpen,
        isCustomizerOpen,
        setIsCustomizerOpen,
        executeTerminalExternal,
        pendingExternalCommand,
        clearPendingCommand
      }}
    >
      {children}
    </PortfolioContext.Provider>
  );
};

export const usePortfolio = () => {
  const context = useContext(PortfolioContext);
  if (!context) {
    throw new Error('usePortfolio must be used within a PortfolioProvider');
  }
  return context;
};
