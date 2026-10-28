/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { PortfolioConfig } from '../data/portfolioData';

export interface TerminalOutputItem {
  type: 'input' | 'output' | 'error' | 'success' | 'system';
  text: string;
  timestamp?: string;
  link?: { url: string; label: string };
}

export interface TerminalExecutionResult {
  output: TerminalOutputItem[];
  action?: 'clear' | 'navigate' | 'toggle-matrix' | 'toggle-scanlines';
  targetPath?: string;
}

export function executeTerminalCommand(
  rawInput: string,
  portfolio: PortfolioConfig
): TerminalExecutionResult {
  const trimmed = rawInput.trim();
  if (!trimmed) {
    return { output: [] };
  }

  const parts = trimmed.split(' ');
  const command = parts[0].toLowerCase();
  const args = parts.slice(1).join(' ').trim();

  switch (command) {
    case 'help':
      return {
        output: [
          { type: 'system', text: '================ CYBER CLI COMMAND SUITE ================' },
          { type: 'output', text: '  whoami         - Print current system user & handle' },
          { type: 'output', text: '  about          - View biography and technical mission' },
          { type: 'output', text: '  education      - Inspect academic background & credentials' },
          { type: 'output', text: '  interests      - List cybersecurity & engineering interests' },
          { type: 'output', text: '  mission        - Read personal mission statement' },
          { type: 'output', text: '  skills         - List key technical skills & competencies' },
          { type: 'output', text: '  projects       - List featured engineering repositories' },
          { type: 'output', text: '  certificates   - View professional certifications' },
          { type: 'output', text: '  resume         - Preview terminal resume (or "cat resume.txt")' },
          { type: 'output', text: '  contact        - Display secure transmission coordinates' },
          { type: 'output', text: '  sysinfo        - Display simulated host diagnostics & uptime' },
          { type: 'output', text: '  date           - Output current system timestamp' },
          { type: 'output', text: '  matrix         - Toggle background digital rain state' },
          { type: 'output', text: '  echo [text]    - Echo text back to standard output' },
          { type: 'output', text: '  clear          - Clear terminal output stream' },
          { type: 'output', text: '  goto [page]    - Navigate (home, about, skills, projects, certs, resume, contact)' },
          { type: 'system', text: '=========================================================' }
        ]
      };

    case 'whoami':
      return {
        output: [
          { type: 'success', text: `USER: ${portfolio.personal.name} (@${portfolio.personal.handle})` },
          { type: 'output', text: `ROLE: ${portfolio.personal.title}` },
          { type: 'output', text: `STATUS: ${portfolio.personal.status}` },
          { type: 'output', text: `LOC: ${portfolio.personal.location}` }
        ]
      };

    case 'about':
      return {
        output: [
          { type: 'system', text: `=== ABOUT: ${portfolio.personal.name} ===` },
          { type: 'output', text: portfolio.personal.bio },
          { type: 'output', text: `Primary Focus: ${portfolio.aboutDetails.coreFocus}` },
          { type: 'output', text: `Clearance / Candidacy: ${portfolio.aboutDetails.clearanceStatus}` }
        ]
      };

    case 'education':
      return {
        output: [
          { type: 'system', text: '=== ACADEMIC DOSSIER ===' },
          { type: 'success', text: `${portfolio.aboutDetails.degree}` },
          { type: 'output', text: `Institution: ${portfolio.aboutDetails.university}` },
          { type: 'output', text: `Timeline: ${portfolio.aboutDetails.graduationYear} | Cumulative GPA: ${portfolio.aboutDetails.gpa}` }
        ]
      };

    case 'interests':
      return {
        output: [
          { type: 'system', text: '=== CYBERSECURITY & TECH INTERESTS ===' },
          ...portfolio.personal.securityInterests.map((interest, i) => ({
            type: 'output' as const,
            text: `  [0x0${i + 1}] ${interest}`
          }))
        ]
      };

    case 'mission':
      return {
        output: [
          { type: 'system', text: '=== MISSION DIRECTIVE ===' },
          { type: 'success', text: portfolio.aboutDetails.mission }
        ]
      };

    case 'skills': {
      const topSkills = portfolio.skills.slice(0, 8);
      return {
        output: [
          { type: 'system', text: '=== CORE TECHNICAL ARSENAL ===' },
          ...topSkills.map((s) => ({
            type: 'output' as const,
            text: `  ${s.name.padEnd(20, ' ')} [${'#'.repeat(Math.round(s.level / 10))}${' '.repeat(10 - Math.round(s.level / 10))}] ${s.level}% (${s.proficiencyLabel})`
          })),
          { type: 'system', text: 'Type "goto skills" to view the interactive radar & full catalog.' }
        ]
      };
    }

    case 'projects':
      return {
        output: [
          { type: 'system', text: '=== FEATURED ARCHITECTURE & CODE ===' },
          ...portfolio.projects.map((p, idx) => ({
            type: 'output' as const,
            text: `  [${idx + 1}] ${p.name} [${p.category}] - ${p.description.slice(0, 60)}...`
          })),
          { type: 'system', text: 'Type "goto projects" to explore live demos & repositories.' }
        ]
      };

    case 'certificates':
      return {
        output: [
          { type: 'system', text: '=== CREDENTIALS & CERTIFICATIONS ===' },
          ...portfolio.certificates.map((c) => ({
            type: 'output' as const,
            text: `  - ${c.title} (${c.issuer}) [STATUS: ${c.status.toUpperCase()}]`
          })),
          { type: 'system', text: 'Type "goto certificates" to inspect credential verification IDs.' }
        ]
      };

    case 'resume':
    case 'cat':
      if (command === 'cat' && args !== 'resume.txt' && args !== 'resume') {
        return {
          output: [{ type: 'error', text: `cat: ${args || 'file'}: No such file or directory. Try "cat resume.txt"` }]
        };
      }
      return {
        output: [
          { type: 'system', text: '================ RESUME TERMINAL TRANSCRIPT ================' },
          { type: 'success', text: `${portfolio.personal.name} — ${portfolio.personal.title}` },
          { type: 'output', text: `Email: ${portfolio.personal.email} | GitHub: ${portfolio.personal.github}` },
          { type: 'output', text: `Education: ${portfolio.aboutDetails.degree}, ${portfolio.aboutDetails.university} (${portfolio.aboutDetails.graduationYear})` },
          { type: 'output', text: `Key Skills: ${portfolio.skills.slice(0, 6).map(s => s.name).join(', ')}` },
          { type: 'system', text: 'Type "goto resume" to view formatted curriculum vitae & download PDF.' }
        ]
      };

    case 'contact':
      return {
        output: [
          { type: 'system', text: '=== SECURE COMM TRANSMISSION CHANNELS ===' },
          { type: 'output', text: `  EMAIL:    ${portfolio.personal.email}` },
          { type: 'output', text: `  GITHUB:   ${portfolio.personal.github}` },
          { type: 'output', text: `  LINKEDIN: ${portfolio.personal.linkedin}` },
          { type: 'output', text: `  DISCORD:  ${portfolio.personal.discord}` },
          { type: 'system', text: 'Type "goto contact" to transmit an encrypted transmission.' }
        ]
      };

    case 'sysinfo':
      return {
        output: [
          { type: 'system', text: '=== NODE DIAGNOSTICS & TELEMETRY ===' },
          { type: 'output', text: `HOST: cyberportfolio-v2.0` },
          { type: 'output', text: `KERNEL: 6.8.0-cyber-generic #42-SMP` },
          { type: 'output', text: `ARCHITECTURE: x86_64 / WebAssembly Sandbox` },
          { type: 'output', text: `PORTS: 22 [FILTERED], 80 [REDIRECT], 443 [OPEN / TLS 1.3]` },
          { type: 'success', text: `INTEGRITY CHECK: PASSED (SHA-256 VERIFIED)` },
          { type: 'output', text: `STATUS: ALL DEFENSIVE SENTINELS ONLINE` }
        ]
      };

    case 'date':
      return {
        output: [
          { type: 'output', text: `UTC SYSTEM TIME: ${new Date().toUTCString()}` }
        ]
      };

    case 'echo':
      return {
        output: [
          { type: 'output', text: args || '' }
        ]
      };

    case 'matrix':
      return {
        action: 'toggle-matrix',
        output: [
          { type: 'system', text: '> Toggled Matrix digital rain state.' }
        ]
      };

    case 'clear':
      return {
        action: 'clear',
        output: []
      };

    case 'sudo':
      return {
        output: [
          { type: 'error', text: 'Permission denied: User "guest" is not in the sudoers file. This incident will be reported.' }
        ]
      };

    case 'exit':
    case 'quit':
      return {
        output: [
          { type: 'system', text: 'Terminal session remained active. Use minimize or navigation.' }
        ]
      };

    case 'goto': {
      const page = args.toLowerCase();
      const routes: Record<string, string> = {
        home: '/',
        about: '/about',
        skills: '/skills',
        projects: '/projects',
        certificates: '/certificates',
        certs: '/certificates',
        resume: '/resume',
        contact: '/contact'
      };
      if (routes[page]) {
        return {
          action: 'navigate',
          targetPath: routes[page],
          output: [{ type: 'success', text: `> Navigating to ${routes[page]}...` }]
        };
      }
      return {
        output: [
          { type: 'error', text: `goto: destination '${args}' unknown. Valid targets: home, about, skills, projects, certs, resume, contact.` }
        ]
      };
    }

    default:
      return {
        output: [
          { type: 'error', text: `zsh: command not found: ${command}. Type 'help' to inspect authorized commands.` }
        ]
      };
  }
}
