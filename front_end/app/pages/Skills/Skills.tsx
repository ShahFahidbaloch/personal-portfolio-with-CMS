"use client";

import React, { useState, useEffect } from "react";
import { TextMorph } from "torph/react";
import {
  SiReact,
  SiNextdotjs,
  SiTypescript,
  SiJavascript,
  SiNodedotjs,
  SiPython,
  SiAmazonaws,
  SiCloudflare,
  SiShopify,
  SiBigcommerce,
  SiTailwindcss,
  SiMongodb,
  SiSanity,
  SiGit,
  SiRedux,
} from "react-icons/si";
import { TbApi } from "react-icons/tb";
import { AppWrap } from "../../wrapper";
import "./Skills.scss";

interface SkillItem {
  id: string;
  name: string;
  category: string;
  experience: string;
  track: 1 | 2;
  delay: number;
  tilt: number;
  icon: React.ReactNode;
}

const SKILLS_DATA: SkillItem[] = [
  // --- Track 1: Ascending Diagonal (Bottom-Left to Top-Right) ---
  {
    id: "react",
    name: "React.js",
    category: "Frontend Architecture",
    experience: "3+ Years Production",
    track: 1,
    delay: 0,
    tilt: -10,
    icon: <SiReact className="w-5 h-5 text-[#61DAFB]" />,
  },
  {
    id: "nextjs",
    name: "Next.js",
    category: "SSR & App Router",
    experience: "Enterprise Storefronts",
    track: 1,
    delay: -3,
    tilt: 12,
    icon: <SiNextdotjs className="w-5 h-5 text-black" />,
  },
  {
    id: "typescript",
    name: "TypeScript",
    category: "Type-Safe Systems",
    experience: "Strict Architecture",
    track: 1,
    delay: -6,
    tilt: -8,
    icon: <SiTypescript className="w-5 h-5 text-[#3178C6]" />,
  },
  {
    id: "javascript",
    name: "JavaScript",
    category: "Core Language",
    experience: "ES6+ & Async Patterns",
    track: 1,
    delay: -9,
    tilt: 9,
    icon: <SiJavascript className="w-5 h-5 text-[#F7DF1E]" />,
  },
  {
    id: "nodejs",
    name: "Node.js",
    category: "Backend Runtime",
    experience: "Scalable Microservices",
    track: 1,
    delay: -12,
    tilt: -11,
    icon: <SiNodedotjs className="w-5 h-5 text-[#539E43]" />,
  },
  {
    id: "python",
    name: "Python",
    category: "Backend & Automation",
    experience: "APIs & Data Pipelines",
    track: 1,
    delay: -15,
    tilt: 8,
    icon: <SiPython className="w-5 h-5 text-[#3776AB]" />,
  },
  {
    id: "redux",
    name: "Redux Toolkit",
    category: "State Management",
    experience: "Predictable Store Flows",
    track: 1,
    delay: -18,
    tilt: -9,
    icon: <SiRedux className="w-5 h-5 text-[#764ABC]" />,
  },
  {
    id: "rest",
    name: "REST & GraphQL",
    category: "System Integration",
    experience: "Webhooks & Gateway APIs",
    track: 1,
    delay: -21,
    tilt: 10,
    icon: <TbApi className="w-5 h-5 text-[#0284c7]" />,
  },

  // --- Track 2: Descending Diagonal (Top-Left to Bottom-Right CROSSING) ---
  {
    id: "aws",
    name: "AWS",
    category: "Cloud Infrastructure",
    experience: "S3, IAM & Serverless",
    track: 2,
    delay: -1,
    tilt: -8,
    icon: <SiAmazonaws className="w-5 h-5 text-[#FF9900]" />,
  },
  {
    id: "cloudflare",
    name: "Cloudflare",
    category: "Edge & CDN Caching",
    experience: "Domain & Token Sync",
    track: 2,
    delay: -4.25,
    tilt: 11,
    icon: <SiCloudflare className="w-5 h-5 text-[#F38020]" />,
  },
  {
    id: "shopify",
    name: "Shopify",
    category: "Headless E-Commerce",
    experience: "Liquid CLI & Storefronts",
    track: 2,
    delay: -7.5,
    tilt: -10,
    icon: <SiShopify className="w-5 h-5 text-[#95BF47]" />,
  },
  {
    id: "bigcommerce",
    name: "BigCommerce",
    category: "Enterprise Headless",
    experience: "Multi-Region Storefronts",
    track: 2,
    delay: -10.75,
    tilt: 9,
    icon: <SiBigcommerce className="w-5 h-5 text-[#0D52FF]" />,
  },
  {
    id: "tailwind",
    name: "Tailwind CSS",
    category: "Design Systems",
    experience: "Fluid UI & Tokens",
    track: 2,
    delay: -14,
    tilt: -9,
    icon: <SiTailwindcss className="w-5 h-5 text-[#38BDF8]" />,
  },
  {
    id: "mongodb",
    name: "MongoDB",
    category: "NoSQL Database",
    experience: "Aggregation Pipelines",
    track: 2,
    delay: -17.25,
    tilt: 12,
    icon: <SiMongodb className="w-5 h-5 text-[#47A248]" />,
  },
  {
    id: "sanity",
    name: "Sanity CMS",
    category: "Headless Content",
    experience: "GROQ & Live Content Preview",
    track: 2,
    delay: -20.5,
    tilt: -7,
    icon: <SiSanity className="w-5 h-5 text-[#F03E2F]" />,
  },
  {
    id: "git",
    name: "Git & GitHub",
    category: "Version Control",
    experience: "PRs & CI/CD Pipelines",
    track: 2,
    delay: -23.75,
    tilt: 10,
    icon: <SiGit className="w-5 h-5 text-[#F05032]" />,
  },
];

const EXPERIENCES = [
  {
    id: "exp-1",
    period: "Mar 2026 — May 2026",
    role: "Web Development Intern",
    company: "Superior eCommerce Ltd (via Iconic Studio / L'AZURDE)",
    location: "Greater London, UK (Remote)",
    description:
      "Implemented Apple Pay express checkout on a headless BigCommerce storefront using the PaymentRequest API; resolved domain-verification issues across Cloudflare subdomains. Fixed cart-session bugs and token-mismatch conflicts caused by CDN caching. Developed Shopify themes and collaborated on Shopify-to-MuleSoft middleware event flows.",
    stack: ["Next.js", "BigCommerce", "Apple Pay API", "Cloudflare", "Shopify", "MuleSoft"],
    metric: "Apple Pay API & Cloudflare CDN Sync",
  },
  {
    id: "exp-2",
    period: "Jun 2026 — Jul 2026",
    role: "Full Stack Engineer / Frontend Developer",
    company: "CodeAlpha & Afynix Digital",
    location: "Pakistan (Remote)",
    description:
      "Contributed to full-stack and frontend tasks across short-term engagements, applying React.js and Node.js in production-oriented workflows with modular component architecture and responsive design systems.",
    stack: ["React.js", "Node.js", "TypeScript", "Tailwind CSS", "REST APIs"],
    metric: "Modular Full-Stack React & Node.js",
  },
  {
    id: "exp-3",
    period: "Jan 2023 — Dec 2025",
    role: "Independent Developer",
    company: "Self-Employed",
    location: "Remote",
    description:
      "Designed and shipped multiple client-facing web projects (portfolio platforms, CMS-backed blogs, Shopify storefronts) with full responsiveness using React and Next.js. Built an AI-powered chatbot integrating OpenAI API with real-time streamed responses.",
    stack: ["Next.js", "React.js", "Sanity CMS", "Shopify", "OpenAI API"],
    metric: "OpenAI Streaming & Headless CMS",
  },
];

const SkillsAndExperience: React.FC = () => {
  const [activeSkill, setActiveSkill] = useState<SkillItem>(SKILLS_DATA[0]);
  const [isHovering, setIsHovering] = useState(false);

  // Auto-cycle the active skill in the HUD when user is not hovering
  useEffect(() => {
    if (isHovering) return;
    const interval = setInterval(() => {
      setActiveSkill((prev) => {
        const currentIndex = SKILLS_DATA.findIndex((s) => s.id === prev.id);
        return SKILLS_DATA[(currentIndex + 1) % SKILLS_DATA.length];
      });
    }, 2800);
    return () => clearInterval(interval);
  }, [isHovering]);

  return (
    <section className="relative w-full bg-[#F5F5F7] dark:bg-[#0a0a0c] text-[#111113] dark:text-[#FFFFFF] overflow-hidden select-none py-16 sm:py-24 transition-colors duration-300">
      <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* =====================================================================
            PART 1: DESKTOP & TABLET CLOUDFLARE "SKILLS" STAGE
           ===================================================================== */}
        <div className="hidden md:block">
          {/* Section Pill Category matching About */}
          <div className="text-center mb-10 sm:mb-14 max-w-3xl mx-auto">
            <p className="text-xs font-mono uppercase tracking-widest text-neutral-400 dark:text-neutral-500 mb-3 sm:mb-4">
              Architecture
            </p>
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-semibold tracking-[-0.03em] leading-[1.12] text-neutral-900 dark:text-white">
              Skills &amp; Core Competencies.
            </h2>
          </div>

          {/* Main Interactive Stage Canvas (Monochrome Apple HIG) */}
          <div className="stage-container relative w-full h-[540px] lg:h-[620px] flex flex-col items-center justify-center overflow-hidden rounded-[36px] lg:rounded-[44px] border border-black/[0.08] dark:border-white/[0.08] bg-white dark:bg-[#0a0a0c] shadow-[0_15px_45px_rgba(0,0,0,0.04)] dark:shadow-[0_20px_60px_rgba(0,0,0,0.85)] transition-colors duration-300">
            
            {/* Ultra-subtle Blueprint Grid Lines */}
            <div className="absolute inset-0 grid grid-cols-4 pointer-events-none opacity-30 px-10">
              <div className="border-l border-black/[0.06] dark:border-white/[0.06] h-full" />
              <div className="border-l border-black/[0.06] dark:border-white/[0.06] h-full" />
              <div className="border-l border-black/[0.06] dark:border-white/[0.06] h-full" />
              <div className="border-l border-r border-black/[0.06] dark:border-white/[0.06] h-full" />
            </div>

            {/* Exactly TWO Precision Diagonal Cross-Lines (SVG Paths) */}
            <svg
              viewBox="0 0 1200 600"
              fill="none"
              className="absolute inset-0 w-full h-full pointer-events-none z-10"
              preserveAspectRatio="xMidYMid slice"
            >
              {/* Path 1: Ascending Diagonal (Bottom-Left -> Top-Right) */}
              <path
                d="M 80,520 C 360,420 740,200 1120,100"
                stroke="currentColor"
                className="text-black/15 dark:text-white/25"
                strokeWidth="1.5"
                strokeDasharray="4 4"
              />
              {/* Endpoint Nodes: Path 1 */}
              <circle cx="80" cy="520" r="3.5" fill="currentColor" className="text-black/40 dark:text-white/70" />
              <circle cx="80" cy="520" r="7" fill="currentColor" className="text-black/10 dark:text-white/20 animate-pulse" />
              <circle cx="1120" cy="100" r="3.5" fill="currentColor" className="text-black/40 dark:text-white/70" />
              <circle cx="1120" cy="100" r="7" fill="currentColor" className="text-black/10 dark:text-white/20 animate-pulse" />

              {/* Path 2: Descending Diagonal (Top-Left -> Bottom-Right CROSSING) */}
              <path
                d="M 80,100 C 360,200 740,420 1120,520"
                stroke="currentColor"
                className="text-black/15 dark:text-white/25"
                strokeWidth="1.5"
                strokeDasharray="4 4"
              />
              {/* Endpoint Nodes: Path 2 */}
              <circle cx="80" cy="100" r="3.5" fill="currentColor" className="text-black/40 dark:text-white/70" />
              <circle cx="80" cy="100" r="7" fill="currentColor" className="text-black/10 dark:text-white/20 animate-pulse" />
              <circle cx="1120" cy="520" r="3.5" fill="currentColor" className="text-black/40 dark:text-white/70" />
              <circle cx="1120" cy="520" r="7" fill="currentColor" className="text-black/10 dark:text-white/20 animate-pulse" />
            </svg>

            {/* Stacked Echo Typography ("Skills"): Monochrome Solid Colors */}
            <div className="relative flex flex-col items-center justify-center pointer-events-none z-0 leading-none select-none">
              {/* Outer Top Echo */}
              <span
                aria-hidden="true"
                className="text-[85px] sm:text-[145px] lg:text-[185px] font-extrabold tracking-tighter text-black/[0.03] dark:text-white/[0.03] -mb-10 sm:-mb-20 lg:-mb-28 blur-[0.5px]"
              >
                Skills
              </span>
              {/* Inner Top Echo */}
              <span
                aria-hidden="true"
                className="text-[85px] sm:text-[145px] lg:text-[185px] font-extrabold tracking-tighter text-black/[0.08] dark:text-white/[0.08] -mb-8 sm:-mb-16 lg:-mb-24"
              >
                Skills
              </span>

              {/* Center Primary "Skills" Typography: Crisp Solid Color */}
              <h2 className="relative z-10 text-[90px] sm:text-[150px] lg:text-[195px] font-extrabold tracking-tighter text-[#111113] dark:text-[#FFFFFF] drop-shadow-[0_4px_20px_rgba(0,0,0,0.15)] dark:drop-shadow-[0_8px_30px_rgba(0,0,0,0.8)]">
                Skills
              </h2>

              {/* Inner Bottom Echo */}
              <span
                aria-hidden="true"
                className="text-[85px] sm:text-[145px] lg:text-[185px] font-extrabold tracking-tighter text-black/[0.08] dark:text-white/[0.08] -mt-8 sm:-mt-16 lg:-mt-24"
              >
                Skills
              </span>
              {/* Outer Bottom Echo */}
              <span
                aria-hidden="true"
                className="text-[85px] sm:text-[145px] lg:text-[185px] font-extrabold tracking-tighter text-black/[0.03] dark:text-white/[0.03] -mt-10 sm:-mt-20 lg:-mt-28 blur-[0.5px]"
              >
                Skills
              </span>
            </div>

            {/* Strictly Constrained Sliding Skill Cards (Gliding along Track 1 & 2) */}
            <div className="absolute inset-0 w-[1200px] h-[600px] left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20 pointer-events-none scale-[0.72] lg:scale-100 origin-center">
              {SKILLS_DATA.map((skill) => {
                const trackClass = skill.track === 1 ? "skill-track-1" : "skill-track-2";
                const isSelected = activeSkill.id === skill.id;

                return (
                  <div
                    key={skill.id}
                    onMouseEnter={() => {
                      setIsHovering(true);
                      setActiveSkill(skill);
                    }}
                    onMouseLeave={() => setIsHovering(false)}
                    style={{
                      animationDelay: `${skill.delay}s`,
                    }}
                    className={`${trackClass} skill-card-glide pointer-events-auto absolute top-0 left-0 cursor-pointer group`}
                  >
                    {/* Frosted Glass Tile Card */}
                    <div
                      style={{ transform: `rotate(${skill.tilt}deg)` }}
                      className={`w-[78px] h-[98px] rounded-2xl backdrop-blur-md transition-all duration-300 flex flex-col items-center justify-center p-2.5 ${
                        isSelected
                          ? "bg-white dark:bg-neutral-800/90 border-2 border-black/40 dark:border-white/40 shadow-2xl scale-110"
                          : "bg-white/85 dark:bg-neutral-900/80 hover:bg-white dark:hover:bg-neutral-800/90 border border-black/10 dark:border-white/10 shadow-lg hover:scale-110"
                      }`}
                    >
                      {/* Crisp White Squircle Icon Container */}
                      <div className="w-10 h-10 rounded-xl bg-white shadow-sm border border-black/5 flex items-center justify-center shrink-0 transition-transform duration-200 group-hover:scale-105">
                        {skill.icon}
                      </div>
                      <span className="mt-2 text-[10px] font-medium tracking-tight text-neutral-800 dark:text-neutral-200 text-center truncate max-w-full">
                        {skill.name}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Bottom Torph Interactive HUD Bar */}
            <div className="absolute bottom-6 inset-x-0 z-30 flex flex-col items-center text-center px-4">
              <div className="inline-flex items-center gap-3.5 px-5 py-2.5 rounded-full bg-white/90 dark:bg-[#121214]/90 border border-black/10 dark:border-white/10 backdrop-blur-md shadow-lg">
                <div className="text-sm font-semibold text-neutral-900 dark:text-white tracking-tight min-w-[105px] text-left">
                  <TextMorph>{activeSkill.name}</TextMorph>
                </div>
                <span className="text-black/15 dark:text-white/20">|</span>
                <div className="text-xs font-medium text-neutral-500 dark:text-[#86868B] min-w-[145px] text-left">
                  <TextMorph>{activeSkill.category}</TextMorph>
                </div>
                <span className="hidden sm:inline text-black/15 dark:text-white/20">|</span>
                <div className="hidden sm:block text-xs font-mono text-neutral-600 dark:text-neutral-400">
                  <TextMorph>{activeSkill.experience}</TextMorph>
                </div>
              </div>
              <p className="mt-2 text-[11px] text-[#86868B]">
                Hover over any technology tile along the intersecting tracks to inspect architecture.
              </p>
            </div>
          </div>
        </div>

        {/* =====================================================================
            PART 2: RESPONSIVE MOBILE BENTO GRID (< 768px Viewports)
           ===================================================================== */}
        <div className="block md:hidden">
          <div className="mb-6">
            <p className="text-xs font-mono uppercase tracking-widest text-neutral-400 dark:text-neutral-500 mb-2">
              Architecture
            </p>
            <h2 className="text-2xl sm:text-3xl font-semibold tracking-[-0.03em] text-neutral-900 dark:text-white">
              Skills &amp; Technologies
            </h2>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {SKILLS_DATA.map((skill) => (
              <div
                key={skill.id}
                onClick={() => setActiveSkill(skill)}
                className="p-3 rounded-2xl bg-white dark:bg-[#121214] border border-black/[0.06] dark:border-white/[0.08] flex items-center gap-3 shadow-sm active:scale-95 transition-transform cursor-pointer"
              >
                <div className="w-10 h-10 rounded-xl bg-white shadow-sm border border-black/5 flex items-center justify-center shrink-0">
                  {skill.icon}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-xs font-semibold text-neutral-900 dark:text-white truncate">
                    {skill.name}
                  </p>
                  <p className="text-[10px] text-[#86868B] truncate">
                    {skill.category}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Mobile HUD Callout */}
          <div className="mt-4 p-4 rounded-2xl bg-white dark:bg-[#121214] border border-black/[0.06] dark:border-white/[0.08] flex items-center justify-between text-xs">
            <div className="flex items-center gap-2">
              <span className="font-semibold text-neutral-900 dark:text-white">
                <TextMorph>{activeSkill.name}</TextMorph>
              </span>
            </div>
            <span className="text-[11px] font-mono text-[#86868B]">
              <TextMorph>{activeSkill.experience}</TextMorph>
            </span>
          </div>
        </div>

        {/* =====================================================================
            PART 3: CLEAN APPLE-STYLE PROFESSIONAL EXPERIENCE LEDGER
           ===================================================================== */}
        <div id="experience" className="mt-24 max-w-4xl mx-auto">
          {/* Header Row */}
          <div className="mb-10 border-b border-black/[0.08] dark:border-white/[0.08] pb-6">
            <span className="text-xs font-mono uppercase tracking-widest text-neutral-400 dark:text-neutral-500 mb-2 block">
              Career Ledger
            </span>
            <h3 className="text-2xl sm:text-4xl font-semibold tracking-[-0.03em] text-neutral-900 dark:text-white mt-1">
              Professional Experience.
            </h3>
          </div>

          {/* 3 Compact Apple Product Cards */}
          <div className="flex flex-col gap-4 sm:gap-5">
            {EXPERIENCES.map((exp) => (
              <div
                key={exp.id}
                className="hero-card-surface rounded-[20px] sm:rounded-[28px] p-4 sm:p-6 lg:p-7 flex flex-col justify-between group transition-all duration-300"
              >
                <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                  {/* Left Column: Period Badge & Location */}
                  <div className="md:col-span-4 flex flex-col justify-between">
                    <div>
                      <span className="inline-block px-3 py-1 rounded-full text-xs font-mono font-medium bg-black/[0.04] dark:bg-white/[0.06] text-neutral-800 dark:text-neutral-200 border border-black/[0.08] dark:border-white/[0.08]">
                        {exp.period}
                      </span>
                      <p className="mt-3 text-xs text-[#86868B] font-mono">
                        {exp.location}
                      </p>
                    </div>
                  </div>

                  {/* Right Column: Role, Company, Description & Tech Stack */}
                  <div className="md:col-span-8 flex flex-col justify-between">
                    <div>
                      <h4 className="text-xl font-semibold text-neutral-900 dark:text-white">
                        {exp.role}
                      </h4>
                      <p className="text-sm font-medium text-neutral-700 dark:text-neutral-300 mt-1">
                        {exp.company}
                      </p>
                      <p className="mt-3.5 text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
                        {exp.description}
                      </p>
                    </div>

                    {/* Tech Stack Pills */}
                    <div className="flex flex-wrap gap-2 mt-6 pt-4 border-t border-black/[0.05] dark:border-white/[0.05]">
                      {exp.stack.map((tech) => (
                        <span
                          key={tech}
                          className="px-3 py-1 rounded-full bg-black/[0.03] dark:bg-white/[0.05] text-neutral-700 dark:text-neutral-300 border border-black/[0.05] dark:border-white/[0.08] text-xs font-mono"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};

export default AppWrap(
  SkillsAndExperience,
  "skills",
  "app__skills-wrap"
);
