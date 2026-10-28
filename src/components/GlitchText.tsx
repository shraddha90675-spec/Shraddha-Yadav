/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';

interface GlitchTextProps {
  text: string;
  as?: 'h1' | 'h2' | 'h3' | 'span' | 'p';
  className?: string;
  glow?: 'green' | 'cyan' | 'none';
}

export const GlitchText: React.FC<GlitchTextProps> = ({
  text,
  as: Component = 'span',
  className = '',
  glow = 'green'
}) => {
  const [isGlitching, setIsGlitching] = useState(false);

  const glowClass =
    glow === 'green'
      ? 'neon-text-green text-[#00ff41]'
      : glow === 'cyan'
      ? 'neon-text-cyan text-[#00e5ff]'
      : '';

  return (
    <Component
      onMouseEnter={() => setIsGlitching(true)}
      onMouseLeave={() => setIsGlitching(false)}
      className={`relative inline-block tracking-wider transition-all duration-200 select-none ${glowClass} ${
        isGlitching ? 'glitch-hover' : ''
      } ${className}`}
      data-text={text}
    >
      {text}
      {isGlitching && (
        <>
          <span
            aria-hidden="true"
            className="absolute top-0 left-0 text-[#00e5ff] opacity-70 translate-x-[2px] -translate-y-[1px] pointer-events-none"
          >
            {text}
          </span>
          <span
            aria-hidden="true"
            className="absolute top-0 left-0 text-[#ff0055] opacity-70 -translate-x-[2px] translate-y-[1px] pointer-events-none"
          >
            {text}
          </span>
        </>
      )}
    </Component>
  );
};
