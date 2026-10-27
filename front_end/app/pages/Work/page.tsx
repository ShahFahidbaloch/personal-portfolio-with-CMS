"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Github, ArrowUpRight, ShieldCheck } from "lucide-react";
import { AppWrap, MotionWrap } from "../../wrapper";
import "./work.scss";

interface RegionalLink {
  label: string;
  url: string;
}

interface Project {
  id: string;
  title: string;
  tags: string[];
  description: string;
  image: string;
  liveUrl: string;
  githubUrl?: string;
  clientType?: string;
  regionalLinks?: RegionalLink[];
}

const CATEGORIES = ["All", "E-Commerce", "Next.js", "Shopify", "React Js", "Web App"];

const PROJECTS_DATA: Project[] = [
  {
    id: "lazurde",
    title: "L'AZURDE Jewelry",
    tags: ["E-Commerce", "Next.js", "BigCommerce"],
    description:
      "Enterprise headless BigCommerce & Next.js multi-regional storefront for Saudi Arabia, Egypt, and UAE with localized checkout.",
    image: "/projects/lazurde.jpg",
    liveUrl: "https://lazurde.com/sa-en",
    clientType: "Enterprise Client",
    regionalLinks: [
      { label: "KSA", url: "https://lazurde.com/sa-en" },
      { label: "Egypt", url: "https://lazurde.com/eg-en" },
      { label: "UAE", url: "https://lazurde.com/ae-en" },
    ],
  },
  {
    id: "miss-l",
    title: "Miss L' by L'azurde",
    tags: ["E-Commerce", "Next.js", "React Js"],
    description:
      "Modern fashion & fine jewelry digital storefront across KSA, Egypt, and UAE. Features localized shopping flows and high-speed SSR product catalogs.",
    image: "/projects/missl.jpg",
    liveUrl: "https://lazurde.com/sa-en/miss-l",
    clientType: "Enterprise Client",
    regionalLinks: [
      { label: "KSA", url: "https://lazurde.com/sa-en/miss-l" },
      { label: "Egypt", url: "https://lazurde.com/eg-en/miss-l" },
      { label: "UAE", url: "https://lazurde.com/ae-en/miss-l" },
    ],
  },
  {
    id: "pure-salmon",
    title: "Pure Salmon (Marly Dan)",
    tags: ["E-Commerce", "Next.js", "React Js"],
    description:
      "High-performance production web experience for Pure Salmon global sustainable protein platform with custom UI architecture.",
    image: "/projects/marlydan.jpg",
    liveUrl: "https://puresalmon.com/",
    clientType: "Global Enterprise",
  },
  {
    id: "perky-pear",
    title: "Perky Pear UK",
    tags: ["Shopify", "E-Commerce", "React Js"],
    description:
      "Custom Shopify theme development and conversion-focused storefront features for a live UK-based fashion & beauty brand.",
    image: "/projects/perkypear.jpg",
    liveUrl: "https://perkypear.com/",
    clientType: "Shopify Plus Brand",
  },
  {
    id: "dental-clinic",
    title: "Dental Clinic Landing Page",
    tags: ["React Js", "Web App", "Tailwind CSS"],
    description:
      "Modern dental clinic landing page engineered with React, TypeScript, and Tailwind CSS. Features interactive treatments and patient booking CTAs.",
    image: "/projects/dental.jpg",
    liveUrl: "https://master-dental-template-bay.vercel.app/",
    githubUrl: "https://github.com/ShahFahidbaloch/dental-site/tree/main/master-dental-template",
    clientType: "Healthcare Template",
  },
  {
    id: "personal-blog",
    title: "Personal Blog Platform",
    tags: ["Next.js", "React Js", "Web App"],
    description:
      "Fully server-side-rendered dynamic blog with dynamic routing, automated SEO metadata, and headless Sanity CMS integration.",
    image: "/projects/blog.jpg",
    liveUrl: "https://blogs-site-vert.vercel.app/",
    githubUrl: "https://github.com/ShahFahidbaloch/blogs-site",
    clientType: "Full Stack SSR",
  },
  {
    id: "portfolio-ai",
    title: "Portfolio & AI Chatbot",
    tags: ["Web App", "Next.js", "React Js"],
    description:
      "Production-deployed developer portfolio with 100 Lighthouse scores and an integrated OpenAI streaming assistant trained on professional experience.",
    image: "/projects/portfolio.jpg",
    liveUrl: "https://shahfahid.vercel.app/",
    githubUrl: "https://github.com/ShahFahidbaloch/personal-portfolio-with-CMS",
    clientType: "AI Production",
  },
];

const springConfig = {
  type: "spring" as const,
  stiffness: 280,
  damping: 28,
};

const WorkSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState("All");

  const filteredProjects = PROJECTS_DATA.filter((project) =>
    activeTab === "All" ? true : project.tags.includes(activeTab)
  );

  return (
    <section className="relative w-full max-w-6xl mx-auto px-4 sm:px-6 pt-20 sm:pt-24 lg:pt-28 pb-16 sm:pb-24 select-none">
      {/* Anchor for direct #projects / #work routing with generous scroll offset */}
      <div id="projects" className="absolute -top-24 sm:-top-28 pointer-events-none" />
      <div id="work" className="absolute -top-24 sm:-top-28 pointer-events-none" />

      {/* ================= 1. SECTION HEADER ================= */}
      <div className="text-center mb-8 sm:mb-12 max-w-3xl mx-auto">
        <p className="text-xs font-mono uppercase tracking-widest text-neutral-400 dark:text-neutral-500 mb-2 sm:mb-3">
          Portfolio
        </p>
        <h2 className="text-3xl sm:text-5xl lg:text-6xl font-semibold tracking-[-0.03em] leading-[1.12] text-neutral-900 dark:text-white text-center">
          Selected Works.
        </h2>
      </div>

      {/* ================= 2. APPLE SEGMENTED FILTER BAR (Fully responsive on mobile, tablet & desktop) ================= */}
      <div className="w-full flex justify-start md:justify-center mb-8 sm:mb-12 overflow-x-auto no-scrollbar py-2 px-4 sm:px-6">
        <div className="bg-neutral-200/80 dark:bg-neutral-900 p-1 rounded-full inline-flex items-center gap-1 border border-black/5 dark:border-white/10 shadow-sm shrink-0">
          {CATEGORIES.map((tab) => {
            const isActive = activeTab === tab;
            return (
              <button
                key={tab}
                type="button"
                onClick={() => setActiveTab(tab)}
                className={`relative px-3 sm:px-4 py-1.5 rounded-full text-xs font-medium transition-colors cursor-pointer select-none whitespace-nowrap shrink-0 ${
                  isActive
                    ? "text-neutral-900 dark:text-white"
                    : "text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white"
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeFilterPill"
                    transition={springConfig}
                    className="absolute inset-0 rounded-full bg-white dark:bg-[#1C1C1E] shadow-sm -z-10"
                  />
                )}
                {tab}
              </button>
            );
          })}
        </div>
      </div>

      {/* ================= 3. APPLE SHOWCASE PROJECTS GRID (Fully Dynamic: Mobile, Tablet, Laptop 1024, Desktop) ================= */}
      <div className="w-full min-h-[440px]">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.16, ease: "easeOut" }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6"
          >
            {filteredProjects.map((project) => (
              <article
                key={project.id}
                className="hero-card-surface rounded-[22px] sm:rounded-[32px] p-4 sm:p-5 lg:p-5 xl:p-6 flex flex-col justify-between h-full group transition-all duration-300 ease-out overflow-hidden"
              >
                {/* Top Half: Browser Frame, Image, Tags & Details */}
                <div>
                  <div className="rounded-[16px] sm:rounded-[20px] overflow-hidden bg-neutral-100 dark:bg-black/40 border border-black/10 dark:border-white/10 mb-4 relative aspect-[16/10] flex flex-col">
                    {/* Minimal Apple Browser Chrome Bar */}
                    <div className="h-6 px-3 bg-neutral-200/50 dark:bg-white/[0.06] border-b border-black/5 dark:border-white/5 flex items-center justify-between z-10 shrink-0">
                      <div className="flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-neutral-400 dark:bg-neutral-500" />
                        <span className="w-1.5 h-1.5 rounded-full bg-neutral-400 dark:bg-neutral-500" />
                        <span className="w-1.5 h-1.5 rounded-full bg-neutral-400 dark:bg-neutral-500" />
                      </div>
                      {project.clientType && (
                        <span className="text-[9px] font-medium text-neutral-400 dark:text-neutral-500 uppercase tracking-wider">
                          {project.clientType}
                        </span>
                      )}
                    </div>

                    {/* Image strictly isolated to project */}
                    <div className="relative flex-1 w-full overflow-hidden">
                      <Image
                        key={`${project.id}-img`}
                        src={project.image}
                        alt={project.title}
                        fill
                        unoptimized
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="object-cover object-top transition-transform duration-500 ease-out group-hover:scale-[1.02]"
                      />
                    </div>
                  </div>

                  {/* Tags with clean wrap and project-scoped keys */}
                  <div className="flex flex-wrap items-center gap-1.5 mb-3">
                    {project.tags.map((tag) => (
                      <span
                        key={`${project.id}-${tag}`}
                        className="text-[10px] sm:text-[11px] font-medium text-neutral-500 dark:text-neutral-400 px-2.5 py-0.5 sm:py-1 rounded-full bg-neutral-100 dark:bg-white/[0.06] border border-black/[0.04] dark:border-white/[0.08] whitespace-nowrap"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Title & Description */}
                  <h3 className="text-base sm:text-lg font-semibold tracking-tight text-neutral-900 dark:text-white">
                    {project.title}
                  </h3>
                  <p className="mt-1.5 text-xs sm:text-sm text-neutral-500 dark:text-neutral-400 line-clamp-2 leading-relaxed">
                    {project.description}
                  </p>
                </div>

                {/* Bottom Half: Clean Action Pills & Live Preview (NEVER cut off on mobile or any device) */}
                <div className="mt-5 pt-3.5 sm:pt-4 border-t border-black/[0.05] dark:border-white/[0.06] flex items-center justify-between gap-2">
                  {/* Left: Either Regional Stores OR GitHub Source OR Production Verified */}
                  <div className="flex items-center min-w-0 flex-1">
                    {project.regionalLinks ? (
                      <div className="flex items-center gap-1 overflow-x-auto no-scrollbar py-0.5">
                        <span className="text-[10px] font-mono uppercase tracking-wider text-neutral-400 dark:text-neutral-500 shrink-0 mr-0.5">
                          Stores:
                        </span>
                        {project.regionalLinks.map((regional) => (
                          <a
                            key={`${project.id}-${regional.label}`}
                            href={regional.url}
                            target="_blank"
                            rel="noreferrer"
                            title={`${regional.label} Storefront`}
                            className="text-[10px] sm:text-[11px] font-mono font-medium px-2 py-0.5 rounded-full bg-neutral-100 hover:bg-neutral-200 dark:bg-white/[0.06] dark:hover:bg-white/[0.12] text-neutral-700 dark:text-neutral-300 transition-colors border border-black/[0.04] dark:border-white/[0.06] shrink-0"
                          >
                            {regional.label}
                          </a>
                        ))}
                      </div>
                    ) : project.githubUrl ? (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noreferrer"
                        aria-label={`${project.title} Source Code`}
                        className="bg-neutral-100 hover:bg-neutral-200 text-neutral-700 dark:bg-white/10 dark:text-neutral-300 dark:hover:bg-white/15 px-2.5 sm:px-3 py-1.5 rounded-full text-xs font-medium inline-flex items-center gap-1.5 border border-black/[0.04] dark:border-white/[0.06] transition-colors shrink-0"
                      >
                        <Github className="w-3.5 h-3.5" />
                        <span>Source</span>
                      </a>
                    ) : (
                      <span className="text-[11px] font-medium text-neutral-400 dark:text-neutral-500 inline-flex items-center gap-1.5 shrink-0">
                        <ShieldCheck className="w-3.5 h-3.5 text-neutral-400 dark:text-neutral-500 shrink-0" />
                        <span className="truncate">Production</span>
                      </span>
                    )}
                  </div>

                  {/* Right: Functional, Unclipped Live Preview Button (100% visible on every device) */}
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="bg-neutral-900 hover:bg-neutral-800 text-white dark:bg-white dark:text-neutral-900 dark:hover:bg-neutral-200 px-3 sm:px-3.5 py-1.5 rounded-full text-xs font-medium inline-flex items-center gap-1.5 shadow-sm transition-all hover:scale-[1.02] active:scale-[0.98] shrink-0 whitespace-nowrap ml-auto"
                  >
                    <span>Live Preview</span>
                    <ArrowUpRight className="w-3.5 h-3.5 opacity-80 shrink-0" />
                  </a>
                </div>
              </article>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};

export default AppWrap(
  MotionWrap(WorkSection, "app__works"),
  "work",
  "app__primarybg"
);
