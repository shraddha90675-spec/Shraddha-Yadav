/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * Central Configuration for CyberPortfolio.
 * All personal details, projects, skills, certificates, and terminal commands
 * are cleanly editable right here.
 */

export interface ProjectItem {
  id: string;
  name: string;
  category: 'Web Dev' | 'Cybersecurity' | 'Automation' | 'AI / Systems';
  description: string;
  longDescription: string;
  technologies: string[];
  features: string[];
  githubUrl: string;
  demoUrl: string;
  image: string;
  status: 'Production' | 'Active' | 'Prototype' | 'Maintained';
  commandPreview?: string;
}

export interface SkillItem {
  name: string;
  level: number; // 0 to 100
  proficiencyLabel: string;
  category: 'Programming' | 'Web Development' | 'Cybersecurity' | 'Tools';
  description: string;
  icon?: string;
}

export interface CertificateItem {
  id: string;
  title: string;
  issuer: string;
  date: string;
  credentialId: string;
  credentialUrl: string;
  status: 'Verified' | 'In Progress' | 'Candidate Placeholder';
  description: string;
  skillsLearned: string[];
}

export interface AchievementItem {
  id: string;
  year: string;
  title: string;
  organization: string;
  description: string;
  badge: string;
}

export interface TimelineMilestone {
  period: string;
  title: string;
  organization: string;
  role: string;
  description: string;
  highlights: string[];
  type: 'education' | 'experience' | 'milestone';
}

export interface PortfolioConfig {
  personal: {
    name: string;
    handle: string;
    title: string;
    typingRoles: string[];
    bio: string;
    detailedBio: string[];
    location: string;
    email: string;
    github: string;
    linkedin: string;
    discord: string;
    status: string;
    securityInterests: string[];
    avatarUrl: string;
    resumePdfUrl: string;
  };
  terminalGreeting: string;
  aboutDetails: {
    degree: string;
    university: string;
    graduationYear: string;
    gpa: string;
    clearanceStatus: string;
    primaryLanguages: string[];
    coreFocus: string;
    mission: string;
  };
  skills: SkillItem[];
  currentlyLearning: {
    topic: string;
    focus: string;
    progress: number;
    targetDate: string;
  }[];
  projects: ProjectItem[];
  certificates: CertificateItem[];
  achievements: AchievementItem[];
  timeline: TimelineMilestone[];
}

export const initialPortfolioData: PortfolioConfig = {
  personal: {
    name: "Alex Rivera",
    handle: "arivera_sec",
    title: "Aspiring Software Developer | Cybersecurity Enthusiast",
    typingRoles: [
      "> Developer",
      "> Cybersecurity Enthusiast",
      "> Problem Solver",
      "> Tech Explorer"
    ],
    bio: "Passionate computer science undergraduate specialized in defensive security, robust web engineering, and Linux system automation. Driven to build software that is resilient, clean, and architecturally secure by design.",
    detailedBio: [
      "Currently pursuing a Bachelor's in Computer Science with a strong emphasis on Software Engineering and Information Security.",
      "Hands-on experience developing modern full-stack web applications, architecting automation scripts with Python, and practicing vulnerability analysis and Linux hardening.",
      "Dedicated to active learning through Capture The Flag (CTF) challenges, open-source security tool development, and building tools that make daily tasks autonomous."
    ],
    location: "San Francisco, CA / Remote",
    email: "alex.rivera.dev@example.com",
    github: "https://github.com/placeholder-alex-rivera",
    linkedin: "https://linkedin.com/in/placeholder-alex-rivera",
    discord: "arivera#2048",
    status: "OPEN TO INTERNSHIPS & ROLES",
    securityInterests: [
      "Network Traffic Analysis & Wireshark",
      "Linux Kernel & Distro Hardening",
      "Secure API Design & OWASP Top 10",
      "Automated Scripting & Threat Triaging",
      "Cryptographic Primitives & Auth"
    ],
    avatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80",
    resumePdfUrl: "#download-resume"
  },
  terminalGreeting: "root@portfolio:~$ whoami",
  aboutDetails: {
    degree: "B.S. in Computer Science",
    university: "State University School of Computing",
    graduationYear: "Expected 2026",
    gpa: "3.85 / 4.0",
    clearanceStatus: "Eligible for Security Clearance (Student Candidate)",
    primaryLanguages: ["Python", "JavaScript / TypeScript", "C / C++", "Bash / Shell"],
    coreFocus: "Full-Stack Development, Defensive Cybersecurity & Systems Automation",
    mission: "To bridge the gap between reliable software design and proactive defensive cybersecurity, creating tamper-resistant applications that serve people worldwide."
  },
  skills: [
    // Programming
    {
      name: "Python",
      level: 90,
      proficiencyLabel: "Advanced",
      category: "Programming",
      description: "Socket programming, automation scripts, Pandas, Flask, security tooling & scripting."
    },
    {
      name: "JavaScript / TypeScript",
      level: 85,
      proficiencyLabel: "Proficient",
      category: "Programming",
      description: "Modern ES6+, async patterns, TypeScript strict typing, Node.js backend services."
    },
    {
      name: "C / C++",
      level: 75,
      proficiencyLabel: "Intermediate",
      category: "Programming",
      description: "Low-level memory management, pointers, data structures, OS system calls."
    },
    // Web Development
    {
      name: "React & Modern SPA",
      level: 88,
      proficiencyLabel: "Proficient",
      category: "Web Development",
      description: "Hooks, state management, component architecture, client-side routing, responsive UI."
    },
    {
      name: "HTML5 & Modern CSS3",
      level: 92,
      proficiencyLabel: "Advanced",
      category: "Web Development",
      description: "Semantic layouts, canvas animation, accessibility (WCAG), CSS grid & flexbox."
    },
    {
      name: "Tailwind CSS",
      level: 90,
      proficiencyLabel: "Advanced",
      category: "Web Development",
      description: "Design systems, utility-first styling, responsive tokens, dark/cyber theme configuration."
    },
    {
      name: "REST APIs & Express",
      level: 82,
      proficiencyLabel: "Proficient",
      category: "Web Development",
      description: "Secure routing, rate limiting, JWT authentication, error middleware."
    },
    // Cybersecurity
    {
      name: "Linux Basics & Shell Hardening",
      level: 85,
      proficiencyLabel: "Proficient",
      category: "Cybersecurity",
      description: "Debian/Arch/Ubuntu system administration, iptables/UFW, file permissions (chmod/chown)."
    },
    {
      name: "Networking Fundamentals",
      level: 80,
      proficiencyLabel: "Proficient",
      category: "Cybersecurity",
      description: "TCP/IP stack, OSI model, DNS, subnets, DHCP, Wireshark packet inspection."
    },
    {
      name: "Security Concepts & OWASP Top 10",
      level: 82,
      proficiencyLabel: "Proficient",
      category: "Cybersecurity",
      description: "XSS prevention, SQLi mitigation, CSRF tokens, secure cookie headers, least privilege."
    },
    // Tools
    {
      name: "Git & GitHub",
      level: 88,
      proficiencyLabel: "Proficient",
      category: "Tools",
      description: "Branching strategies, PR reviews, merge conflict resolution, GitHub Actions CI/CD."
    },
    {
      name: "VS Code & Neovim",
      level: 85,
      proficiencyLabel: "Proficient",
      category: "Tools",
      description: "Debuggers, extensions, shell integration, terminal workflows."
    },
    {
      name: "Docker & Container Basics",
      level: 72,
      proficiencyLabel: "Intermediate",
      category: "Tools",
      description: "Writing Dockerfiles, multi-stage builds, container isolation, environment parity."
    },
    {
      name: "Wireshark & Nmap",
      level: 78,
      proficiencyLabel: "Intermediate",
      category: "Tools",
      description: "Port scanning, service enumeration, protocol dissection, filter queries."
    }
  ],
  currentlyLearning: [
    {
      topic: "Rust Programming",
      focus: "Memory safety without garbage collection & secure systems programming",
      progress: 55,
      targetDate: "Q2 2027"
    },
    {
      topic: "CompTIA Security+ / CTF Labs",
      focus: "Hands-on threat analysis, TryHackMe offensive & defensive rooms",
      progress: 75,
      targetDate: "Active Ongoing"
    },
    {
      topic: "Kubernetes & Cloud Security",
      focus: "Cluster security policies, RBAC configurations, and container hardening",
      progress: 40,
      targetDate: "Q3 2027"
    },
    {
      topic: "Applied Cryptography",
      focus: "Elliptic curve cryptography, TLS 1.3 handshakes, post-quantum basics",
      progress: 60,
      targetDate: "Q4 2027"
    }
  ],
  projects: [
    {
      id: "personal-portfolio",
      name: "Personal Portfolio Website",
      category: "Web Dev",
      description: "Modern, responsive hacker-themed portfolio featuring Matrix canvas rain, interactive terminal CLI, live cyber telemetry, and multi-page routing.",
      longDescription: "Built from scratch with React 19, TypeScript, and Tailwind CSS. Highlights include an authentic interactive command-line interface that evaluates safe custom commands, responsive layout across all device screens, scanline CRT overlays, and customizable profile configuration.",
      technologies: ["React 19", "TypeScript", "Tailwind CSS", "HTML5 Canvas", "Framer Motion"],
      features: [
        "Real-time Matrix digital rain canvas with pause/speed controls",
        "Interactive virtual terminal CLI with tab navigation & command history",
        "Light/Dark Cyber matrix theme toggle with state persistence",
        "Zero mock errors: clean form sanitization and accessibility"
      ],
      githubUrl: "https://github.com/placeholder-alex-rivera/cyber-portfolio",
      demoUrl: "https://cyberportfolio.demo.local",
      image: "portfolio",
      status: "Production",
      commandPreview: "run cyberportfolio --port 3000 --env prod"
    },
    {
      id: "eco-snap",
      name: "Eco-Snap — AI Waste Sorting System",
      category: "AI / Systems",
      description: "Computer-vision assisted web app that classifies municipal recyclable waste into accurate recycling categories with carbon footprint insights.",
      longDescription: "Designed to solve campus waste contamination. Integrates camera capture, lightweight image classification inference, and an intuitive UI to give immediate guidance on whether an item belongs in compost, plastics, paper, or e-waste.",
      technologies: ["Python", "TensorFlow / OpenCV", "React", "Node.js", "Tailwind CSS"],
      features: [
        "Real-time webcam photo capture and instantaneous item inference",
        "Categorization into 5 distinct municipal sorting bins",
        "Estimated CO2 offset score saved per correctly diverted item",
        "Offline-capable PWA client with cached classification dictionary"
      ],
      githubUrl: "https://github.com/placeholder-alex-rivera/eco-snap",
      demoUrl: "https://ecosnap-demo.local",
      image: "ecosnap",
      status: "Active",
      commandPreview: "python infer_waste.py --model waste_v2_quant.tflite"
    },
    {
      id: "student-management",
      name: "Student Management System",
      category: "Web Dev",
      description: "Full-stack institutional management portal with role-based access control, grade tracking, student enrollment pipelines, and audit logs.",
      longDescription: "Engineered with security-first design principles. Employs salted password hashing, JWT session rotation, SQL injection parameterized queries, and granular student/faculty/admin permissions with complete audit trails.",
      technologies: ["JavaScript", "Express.js", "PostgreSQL", "React", "Docker"],
      features: [
        "Strict Role-Based Access Control (Admin, Faculty, Student)",
        "Audit logging for all grade and enrollment modifications",
        "Automated semester GPA computation and transcript generation",
        "Docker Compose configuration for one-command deployment"
      ],
      githubUrl: "https://github.com/placeholder-alex-rivera/student-mgmt-sys",
      demoUrl: "https://student-sys.demo.local",
      image: "studentmgmt",
      status: "Maintained",
      commandPreview: "docker-compose up -d && npm test"
    },
    {
      id: "python-automation-tools",
      name: "Python Automation Tools Suite",
      category: "Automation",
      description: "Modular CLI automation toolkit for automated vulnerability report generation, log sanitization, file batching, and system monitoring.",
      longDescription: "A collection of battle-tested Python scripts designed for developer and sysadmin workflows. Includes automated log pattern matching for suspicious IP attempts, scheduled system health diagnostics, and multi-threaded file integrity verifiers.",
      technologies: ["Python 3.12", "Click / Typer", "Schedule", "Regex", "Paramiko"],
      features: [
        "Auth.log & Syslog brute-force detection with automatic IP tallying",
        "SHA-256 batch file integrity checksum validator against tampering",
        "Automated periodic system status telemetry reports exported to JSON/HTML",
        "Command-line interface with rich ASCII terminal output"
      ],
      githubUrl: "https://github.com/placeholder-alex-rivera/python-automation-tools",
      demoUrl: "https://github.com/placeholder-alex-rivera/python-automation-tools",
      image: "automation",
      status: "Active",
      commandPreview: "python -m toolkit --audit /var/log/auth.log --threshold 5"
    },
    {
      id: "network-sentinel",
      name: "Network Sentinel — Packet Dissector",
      category: "Cybersecurity",
      description: "Lightweight network traffic inspector and alert system detecting unusual port scans and suspicious ICMP/SYN floods on local interfaces.",
      longDescription: "Developed to study TCP/IP handshake anomalies and educational defense. Captures live raw sockets, parses IP and TCP/UDP headers, calculates packet frequency metrics, and flags port scan signatures.",
      technologies: ["Python", "Scapy", "Raw Sockets", "Matplotlib", "Bash"],
      features: [
        "Real-time packet sniffing and packet size distribution graphing",
        "SYN scan & half-open port scan heuristics detection",
        "Exportable PCAP file format compatible with Wireshark analysis",
        "Configurable desktop notification alerts upon threshold breach"
      ],
      githubUrl: "https://github.com/placeholder-alex-rivera/network-sentinel",
      demoUrl: "https://github.com/placeholder-alex-rivera/network-sentinel",
      image: "sentinel",
      status: "Prototype",
      commandPreview: "sudo python sentinel.py -i eth0 --detect-portscan"
    }
  ],
  certificates: [
    {
      id: "google-cybersecurity",
      title: "Google Cybersecurity Professional Certificate",
      issuer: "Google / Coursera",
      date: "August 2024",
      credentialId: "GCC-SEC-849204",
      credentialUrl: "https://coursera.org/verify/professional-cert/placeholder",
      status: "Verified",
      description: "Comprehensive curriculum covering SIEM tools, packet sniffing, Python for cybersecurity, Linux command line, and incident response frameworks.",
      skillsLearned: ["SIEM (Splunk)", "Linux CLI", "Python Automation", "Incident Response", "NIST CSF"]
    },
    {
      id: "comptia-secplus-prep",
      title: "CompTIA Security+ Certification (SY0-701)",
      issuer: "CompTIA",
      date: "Scheduled Target: Winter 2026",
      credentialId: "PENDING_EXAM_SLOT",
      credentialUrl: "https://www.comptia.org/certifications/security",
      status: "In Progress",
      description: "Active coursework in general security concepts, threats/vulnerabilities, security operations, architecture, and program management.",
      skillsLearned: ["Threat Intelligence", "PKI & Cryptography", "Identity & Access Management", "Network Architecture"]
    },
    {
      id: "python-institute",
      title: "PCEP™ – Certified Entry-Level Python Programmer",
      issuer: "Python Institute & OpenEDG",
      date: "May 2024",
      credentialId: "PCEP-30-02-EX99",
      credentialUrl: "https://pythoninstitute.org/pcep",
      status: "Verified",
      description: "Demonstrated fundamental understanding of Python syntax, data types, control flow, functions, and module architecture.",
      skillsLearned: ["Python Syntax", "Algorithms", "Control Flow", "Object-Oriented Basics"]
    },
    {
      id: "tryhackme-presec",
      title: "Pre-Security & Cyber Defense Pathway",
      issuer: "TryHackMe",
      date: "November 2024",
      credentialId: "THM-PRESEC-4819",
      credentialUrl: "https://tryhackme.com/path/pre-security",
      status: "Verified",
      description: "Hands-on virtual lab completion covering Network fundamentals, Web application security basics, and Linux privileges.",
      skillsLearned: ["Network Analysis", "HTTP Protocols", "Linux Permissions", "Web Vulnerabilities"]
    },
    {
      id: "placeholder-cloud-cert",
      title: "AWS Certified Cloud Practitioner (Planned Goal)",
      issuer: "Amazon Web Services (AWS)",
      date: "Planned Milestone",
      credentialId: "NOT_YET_ACQUIRED",
      credentialUrl: "https://aws.amazon.com/certification/certified-cloud-practitioner/",
      status: "Candidate Placeholder",
      description: "Future milestone on personal roadmap to master cloud security and serverless cloud architecture. Unearned placeholder to maintain honest representation.",
      skillsLearned: ["Cloud Security Model", "VPC & Subnets", "IAM Policies", "AWS Compute"]
    }
  ],
  achievements: [
    {
      id: "hackathon-2024",
      year: "2024",
      title: "Top 5 Finalist — State University Hackathon",
      organization: "Annual HackFest Collegiate",
      description: "Co-built 'Eco-Snap' within 36 hours. Recognized by judges for practical sustainability impact and seamless on-device image inference.",
      badge: "Finalist Award"
    },
    {
      id: "deans-list",
      year: "2023 - 2024",
      title: "Dean's Honor List for Academic Excellence",
      organization: "School of Engineering & Computer Science",
      description: "Awarded for sustaining a 3.85 GPA across foundational computer systems, discrete mathematics, and algorithms courses.",
      badge: "Academic Honor"
    },
    {
      id: "ctf-rank",
      year: "2024",
      title: "Top 15% Rank — Collegiate CTF Open",
      organization: "National Cyber League / Collegiate CTF",
      description: "Solved forensic challenges, base64/hex steganography, hash cracking, and web header inspection in competitive time-bound rounds.",
      badge: "Top 15% Division"
    },
    {
      id: "lead-mentor",
      year: "2024",
      title: "Student Coding Mentor & Linux Lab Assistant",
      organization: "CS Peer Tutoring Program",
      description: "Mentored over 40 first-year students in Python syntax, Git version control, and bash terminal navigation.",
      badge: "Peer Leadership"
    }
  ],
  timeline: [
    {
      period: "2022 — Present",
      title: "B.S. in Computer Science",
      organization: "State University",
      role: "Undergraduate Student",
      description: "Rigorous coursework in Data Structures, Computer Organization, Operating Systems, Computer Networks, and Database Systems.",
      highlights: [
        "Maintained 3.85 Cumulative GPA",
        "Active member of Cybersecurity & Ethical Hacking Student Club",
        "Elected Lab Teaching Assistant for Intro to Programming"
      ],
      type: "education"
    },
    {
      period: "Summer 2024",
      title: "Software & IT Support Intern",
      organization: "Civic Tech Lab",
      role: "IT & Automation Intern",
      description: "Configured automated backup scripts in Python, assisted in workstation Linux provisioning, and conducted internal vulnerability scans.",
      highlights: [
        "Reduced manual log review time by 65% with Python parsing scripts",
        "Documented security checklist for campus lab machines",
        "Assisted in configuring firewall rules for internal network"
      ],
      type: "experience"
    },
    {
      period: "Early 2024",
      title: "First Capture The Flag (CTF) Competition",
      organization: "Collegiate Cyber League",
      role: "Competitor",
      description: "Discovered passion for defensive cybersecurity, log analysis, packet sniffing, and cryptographic puzzles.",
      highlights: [
        "Solved 18 flags across Web and Forensics tracks",
        "Established personal cybersecurity self-study laboratory"
      ],
      type: "milestone"
    },
    {
      period: "2023",
      title: "Transition to Linux & Full-Stack Development",
      organization: "Self-Directed Learning",
      role: "Developer",
      description: "Switched daily driving environment to Linux (Debian/Arch), mastered Vim and Bash scripting, and built first React SPA applications.",
      highlights: [
        "Built first 5 full-stack React + Express projects",
        "Achieved 100+ GitHub contributions in open-source repositories"
      ],
      type: "milestone"
    }
  ]
};
