"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowUp, ArrowUpRight, Check, Copy } from "lucide-react";
import { FaGithub, FaLinkedinIn, FaInstagram } from "react-icons/fa";
import { AppWrap } from "../../wrapper";
import "./Footer.scss";

const Footer: React.FC = () => {
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText("shahfahidbaloch@gmail.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const scrollToTop = () => {
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    if (typeof window !== "undefined") {
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
    }
  };

  return (
    <footer className="relative w-full overflow-hidden bg-[#F5F5F7] dark:bg-[#000000] text-neutral-900 dark:text-white pt-16 sm:pt-24 pb-0 select-none transition-colors duration-300">
      {/* Background radial specular glow */}
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-48 opacity-35 dark:opacity-25 transition-opacity"
        style={{
          background:
            "radial-gradient(ellipse 60% 80% at 50% 0%, rgba(120, 120, 128, 0.15), transparent 75%)",
        }}
      />

      {/* Main Center Content Container */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 flex flex-col items-center text-center">
        {/* Availability Badge */}
        <div className="inline-flex items-center px-3.5 py-1.5 rounded-full bg-black/[0.04] dark:bg-white/[0.04] border border-black/10 dark:border-white/10 text-xs font-mono mb-6 transition-colors">
          <span className="text-neutral-700 dark:text-neutral-300">Open for Select Roles &amp; Consultations</span>
        </div>

        {/* Headline matching About section typography */}
        <h2 className="text-3xl sm:text-5xl lg:text-6xl font-semibold tracking-[-0.03em] leading-[1.12] text-neutral-950 dark:text-white max-w-3xl mb-8 transition-colors">
          Let&apos;s build something extraordinary together.
        </h2>

        {/* Direct Email Action Pill */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-12">
          <a
            href="mailto:shahfahidbaloch@gmail.com"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-neutral-950 dark:bg-white text-white dark:text-black font-medium text-xs sm:text-sm hover:bg-neutral-800 dark:hover:bg-neutral-200 transition-colors shadow-sm"
          >
            <span>Get in touch</span>
            <ArrowUpRight className="w-4 h-4" />
          </a>

          <button
            type="button"
            onClick={handleCopyEmail}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-black/[0.04] dark:bg-white/[0.06] hover:bg-black/[0.08] dark:hover:bg-white/[0.12] border border-black/10 dark:border-white/10 hover:border-black/20 dark:hover:border-white/20 text-xs sm:text-sm font-mono text-neutral-700 dark:text-neutral-300 hover:text-neutral-950 dark:hover:text-white transition-all cursor-pointer"
            title="Copy email to clipboard"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-neutral-900 dark:text-white" />
                <span className="text-neutral-900 dark:text-white font-medium">Copied to clipboard</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5 text-neutral-500 dark:text-neutral-400" />
                <span>shahfahidbaloch@gmail.com</span>
              </>
            )}
          </button>
        </div>

        {/* Navigation & Social Row */}
        <div className="w-full max-w-2xl flex flex-wrap items-center justify-between gap-4 py-6 border-y border-black/[0.08] dark:border-white/[0.08] mb-8 transition-colors">
          {/* Social Links */}
          <div className="flex items-center gap-5">
            <Link
              href="https://github.com/ShahFahidbaloch"
              target="_blank"
              rel="noopener noreferrer"
              className="text-neutral-500 hover:text-neutral-950 dark:text-neutral-400 dark:hover:text-white transition-colors p-1"
              aria-label="GitHub"
            >
              <FaGithub className="w-4 h-4" />
            </Link>
            <Link
              href="https://www.linkedin.com/in/shah-fahid-a4543027b/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-neutral-500 hover:text-neutral-950 dark:text-neutral-400 dark:hover:text-white transition-colors p-1"
              aria-label="LinkedIn"
            >
              <FaLinkedinIn className="w-4 h-4" />
            </Link>
            <Link
              href="https://www.instagram.com/mr_fahid.dev/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-neutral-500 hover:text-neutral-950 dark:text-neutral-400 dark:hover:text-white transition-colors p-1"
              aria-label="Instagram"
            >
              <FaInstagram className="w-4 h-4" />
            </Link>
          </div>

          {/* Quick Section Anchors */}
          <div className="flex items-center gap-4 text-xs font-mono text-neutral-600 dark:text-[#86868B]">
            <a
              href="#about"
              onClick={(e) => scrollToSection(e, "about")}
              className="hover:text-neutral-950 dark:hover:text-white transition-colors"
            >
              About
            </a>
            <span className="text-neutral-400 dark:text-neutral-600">/</span>
            <a
              href="#work"
              onClick={(e) => scrollToSection(e, "work")}
              className="hover:text-neutral-950 dark:hover:text-white transition-colors"
            >
              Work
            </a>
            <span className="text-neutral-400 dark:text-neutral-600">/</span>
            <a
              href="#skills"
              onClick={(e) => scrollToSection(e, "skills")}
              className="hover:text-neutral-950 dark:hover:text-white transition-colors"
            >
              Skills
            </a>
            <span className="text-neutral-400 dark:text-neutral-600">/</span>
            <a
              href="#testimonial"
              onClick={(e) => scrollToSection(e, "testimonial")}
              className="hover:text-neutral-950 dark:hover:text-white transition-colors"
            >
              Reviews
            </a>
            <span className="text-neutral-400 dark:text-neutral-600">/</span>
            <a
              href="/cv.pdf"
              download="Shah_Fahid_CV.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-neutral-950 dark:hover:text-white transition-colors"
            >
              CV (PDF)
            </a>
          </div>

          {/* Back to Top Indicator */}
          <button
            type="button"
            onClick={scrollToTop}
            className="group inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-black/10 dark:border-white/10 hover:border-black/25 dark:hover:border-white/25 bg-black/[0.03] dark:bg-white/[0.03] hover:bg-black/[0.08] dark:hover:bg-white/[0.08] text-xs font-mono text-neutral-600 hover:text-neutral-950 dark:text-neutral-400 dark:hover:text-white transition-all cursor-pointer"
            aria-label="Scroll back to top"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3 h-3 group-hover:-translate-y-0.5 transition-transform" />
          </button>
        </div>

        {/* Minimal Copyright & Credits */}
        <div className="flex flex-wrap items-center justify-center gap-2 text-xs font-mono text-neutral-500 dark:text-neutral-500 tracking-wider">
          <span>© {new Date().getFullYear()} Shah Fahid · All rights reserved.</span>
          <span>·</span>
          <span className="opacity-80 hover:opacity-100 transition-opacity">
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://icons8.com/icon/WC0vQTAiqiCy/robot"
              className="hover:text-neutral-900 dark:hover:text-white transition-colors"
            >
              Robot
            </a>{" "}
            by{" "}
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://icons8.com"
            >
              Icons8
            </a>
          </span>
        </div>
      </div>

      {/* =====================================================================
          THE CUTOFF GIANT WATERMARK ("SHAH FAHID") — VIDYST STYLE
          Positioned to overflow and vertically cut off at the bottom edge
         ===================================================================== */}
      <div
        className="pointer-events-none select-none w-full overflow-hidden flex justify-center mt-6 sm:mt-10 -mb-4 sm:-mb-6 lg:-mb-8"
        aria-hidden="true"
      >
        <span
          className="text-[16vw] sm:text-[18vw] lg:text-[20vw] font-black tracking-[-0.04em] leading-[0.72] text-neutral-900 opacity-[0.16] sm:opacity-[0.20] dark:text-white dark:opacity-[0.22] sm:dark:opacity-[0.28] whitespace-nowrap transition-all duration-300"
          style={{
            WebkitMaskImage:
              "linear-gradient(to top, rgba(0,0,0,1) 40%, rgba(0,0,0,0.3) 85%, transparent 100%)",
            maskImage:
              "linear-gradient(to top, rgba(0,0,0,1) 40%, rgba(0,0,0,0.3) 85%, transparent 100%)",
          }}
        >
          SHAH FAHID
        </span>
      </div>
    </footer>
  );
};

export default AppWrap(
  Footer,
  "contact",
  "app__footer-wrap"
);
