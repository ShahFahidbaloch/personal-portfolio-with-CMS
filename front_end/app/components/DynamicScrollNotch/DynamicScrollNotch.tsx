"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Home,
  User,
  FolderGit2,
  Layers,
  Briefcase,
  Quote,
  Send,
  BookOpen,
  ExternalLink,
  ChevronDown,
  X,
  LucideIcon,
} from "lucide-react";

export interface NavSection {
  id: string;
  label: string;
  icon: LucideIcon;
  targetId: string;
  url?: string;
  isExternal?: boolean;
}

export interface DynamicScrollNotchProps {
  threshold?: number;
  accentColor?: string;
  activeSection?: string;
  className?: string;
}

export const PORTFOLIO_SECTIONS: NavSection[] = [
  { id: "home", label: "Home", icon: Home, targetId: "home" },
  { id: "about", label: "About", icon: User, targetId: "about" },
  { id: "work", label: "Projects", icon: FolderGit2, targetId: "work" },
  { id: "skills", label: "Skills", icon: Layers, targetId: "skills" },
  { id: "testimonial", label: "Testimonials", icon: Quote, targetId: "testimonial" },
  { id: "contact", label: "Contact", icon: Send, targetId: "contact" },
  { id: "blog", label: "Blog", icon: BookOpen, targetId: "", url: "https://fahid-blogs.vercel.app/", isExternal: true },
];

const APPLE_SPRING = {
  type: "spring" as const,
  stiffness: 350,
  damping: 28,
};

export const DynamicScrollNotch: React.FC<DynamicScrollNotchProps> = ({
  threshold = 80,
  accentColor = "#facc15", // Warm Apple amber gold
  activeSection,
  className = "",
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeId, setActiveId] = useState(activeSection || "home");
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (activeSection) {
      setActiveId(activeSection);
    }
  }, [activeSection]);

  // 1. Calculate window scroll progress & active section
  const handleScroll = useCallback(() => {
    if (typeof window === "undefined") return;

    const currentScroll = window.scrollY || document.documentElement.scrollTop || 0;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = docHeight > 0 ? Math.min(Math.max(currentScroll / docHeight, 0), 1) : 0;

    setScrollProgress(progress);

    // Dynamic active section detection based on focal point in viewport
    const scrollPos = currentScroll + 220;
    const scrollableSections = PORTFOLIO_SECTIONS.filter((s) => !s.isExternal && s.targetId);

    for (let i = scrollableSections.length - 1; i >= 0; i--) {
      const item = scrollableSections[i];
      const targetElement = document.getElementById(item.targetId);

      if (targetElement) {
        const top = targetElement.offsetTop;
        if (scrollPos >= top) {
          setActiveId(item.id);
          break;
        }
      }
    }
  }, []);

  useEffect(() => {
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  // 2. Click outside & Escape key listeners for seamless dismissal
  useEffect(() => {
    if (!isExpanded) return;

    const handlePointerDown = (e: MouseEvent | TouchEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setIsExpanded(false);
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsExpanded(false);
      }
    };

    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("touchstart", handlePointerDown);
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("touchstart", handlePointerDown);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isExpanded]);

  // 3. Smooth scrolling to selected section
  const handleSelectSection = (item: NavSection) => {
    setIsExpanded(false);

    if (item.isExternal && item.url) {
      window.open(item.url, "_blank", "noopener,noreferrer");
      return;
    }

    if (typeof window === "undefined") return;

    const targetElement = document.getElementById(item.targetId);
    if (targetElement) {
      const yOffset = -70; // Offset below header
      const y = targetElement.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  const activeItem = PORTFOLIO_SECTIONS.find((i) => i.id === activeId) || PORTFOLIO_SECTIONS[0];

  // SVG circular progress parameters (clean line, no interior icon)
  const ringRadius = 8;
  const ringCircumference = 2 * Math.PI * ringRadius;
  const strokeDashoffset = ringCircumference - scrollProgress * ringCircumference;

  return (
    <>
      {/* Full-screen backdrop ONLY when expanded to capture outside clicks with ZERO background blur */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            key="notch-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.12 }}
            onClick={() => setIsExpanded(false)}
            className="fixed inset-0 z-40 bg-transparent pointer-events-auto"
            aria-hidden="true"
          />
        )}
      </AnimatePresence>

      {/* Center Notch Anchor */}
      <div className={`relative flex items-center justify-center z-50 ${className}`}>
        {/* Invisible layout spacer to keep parent flexbox steady */}
        <div className="h-9 sm:h-10 w-[116px] opacity-0 pointer-events-none" aria-hidden="true" />

        <div className="absolute top-0 left-1/2 -translate-x-1/2 flex justify-center pointer-events-none">
          <motion.div
            ref={containerRef}
            layout
            transition={APPLE_SPRING}
            whileHover={!isExpanded ? { scale: 1.02 } : undefined}
            whileTap={!isExpanded ? { scale: 0.98 } : undefined}
            className={`relative overflow-hidden pointer-events-auto bg-neutral-950/95 dark:bg-black/95 backdrop-blur-2xl border border-white/15 shadow-[0_16px_36px_rgba(0,0,0,0.45)] select-none text-white transform-gpu will-change-transform ${
              isExpanded
                ? "w-[290px] sm:w-[310px] max-w-[92vw] rounded-[24px] p-2.5"
                : "h-9 sm:h-10 rounded-full px-3.5 py-1.5 flex items-center gap-2 cursor-pointer hover:border-white/30 transition-colors group"
            }`}
            onClick={!isExpanded ? () => setIsExpanded(true) : undefined}
            role="region"
            aria-label="Dynamic Scroll Navigation Notch"
          >
            {/* Top Bar: Collapsed Notch Content / Expanded Header */}
            <motion.div
              layout="position"
              transition={APPLE_SPRING}
              className={`flex items-center justify-between w-full ${
                isExpanded
                  ? "p-1.5 rounded-xl cursor-pointer hover:bg-white/[0.06] transition-colors"
                  : ""
              }`}
              onClick={isExpanded ? () => setIsExpanded(false) : undefined}
            >
              {/* Left: Clean circular SVG line + Active Section Title */}
              <div className="flex items-center gap-2">
                <div className="relative flex items-center justify-center w-5 h-5 flex-shrink-0">
                  <svg
                    className="w-full h-full transform -rotate-90 pointer-events-none"
                    viewBox="0 0 20 20"
                    aria-hidden="true"
                  >
                    {/* Background Track Circle */}
                    <circle
                      cx="10"
                      cy="10"
                      r={ringRadius}
                      stroke="rgba(255, 255, 255, 0.2)"
                      strokeWidth="2.2"
                      fill="none"
                    />
                    {/* Clean Circular Progress Arc */}
                    <circle
                      cx="10"
                      cy="10"
                      r={ringRadius}
                      stroke={accentColor}
                      strokeWidth="2.2"
                      strokeLinecap="round"
                      fill="none"
                      strokeDasharray={ringCircumference}
                      strokeDashoffset={strokeDashoffset}
                      style={{
                        transition: "stroke-dashoffset 120ms cubic-bezier(0.16, 1, 0.3, 1)",
                      }}
                    />
                  </svg>
                </div>

                {/* Section title with micro-animation */}
                <AnimatePresence mode="wait">
                  <motion.span
                    key={activeItem.label}
                    initial={{ opacity: 0, y: 3 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -3 }}
                    transition={{ duration: 0.15 }}
                    className="text-xs font-semibold tracking-tight text-white whitespace-nowrap"
                  >
                    {activeItem.label}
                  </motion.span>
                </AnimatePresence>
              </div>

              {/* Right: Down chevron when collapsed / CLOSE when expanded */}
              {!isExpanded ? (
                <div className="flex items-center text-neutral-400 pl-0.5">
                  <ChevronDown className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-y-0.5 text-neutral-400 group-hover:text-white" />
                </div>
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-white/[0.08] hover:bg-white/[0.14] text-[10px] uppercase font-bold tracking-wider text-neutral-300"
                >
                  <span>Close</span>
                  <X className="w-3 h-3" />
                </motion.div>
              )}
            </motion.div>

            {/* Expanded Menu Items List */}
            <AnimatePresence>
              {isExpanded && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98, transition: { duration: 0.12 } }}
                  transition={APPLE_SPRING}
                  className="overflow-hidden mt-1.5 pt-1.5 border-t border-white/[0.08]"
                >
                  <nav className="flex flex-col gap-1 py-1">
                    {PORTFOLIO_SECTIONS.map((item, index) => {
                      const ItemIcon = item.icon;
                      const isActive = item.id === activeId;

                      return (
                        <motion.button
                          key={item.id}
                          type="button"
                          initial={{ opacity: 0, x: -6 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{
                            delay: index * 0.02,
                            type: "spring",
                            stiffness: 400,
                            damping: 30,
                          }}
                          onClick={(e) => {
                            e.stopPropagation();
                            handleSelectSection(item);
                          }}
                          className={`min-h-[44px] flex items-center justify-between w-full px-3 py-2 rounded-xl text-xs font-medium tracking-tight transition-all duration-150 text-left ${
                            isActive
                              ? "bg-white/[0.12] text-white font-semibold"
                              : "text-neutral-300 hover:bg-white/[0.06] hover:text-white"
                          }`}
                        >
                          <div className="flex items-center gap-2.5">
                            <ItemIcon
                              className={`w-4 h-4 ${
                                isActive ? "text-amber-400" : "text-neutral-400"
                              }`}
                            />
                            <span>{item.label}</span>
                          </div>

                          {/* Active Indicator Dot or External Link Badge */}
                          {isActive ? (
                            <motion.span
                              layoutId="notch-active-dot"
                              className="w-1.5 h-1.5 rounded-full bg-amber-400 shadow-[0_0_8px_rgba(250,204,21,0.8)]"
                              transition={APPLE_SPRING}
                            />
                          ) : item.isExternal ? (
                            <ExternalLink className="w-3.5 h-3.5 text-neutral-500" />
                          ) : null}
                        </motion.button>
                      );
                    })}
                  </nav>

                  {/* Bottom Footer / Status Capsule */}
                  <div className="mt-1 pt-2 pb-0.5 px-3 border-t border-white/[0.06] flex items-center justify-between text-[11px] text-neutral-400">
                    <span>Available for projects</span>
                    <span className="text-neutral-400 text-[10px] font-mono">
                      {Math.round(scrollProgress * 100)}%
                    </span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default DynamicScrollNotch;
