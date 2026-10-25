"use client";

/**
 * Hero — Apple-style portfolio hero with morphing chips + iPhone mockup.
 *
 *   npm i lucide-react react-icons
 *   Tailwind CSS (v3) required. No animation library needed (pure CSS transitions).
 *
 *   import Hero from "@/components/Hero";
 *   <Hero photo="/me.png" cvHref="/cv.pdf" workHref="#work" />
 *
 * `photo` works best as a transparent PNG (portrait, bottom-cropped).
 * Everything you will want to edit is in the CONFIG block below.
 */

import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import {
  ArrowDown,
  ArrowRight,
  AppWindow,
  Gauge,
  LayoutTemplate,
  Palette,
  ShoppingBag,
  Sparkles,
  Wand2,
  Zap,
} from "lucide-react";
import { SiNextdotjs, SiNodedotjs, SiPython, SiReact } from "react-icons/si";
import { images } from "../../constants";
import { AppWrap } from "../../wrapper";
import "./Header.scss";

/* ───────────────────────────── CONFIG ───────────────────────────── */

const COPY = {
  name: "Shah Fahid",
  eyebrow: "Product engineer with a designer's eye",
  sub: "Engineering logic, design taste. I ship products that load fast, look sharp and are built to convert.",
  proof: "50+ projects shipped",
  primary: "View my work",
  secondary: "Download CV",
};

// Each chip cycles through its items. Authentic vibrant brand colors for icons.
const CHIPS = [
  {
    lead: "I design and build",
    interval: 2400,
    delay: 1400,
    items: [
      { label: "fast websites", Icon: Zap, color: "#EAB308" },
      { label: "e-commerce stores", Icon: ShoppingBag, color: "#10B981" },
      { label: "landing pages", Icon: LayoutTemplate, color: "#6366F1" },
      { label: "web apps", Icon: AppWindow, color: "#0EA5E9" },
    ],
  },
  {
    lead: "with",
    interval: 2800,
    delay: 2000,
    items: [
      { label: "smooth motion", Icon: Wand2, color: "#A855F7" },
      { label: "clean UI", Icon: Palette, color: "#EC4899" },
      { label: "real performance", Icon: Gauge, color: "#06B6D4" },
    ],
  },
  {
    lead: "using",
    interval: 3200,
    delay: 2600,
    items: [
      { label: "Next.js", Icon: SiNextdotjs, color: "currentColor" },
      { label: "React", Icon: SiReact, color: "#61DAFB" },
      { label: "Node.js", Icon: SiNodedotjs, color: "#68A063" },
      { label: "Python", Icon: SiPython, color: "#3776AB" },
      { label: "AI", Icon: Sparkles, color: "#8B5CF6" },
    ],
  },
];

const EASE = "cubic-bezier(0.22, 1, 0.36, 1)";

/* ───────────────────────────── CHIP ───────────────────────────── */
/**
 * How it works (no layout jumps, no double icons):
 *  - All words are rendered stacked inside the chip (absolute), only one is visible.
 *  - A hidden row measures every word's natural width once.
 *  - The chip's width transitions (CSS) to the active word's width.
 *  - Each word is in one of 3 states: "active", "exit" (just left, goes up), "wait" (parked below).
 */
interface ChipItem {
  label: string;
  Icon: React.ComponentType<{ className?: string; style?: React.CSSProperties }>;
  color?: string;
}

interface ChipProps {
  items: ChipItem[];
  interval: number;
  delay: number;
}

function Chip({ items, interval, delay }: ChipProps) {
  const n = items.length;
  const [st, setSt] = useState<{ cur: number; prev: number }>({ cur: 0, prev: -1 });
  const [paused, setPaused] = useState(false);
  const [widths, setWidths] = useState<number[] | null>(null);
  const measureRef = useRef<HTMLSpanElement | null>(null);
  const firstRun = useRef(true);

  const advance = () => setSt((s) => ({ cur: (s.cur + 1) % n, prev: s.cur }));

  // auto-cycle (paused while hovered, off for reduced motion)
  useEffect(() => {
    if (paused) return;
    if (typeof window !== "undefined" && window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return;
    let iv: NodeJS.Timeout | null = null;
    const wait = firstRun.current ? delay : interval;
    firstRun.current = false;
    const t = setTimeout(() => {
      advance();
      iv = setInterval(advance, interval);
    }, wait);
    return () => {
      clearTimeout(t);
      if (iv) clearInterval(iv);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [paused, interval, delay, n]);

  // measure every word's natural width (re-measure when fonts load / size changes / window resizes)
  useLayoutEffect(() => {
    const root = measureRef.current;
    if (!root) return;
    const read = () => {
      const newWidths = Array.from(root.children, (el) =>
        Math.ceil(el.getBoundingClientRect().width)
      );
      if (newWidths.length > 0 && newWidths.some((w) => w > 0)) {
        setWidths(newWidths);
      }
    };

    read();
    const ro = new ResizeObserver(read);
    ro.observe(root);
    window.addEventListener("resize", read);
    window.addEventListener("orientationchange", read);
    if (typeof document !== "undefined" && document.fonts?.ready) {
      document.fonts.ready.then(read);
    }
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", read);
      window.removeEventListener("orientationchange", read);
    };
  }, [items]);

  const layer =
    "absolute inset-y-0 left-0 flex flex-none items-center gap-[0.26em] whitespace-nowrap pl-[0.3em] pr-[0.5em]";

  return (
    <span
      onMouseEnter={() => {
        setPaused(true);
        advance();
      }}
      onMouseLeave={() => setPaused(false)}
      className="relative inline-block h-[1.22em] cursor-default overflow-hidden rounded-[0.62em] bg-black/[0.055] align-middle ring-1 ring-inset ring-black/[0.06] dark:bg-white/[0.09] dark:ring-white/10"
      style={{
        width: widths ? `${widths[st.cur]}px` : undefined,
        transition: widths ? `width 380ms ${EASE}` : "none",
      }}
    >
      {/* Ghost spacer of active item: ensures the chip ALWAYS has exact natural width even before JS measurement */}
      <span
        aria-hidden="true"
        className="invisible flex h-[1.2em] items-center gap-[0.26em] whitespace-nowrap pl-[0.3em] pr-[0.5em]"
      >
        {React.createElement(items[st.cur].Icon, { className: "h-[0.58em] w-[0.58em] flex-none" })}
        {items[st.cur].label}
      </span>

      {/* hidden measurer */}
      <span
        ref={measureRef}
        aria-hidden="true"
        className="pointer-events-none invisible absolute left-0 top-0 flex w-max"
      >
        {items.map(({ label, Icon }) => (
          <span
            key={label}
            className="relative flex h-[1.2em] flex-none items-center gap-[0.26em] whitespace-nowrap pl-[0.3em] pr-[0.5em]"
          >
            <Icon className="h-[0.58em] w-[0.58em] flex-none" />
            {label}
          </span>
        ))}
      </span>

      {items.map(({ label, Icon, color }, idx) => {
        const state = idx === st.cur ? "active" : idx === st.prev ? "exit" : "wait";
        return (
          <span
            key={label}
            aria-hidden={state !== "active"}
            className={layer}
            style={{
              opacity: state === "active" ? 1 : 0,
              transform:
                state === "active"
                  ? "translateY(0)"
                  : state === "exit"
                  ? "translateY(-0.45em)"
                  : "translateY(0.45em)",
              filter: state === "active" ? "blur(0px)" : "blur(4px)",
              transition:
                state === "wait"
                  ? "none"
                  : `opacity 260ms ${EASE}, transform 380ms ${EASE}, filter 260ms ${EASE}`,
            }}
          >
            <Icon className="h-[0.58em] w-[0.58em] flex-none" style={{ color }} />
            {label}
          </span>
        );
      })}
    </span>
  );
}

/* ───────────────────────────── HERO TILE (PHOTO + GLASS CHIPS) ───────────────────────────── */

interface HeroTileProps {
  photo?: string;
  alt?: string;
}

function HeroTile({
  photo = "/images/me.png",
  alt = "Shah Fahid, product engineer",
}: HeroTileProps) {
  return (
    <figure data-hero-tile className="hero-tile">
      {/* Apple black rounded card shape (width matches cyan lines, more rounded: 48px) */}
      <div className="hero-shape">
        {/* Photo wrapper clipped by the rounded card */}
        <div className="hero-shape-backdrop">
          <div className="hero-photo-wrapper">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={photo}
              alt={alt}
              draggable={false}
              className="hero-photo-img"
            />
          </div>
        </div>

        {/* 3 Glass chips with real brand logos hanging over edges */}
        <ul aria-label="Core stack" className="hero-chips-list">
          {/* React: top right, hanging over right edge */}
          <li className="hero-glass-chip hero-chip-react">
            <SiReact className="w-4 h-4 flex-none text-[#61DAFB]" />
            <span>React</span>
          </li>

          {/* Next.js: left side, hanging over left edge */}
          <li className="hero-glass-chip hero-chip-nextjs">
            <SiNextdotjs className="w-4 h-4 flex-none text-black dark:text-white" />
            <span>Next.js</span>
          </li>

          {/* Python: bottom right, hanging over right edge */}
          <li className="hero-glass-chip hero-chip-python">
            <SiPython className="w-4 h-4 flex-none text-[#3776AB]" />
            <span>Python</span>
          </li>
        </ul>
      </div>
    </figure>
  );
}

/* ───────────────────────────── HERO ───────────────────────────── */

interface HeroProps {
  photo?: string | { src: string };
  cvHref?: string;
  workHref?: string;
}

function Hero({
  photo = "/images/me.png",
  cvHref = "/cv.pdf",
  workHref = "#work",
}: HeroProps) {
  const actualPhoto =
    typeof photo === "string" ? photo : (photo?.src ?? "/images/me.png");

  return (
    <section
      aria-labelledby="hero-title"
      className="hero-root hero-section"
    >
      <div className="hero-container">
        <div className="hero-grid">
          {/* text block wrapped in data-hero-text */}
          <div data-hero-text className="hero-text-block">
            {/* eyebrow: gracefully scaling badge with truncation */}
            <div className="hero-eyebrow-row w-full flex justify-center lg:justify-start">
              <div className="hero-eyebrow-badge inline-flex items-center gap-1.5 sm:gap-2 rounded-full bg-black/[0.04] px-3 sm:px-3.5 py-1 sm:py-1.5 text-[11px] sm:text-[13px] font-medium text-neutral-600 ring-1 ring-inset ring-black/[0.06] dark:bg-white/[0.06] dark:text-[#9a9aa1] dark:ring-white/10 max-w-full">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={actualPhoto}
                  alt=""
                  className="h-4 w-4 sm:h-5 sm:w-5 rounded-full bg-neutral-200 object-cover object-top dark:bg-neutral-700 flex-shrink-0"
                />
                <span className="font-semibold text-neutral-900 dark:text-[#f5f5f7] shrink-0">
                  {COPY.name}
                </span>
                <span className="text-neutral-300 dark:text-neutral-600 shrink-0">/</span>
                <span className="text-neutral-700 dark:text-[#9a9aa1] truncate">
                  Product engineer with a designer&apos;s eye
                </span>
              </div>
            </div>

            {/* headline: refined typography and fluid wrapping */}
            <h1
              id="hero-title"
              className="mt-4 sm:mt-6 flex flex-col items-center lg:items-start text-center lg:text-left text-[clamp(1.35rem,4.2vw,2rem)] sm:text-[clamp(1.65rem,3.4vw,2.35rem)] lg:text-[clamp(1.95rem,2.8vw,2.75rem)] font-semibold leading-[1.26] tracking-[-0.035em] text-[#1d1d1f] dark:text-[#f5f5f7] w-full"
            >
              {CHIPS.map((c) => (
                <span
                  key={c.lead}
                  className="flex items-center justify-center lg:justify-start gap-x-[0.28em] py-[0.06em] flex-wrap sm:flex-nowrap"
                >
                  <span className="shrink-0">{c.lead}</span>
                  <Chip items={c.items} interval={c.interval} delay={c.delay} />
                </span>
              ))}
            </h1>

            {/* subline: 16px/1.55 (max 42ch) */}
            <p className="mt-3.5 sm:mt-5 max-w-[42ch] text-[14px] sm:text-[16px] leading-[1.55] text-[#6e6e73] dark:text-[#9a9aa1] text-center lg:text-left mx-auto lg:mx-0">
              {COPY.sub}
            </p>

            {/* CTA Buttons: Centered on mobile/tablet, sleek padding, contained */}
            <div className="mt-6 sm:mt-7 flex flex-row items-center justify-center lg:justify-start gap-2.5 sm:gap-3 flex-wrap sm:flex-nowrap w-full">
              <a
                href={workHref}
                onClick={(e) => {
                  if (workHref.startsWith("#")) {
                    e.preventDefault();
                    const el = document.getElementById(workHref.substring(1));
                    if (el) {
                      const yOffset = -70;
                      const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
                      window.scrollTo({ top: y, behavior: "smooth" });
                    }
                  }
                }}
                className="group inline-flex h-10 sm:h-11 items-center justify-center gap-2 rounded-full bg-neutral-900 px-4 sm:px-5 text-xs sm:text-sm font-medium text-white shadow-sm transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] dark:bg-[#f5f5f7] dark:text-neutral-900 whitespace-nowrap"
              >
                <span>{COPY.primary}</span>
                <ArrowRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5" />
              </a>
              <a
                href={cvHref}
                download="Shah_Fahid_CV.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex h-10 sm:h-11 items-center justify-center gap-2 rounded-full bg-black/[0.05] px-4 sm:px-5 text-xs sm:text-sm font-medium text-neutral-800 ring-1 ring-inset ring-black/[0.08] transition-all duration-200 hover:scale-[1.02] hover:bg-black/[0.08] active:scale-[0.98] dark:bg-white/10 dark:text-[#f5f5f7] dark:ring-white/15 dark:hover:bg-white/15 whitespace-nowrap cursor-pointer select-none"
                aria-label="Download Shah Fahid CV (PDF)"
              >
                <span>{COPY.secondary}</span>
                <ArrowDown className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-y-0.5" />
              </a>
            </div>

            {/* Social Proof: Harmoniously aligned with subtle live pulse indicator */}
            <div className="mt-3.5 sm:mt-4 text-center lg:text-left w-full">
              <span className="inline-flex items-center gap-2 text-xs sm:text-[13px] font-mono tracking-tight text-[#6e6e73] dark:text-[#9a9aa1]">
                <span className="inline-block h-1.5 w-1.5 rounded-full bg-[#86868B]" />
                <span>{COPY.proof}</span>
              </span>
            </div>
          </div>

          {/* tile wrapped in data-hero-tile */}
          <HeroTile photo={actualPhoto} alt="Shah Fahid, product engineer" />
        </div>
      </div>
    </section>
  );
}

export default AppWrap(Hero, "home", "app__apple-hero-bg");
export { Hero };