"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./Navbar.scss";
import { ModeToggle } from "../ModeToggle";
import Link from "next/link";
import DynamicScrollNotch from "../DynamicScrollNotch/DynamicScrollNotch";

const navItems = [
  { id: "home", label: "HOME" },
  { id: "about", label: "ABOUT" },
  { id: "work", label: "WORK" },
  { id: "skills", label: "SKILLS" },
  { id: "testimonial", label: "TESTIMONIALS" },
  { id: "contact", label: "CONTACT" },
];

const APPLE_SPRING = {
  type: "spring" as const,
  stiffness: 350,
  damping: 28,
};

const Navbar = () => {
  const [activeSection, setActiveSection] = useState("home");
  const [isScrolled, setIsScrolled] = useState(false);

  // Guarantee page reload opens at the top (hero section) and disables browser auto-scroll to hash
  useEffect(() => {
    if (typeof window !== "undefined") {
      if ("scrollRestoration" in window.history) {
        window.history.scrollRestoration = "manual";
      }

      const resetToTop = () => {
        if (window.location.hash) {
          window.history.replaceState(null, "", window.location.pathname + window.location.search);
        }
        window.scrollTo({ top: 0, left: 0, behavior: "instant" });
      };

      resetToTop();
      const t1 = setTimeout(resetToTop, 50);
      const t2 = setTimeout(resetToTop, 150);
      const t3 = setTimeout(resetToTop, 350);

      return () => {
        clearTimeout(t1);
        clearTimeout(t2);
        clearTimeout(t3);
      };
    }
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      try {
        const currentY = window.scrollY || document.documentElement.scrollTop || 0;
        setIsScrolled(currentY > 80);

        const sections = ["home", "about", "work", "skills", "testimonial", "contact"];
        const scrollPosition = currentY + 220;

        for (const section of sections) {
          const el = document.getElementById(section);
          if (el) {
            const top = el.offsetTop;
            const height = el.offsetHeight;
            if (scrollPosition >= top && scrollPosition < top + height) {
              setActiveSection(section);
              break;
            }
          }
        }
      } catch (err) {
        console.error("handleScroll error:", err);
      }
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    if (id === "home") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    const el = document.getElementById(id);
    if (el) {
      const yOffset = -70;
      const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  return (
    <header className="app__navbar-wrapper">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-4 flex items-center justify-between pointer-events-none relative">
        {/* Desktop Left: Brand Identity */}
        <div className="hidden md:flex pointer-events-auto flex-shrink-0">
          <a
            href="#home"
            onClick={(e) => scrollToSection(e, "home")}
            className="h-9 sm:h-10 px-4 flex items-center justify-center select-none group rounded-full bg-neutral-950/95 dark:bg-black/95 border border-white/15 backdrop-blur-2xl shadow-[0_8px_24px_rgba(0,0,0,0.35)] transition-all hover:border-white/30 hover:scale-[1.02] active:scale-[0.98]"
          >
            <span
              className="text-base sm:text-lg font-black tracking-tight"
              style={{
                color: "#ffffff",
                WebkitTextStroke: "1.4px #000000",
                paintOrder: "stroke fill",
              }}
            >
              Shah
            </span>
            <span
              className="text-base sm:text-lg font-black tracking-tight ml-1"
              style={{
                color: "#ffffff",
                WebkitTextStroke: "1.4px #1f2d6d",
                paintOrder: "stroke fill",
              }}
            >
              Fahid
            </span>
          </a>
        </div>

        {/* Mobile Left: 36px invisible spacer to balance ModeToggle (h-9 w-9) for pixel-perfect dead-center alignment */}
        <div className="md:hidden w-9 h-9 pointer-events-none flex-shrink-0" aria-hidden="true" />

        {/* Center Slot:
            - Mobile: Centered Brand Logo at top (!isScrolled) OR Centered Dynamic Notch when scrolled (isScrolled)
            - Desktop: Centered Links Island at top (!isScrolled) OR Centered Dynamic Notch when scrolled (isScrolled)
        */}
        <div className="pointer-events-auto flex-1 flex items-center justify-center relative px-2">
          <AnimatePresence mode="wait" initial={false}>
            {!isScrolled ? (
              <motion.div
                key="top-center-slot"
                initial={false}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -6, scale: 0.96 }}
                transition={APPLE_SPRING}
                className="flex items-center justify-center"
              >
                {/* Mobile Centered Brand Logo */}
                <div className="md:hidden flex items-center">
                  <a
                    href="#home"
                    onClick={(e) => scrollToSection(e, "home")}
                    className="h-9 px-3.5 flex items-center justify-center select-none group rounded-full bg-neutral-950/95 dark:bg-black/95 border border-white/15 backdrop-blur-2xl shadow-[0_8px_24px_rgba(0,0,0,0.35)] transition-all active:scale-95 hover:border-white/30"
                  >
                    <span
                      className="text-base font-black tracking-tight"
                      style={{
                        color: "#ffffff",
                        WebkitTextStroke: "1.4px #000000",
                        paintOrder: "stroke fill",
                      }}
                    >
                      Shah
                    </span>
                    <span
                      className="text-base font-black tracking-tight ml-1"
                      style={{
                        color: "#ffffff",
                        WebkitTextStroke: "1.4px #1f2d6d",
                        paintOrder: "stroke fill",
                      }}
                    >
                      Fahid
                    </span>
                  </a>
                </div>

                {/* Desktop Links Island */}
                <ul className="hidden md:flex items-center h-9 sm:h-10 gap-0.5 lg:gap-1 px-1.5 rounded-full bg-neutral-950/95 dark:bg-black/95 backdrop-blur-2xl border border-white/15 shadow-[0_8px_24px_rgba(0,0,0,0.35)] list-none m-0">
                  {navItems.map((item) => {
                    const isActive = activeSection === item.id;
                    return (
                      <li key={item.id} className="relative flex items-center justify-center">
                        <a
                          href={`#${item.id}`}
                          onClick={(e) => scrollToSection(e, item.id)}
                          className={`relative z-10 text-[10px] lg:text-[11px] font-semibold tracking-wider px-2.5 lg:px-3.5 py-1 sm:py-1.5 rounded-full transition-colors ${
                            isActive
                              ? "text-white font-bold"
                              : "text-neutral-400 hover:text-white"
                          }`}
                          aria-current={isActive ? "page" : undefined}
                        >
                          {item.label}
                          {isActive && (
                            <motion.span
                              layoutId="island-active-pill"
                              className="absolute inset-0 rounded-full bg-white/[0.18] border border-white/25 shadow-sm -z-10"
                              transition={{ type: "spring", stiffness: 420, damping: 32 }}
                            />
                          )}
                        </a>
                      </li>
                    );
                  })}
                  <li className="relative flex items-center justify-center">
                    <Link
                      href="https://fahid-blogs.vercel.app/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="relative z-10 text-[10px] lg:text-[11px] font-semibold tracking-wider px-2.5 lg:px-3.5 py-1 sm:py-1.5 rounded-full text-neutral-400 hover:text-white transition-colors"
                    >
                      BLOG
                    </Link>
                  </li>
                </ul>
              </motion.div>
            ) : (
              <motion.div
                key="dynamic-notch-center"
                initial={{ opacity: 0, y: -8, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -8, scale: 0.95 }}
                transition={APPLE_SPRING}
              >
                <DynamicScrollNotch threshold={80} activeSection={activeSection} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Right: Direct Contact Button (Desktop Large Only) & Theme Toggle (Always Visible) */}
        <div className="pointer-events-auto flex-shrink-0 flex items-center gap-2 sm:gap-2.5">
          {/* Direct Contact Button — Desktop Only */}
          <a
            href="#contact"
            onClick={(e) => scrollToSection(e, "contact")}
            className="hidden lg:inline-flex items-center justify-center h-9 sm:h-10 px-4 sm:px-5 rounded-full text-xs sm:text-sm font-semibold tracking-tight bg-neutral-950/95 dark:bg-black/95 text-white border border-white/15 backdrop-blur-2xl shadow-[0_8px_24px_rgba(0,0,0,0.35)] hover:border-white/30 hover:scale-[1.02] active:scale-[0.98] transition-all select-none group cursor-pointer"
          >
            <span className="tracking-tight text-white group-hover:text-neutral-200 transition-colors">
              Contact
            </span>
          </a>

          {/* Theme Toggle — Always Visible on Mobile and Desktop */}
          <ModeToggle />
        </div>
      </div>
    </header>
  );
};

export default Navbar;
