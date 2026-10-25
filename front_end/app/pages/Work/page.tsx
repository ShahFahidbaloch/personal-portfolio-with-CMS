"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Github, ArrowUpRight, Globe, ShieldCheck } from "lucide-react";
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
      { label: "KSA 🇸🇦", url: "https://lazurde.com/sa-en" },
      { label: "Egypt 🇪🇬", url: "https://lazurde.com/eg-en" },
      { label: "UAE 🇦🇪", url: "https://lazurde.com/ae-en" },
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
      { label: "KSA 🇸🇦", url: "https://lazurde.com/sa-en/miss-l" },
      { label: "Egypt 🇪🇬", url: "https://lazurde.com/eg-en/miss-l" },
      { label: "UAE 🇦🇪", url: "https://lazurde.com/ae-en/miss-l" },
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
    id: "personal-blog",
    title: "Personal Blog Platform",
    tags: ["Next.js", "React Js", "Web App"],
    description:
      "Fully server-side-rendered dynamic blog with dynamic routing, automated SEO metadata, and headless Sanity CMS integration.",
    image: "/projects/blog.jpg",
    liveUrl: "https://blogs-site-vert.vercel.app/",
    githubUrl: "https://github.com/ShahFahidbaloch/blogs-site",
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
    <section className="relative w-full max-w-6xl mx-auto px-4 sm:px-6 py-12 sm:py-16 select-none">
      {/* Anchor for direct #projects / #work routing */}
      <div id="projects" className="absolute -top-24 pointer-events-none" />
      <div id="work" className="absolute -top-24 pointer-events-none" />

      {/* ================= 1. SECTION HEADER (MATCHING ABOUT HEADING TYPOGRAPHY) ================= */}
      <div className="text-center mb-10 sm:mb-14 max-w-3xl mx-auto">
        <p className="text-xs font-mono uppercase tracking-widest text-neutral-400 dark:text-neutral-500 mb-3 sm:mb-4">
          Portfolio
        </p>
        <h2 className="text-3xl sm:text-5xl lg:text-6xl font-semibold tracking-[-0.03em] leading-[1.12] text-neutral-900 dark:text-white text-center">
          Selected Works.
        </h2>
      </div>

      {/* ================= 2. APPLE SEGMENTED FILTER BAR ================= */}
      <div className="w-full flex justify-center mb-10 sm:mb-12 overflow-x-auto no-scrollbar py-1">
        <div className="bg-neutral-200/80 dark:bg-neutral-900 p-1 rounded-full inline-flex items-center gap-1 border border-black/5 dark:border-white/10 shadow-sm">
          {CATEGORIES.map((tab) => {
            const isActive = activeTab === tab;
            return (
              <button
                key={tab}
                type="button"
                onClick={() => setActiveTab(tab)}
                className={`relative px-4 py-1.5 rounded-full text-xs font-medium transition-colors cursor-pointer select-none whitespace-nowrap ${
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

      {/* ================= 3. APPLE SHOWCASE PROJECTS GRID ================= */}
      <div className="w-full min-h-[440px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 8, scale: 0.99 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.99 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6"
          >
            {filteredProjects.map((project) => (
              <article
                key={project.id}
                className="hero-card-surface rounded-[22px] sm:rounded-[32px] p-4 sm:p-5 lg:p-6 flex flex-col justify-between group transition-all duration-300 ease-out"
              >
                {/* Top Half: Browser Frame & Image */}
                <div>
                  <div className="rounded-[16px] sm:rounded-[22px] overflow-hidden bg-neutral-100 dark:bg-black/40 border border-black/10 dark:border-white/10 mb-4 relative aspect-[16/10] flex flex-col">
                    {/* Minimal Apple Browser Chrome Bar */}
                    <div className="h-6 px-3.5 bg-neutral-200/50 dark:bg-white/[0.06] border-b border-black/5 dark:border-white/5 flex items-center justify-between z-10">
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

                    {/* Image with subtle hover zoom */}
                    <div className="relative flex-1 w-full overflow-hidden">
                      <Image
                        src={project.image}
                        alt={project.title}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="object-cover object-top transition-transform duration-500 ease-out group-hover:scale-[1.02]"
                      />
                    </div>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap items-center gap-1.5 mb-2.5">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-[11px] font-medium text-neutral-500 dark:text-neutral-400 px-2.5 py-1 rounded-full bg-neutral-100 dark:bg-white/[0.06] border border-black/[0.04] dark:border-white/[0.08]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Typography */}
                  <h3 className="text-base font-semibold tracking-tight text-neutral-900 dark:text-white">
                    {project.title}
                  </h3>
                  <p className="mt-1 text-xs sm:text-sm text-neutral-500 dark:text-neutral-400 line-clamp-2 leading-relaxed">
                    {project.description}
                  </p>
                </div>

                {/* Bottom Half: Clean Action Pills & Live Preview */}
                <div className="mt-5 pt-4 border-t border-black/[0.05] dark:border-white/[0.06] flex flex-wrap items-center justify-between gap-2">
                  {/* Left: Regional Pills or Verified Client Badge */}
                  <div className="flex flex-wrap items-center gap-1.5">
                    {project.regionalLinks ? (
                      project.regionalLinks.map((regional) => (
                        <a
                          key={regional.label}
                          href={regional.url}
                          target="_blank"
                          rel="noreferrer"
                          className="bg-neutral-100 hover:bg-neutral-200 text-neutral-800 dark:bg-neutral-800 dark:hover:bg-neutral-700 dark:text-neutral-200 px-2.5 py-1 rounded-full text-xs font-medium border border-black/[0.05] dark:border-white/[0.08] inline-flex items-center gap-1 transition-colors"
                        >
                          {regional.label}
                          <ArrowUpRight className="w-3 h-3 text-neutral-400" />
                        </a>
                      ))
                    ) : project.clientType ? (
                      <span className="text-[11px] font-medium text-neutral-500 dark:text-neutral-400 px-2.5 py-1 rounded-full bg-neutral-100 dark:bg-neutral-800/60 border border-black/[0.04] dark:border-white/[0.06] inline-flex items-center gap-1">
                        <ShieldCheck className="w-3 h-3 text-neutral-500 dark:text-neutral-400" />
                        {project.clientType}
                      </span>
                    ) : null}
                  </div>

                  {/* Right: Mandatory Live Preview & GitHub Button */}
                  <div className="flex items-center gap-1.5 ml-auto">
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noreferrer"
                        aria-label={`${project.title} Source Code`}
                        className="bg-neutral-100 hover:bg-neutral-200 text-neutral-700 dark:bg-white/10 dark:text-neutral-300 dark:hover:bg-white/15 px-3 py-1.5 rounded-full text-xs font-medium inline-flex items-center gap-1.5 border border-black/[0.04] dark:border-white/[0.06] transition-colors"
                      >
                        <Github className="w-3.5 h-3.5" />
                        <span>Source</span>
                      </a>
                    )}

                    {/* Functional Live Preview Button for ALL projects */}
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="bg-neutral-900 hover:bg-neutral-800 text-white dark:bg-white dark:text-neutral-900 dark:hover:bg-neutral-200 px-3.5 py-1.5 rounded-full text-xs font-medium inline-flex items-center gap-1.5 shadow-sm transition-colors"
                    >
                      <span>Live Preview</span>
                      <ArrowUpRight className="w-3.5 h-3.5 opacity-80" />
                    </a>
                  </div>
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
