"use client";

import React from "react";
import { ArrowUpRight } from "lucide-react";
import {
  SiReact,
  SiNextdotjs,
  SiTypescript,
  SiTailwindcss,
  SiShopify,
  SiBigcommerce,
  SiSanity,
  SiNodedotjs,
  SiOpenai,
  SiApple,
} from "react-icons/si";
import { AppWrap, MotionWrap } from "../../wrapper";
import "./About.scss";

// Waveform bar heights array for varied, organic rhythm
const WAVEFORM_HEIGHTS = [8, 14, 22, 16, 26, 12, 20, 10, 24, 18, 14, 22, 10, 16, 24, 8];

const About: React.FC = () => {
  return (
    <section className="relative w-full max-w-6xl mx-auto px-4 sm:px-6 py-10 sm:py-16 select-none">
      {/* ================= 1. SECTION HEADER (VIDYST STYLE) ================= */}
      <div className="text-center mb-10 sm:mb-14 max-w-3xl mx-auto">
        {/* Small Category Label */}
        <p className="text-xs font-mono uppercase tracking-widest text-neutral-400 dark:text-neutral-500 mb-2 sm:mb-3">
          Features
        </p>

        {/* Main Headline (Clean Monochromatic Typography - No Text Icon) */}
        <h2 className="text-3xl sm:text-5xl lg:text-6xl font-semibold tracking-[-0.03em] leading-[1.12] text-[#111113] dark:text-white">
          A whole studio. One developer.
        </h2>
      </div>

      {/* ================= 2. ASYMMETRIC 12-COLUMN BENTO GRID ================= */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 max-w-6xl mx-auto">
        {/* ================= CARD 1: FRONTEND & DUAL-CANVAS PREVIEW (col-span-7) ================= */}
        <div className="lg:col-span-7 hero-card-surface rounded-[24px] sm:rounded-[36px] p-5 sm:p-7 lg:p-8 flex flex-col justify-between group transition-colors duration-300">
          {/* Top Interactive Micro-UI: Dual-Canvas Video / Code Preview */}
          <div className="w-full rounded-[18px] sm:rounded-[24px] bg-neutral-100/70 dark:bg-black/35 border border-black/[0.05] dark:border-white/[0.08] p-4 sm:p-5 mb-5 sm:mb-6 flex flex-col gap-4 shadow-inner">
            {/* Dual Frame Preview Windows */}
            <div className="flex items-center justify-between gap-4">
              {/* 16:9 Desktop Canvas Frame */}
              <div className="flex-1 aspect-[16/10] sm:aspect-video rounded-xl bg-white dark:bg-[#202024] border border-black/10 dark:border-white/10 p-3.5 flex flex-col justify-between shadow-sm relative overflow-hidden">
                {/* Header with live status */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-neutral-900 dark:bg-white" />
                    <span className="text-[10px] font-mono font-semibold text-neutral-800 dark:text-neutral-200 uppercase tracking-wider">
                      Server Components
                    </span>
                  </div>
                  <span className="text-[10px] font-mono text-neutral-400 dark:text-neutral-500">
                    Responsive Canvas
                  </span>
                </div>

                {/* Wireframe Mockup Lines */}
                <div className="space-y-2 my-auto">
                  <div className="h-2 w-3/4 rounded-full bg-neutral-200 dark:bg-neutral-700" />
                  <div className="h-2 w-1/2 rounded-full bg-neutral-200/70 dark:bg-neutral-700/70" />
                </div>

                {/* Footer Tag */}
                <div className="flex items-center justify-between pt-2 border-t border-black/5 dark:border-white/5">
                  <span className="text-[10px] font-medium text-neutral-500 dark:text-neutral-400">
                    Next.js App Router
                  </span>
                  <span className="text-[10px] font-mono text-neutral-500 dark:text-neutral-400 font-medium">
                    Zero CLS · 100 Score
                  </span>
                </div>
              </div>

              {/* 9:16 Mobile Canvas Frame (Responsive View) */}
              <div className="w-24 sm:w-28 aspect-[9/16] rounded-xl bg-white dark:bg-[#202024] border border-black/10 dark:border-white/10 p-2.5 hidden sm:flex flex-col justify-between shadow-sm">
                <div className="w-6 h-1 rounded-full bg-neutral-300 dark:bg-neutral-600 mx-auto" />
                <div className="space-y-1.5">
                  <div className="h-1.5 w-full rounded bg-neutral-200 dark:bg-neutral-700" />
                  <div className="h-1.5 w-3/4 rounded bg-neutral-200 dark:bg-neutral-700" />
                </div>
                <div className="h-4 rounded-md bg-neutral-100 dark:bg-neutral-800 border border-black/5 dark:border-white/5 flex items-center justify-center text-[8px] font-mono text-neutral-400">
                  Mobile
                </div>
              </div>
            </div>

            {/* Platform Icons Pill Row */}
            <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-black/[0.04] dark:border-white/[0.05]">
              <span className="text-[11px] font-mono text-neutral-400 dark:text-neutral-500 mr-1">
                Stack:
              </span>
              <div className="bg-white dark:bg-[#202024] px-2.5 py-1 rounded-full border border-black/[0.08] dark:border-white/10 inline-flex items-center gap-1.5 shadow-sm text-xs font-medium text-neutral-800 dark:text-neutral-200">
                <SiNextdotjs className="w-3.5 h-3.5 text-black dark:text-white" />
                <span>Next.js</span>
              </div>
              <div className="bg-white dark:bg-[#202024] px-2.5 py-1 rounded-full border border-black/[0.08] dark:border-white/10 inline-flex items-center gap-1.5 shadow-sm text-xs font-medium text-neutral-800 dark:text-neutral-200">
                <SiReact className="w-3.5 h-3.5 text-[#61DAFB]" />
                <span>React</span>
              </div>
              <div className="bg-white dark:bg-[#202024] px-2.5 py-1 rounded-full border border-black/[0.08] dark:border-white/10 inline-flex items-center gap-1.5 shadow-sm text-xs font-medium text-neutral-800 dark:text-neutral-200">
                <SiTypescript className="w-3.5 h-3.5 text-[#3178C6]" />
                <span>TypeScript</span>
              </div>
              <div className="bg-white dark:bg-[#202024] px-2.5 py-1 rounded-full border border-black/[0.08] dark:border-white/10 inline-flex items-center gap-1.5 shadow-sm text-xs font-medium text-neutral-800 dark:text-neutral-200">
                <SiTailwindcss className="w-3.5 h-3.5 text-[#38BDF8]" />
                <span>Tailwind</span>
              </div>
            </div>
          </div>

          {/* Card Headings: Left-aligned, generous spacing */}
          <div>
            <h3 className="text-xl sm:text-2xl font-semibold tracking-tight text-neutral-900 dark:text-white">
              Modern Component Architecture
            </h3>
            <p className="text-sm text-neutral-500 dark:text-neutral-400 mt-2 max-w-md leading-relaxed">
              Pixel-perfect web applications built with Next.js, React, and TypeScript with fluid responsive layouts and zero layout shifts.
            </p>
          </div>
        </div>

        {/* ================= CARD 2: HEADLESS COMMERCE & CHECKOUT (col-span-5) ================= */}
        <div className="lg:col-span-5 hero-card-surface rounded-[24px] sm:rounded-[36px] p-5 sm:p-7 lg:p-8 flex flex-col justify-between group transition-colors duration-300">
          {/* Top Interactive Micro-UI: Metric Counter & Apple Pay Pill */}
          <div className="w-full rounded-[18px] sm:rounded-[24px] bg-neutral-100/70 dark:bg-black/35 border border-black/[0.05] dark:border-white/[0.08] p-4 sm:p-5 mb-5 sm:mb-6 flex flex-col justify-between gap-4 shadow-inner">
            {/* Bold Live Metric Counter */}
            <div className="flex items-start justify-between">
              <div>
                <span className="text-3xl sm:text-4xl font-semibold tracking-tight text-neutral-900 dark:text-white font-mono">
                  0.2s
                </span>
                <p className="text-xs font-medium text-neutral-500 dark:text-neutral-400 mt-1">
                  Sub-second TTFB on global Edge CDN
                </p>
              </div>

              {/* Status Indicator */}
              <span className="inline-flex items-center px-2.5 py-1 rounded-full bg-black/[0.04] dark:bg-white/[0.06] text-neutral-700 dark:text-neutral-300 border border-black/[0.08] dark:border-white/10 text-xs font-mono">
                <span>99.9% HIT</span>
              </span>
            </div>

            {/* Apple Pay Express Checkout Pill & Brand Badges */}
            <div className="flex flex-wrap items-center gap-2 pt-3 border-t border-black/[0.04] dark:border-white/[0.05]">
              <div className="bg-black text-white dark:bg-white dark:text-black px-3.5 py-1.5 rounded-full inline-flex items-center gap-1.5 text-xs font-medium shadow-sm transition-transform duration-200">
                <SiApple className="w-3.5 h-3.5" />
                <span>Pay</span>
              </div>
              <div className="bg-white dark:bg-[#181920] px-2.5 py-1 rounded-full border border-black/[0.08] dark:border-white/10 inline-flex items-center gap-1.5 text-xs font-medium text-neutral-800 dark:text-neutral-200 shadow-sm">
                <SiShopify className="w-3.5 h-3.5 text-[#96BF48]" />
                <span>Shopify</span>
              </div>
              <div className="bg-white dark:bg-[#181920] px-2.5 py-1 rounded-full border border-black/[0.08] dark:border-white/10 inline-flex items-center gap-1.5 text-xs font-medium text-neutral-800 dark:text-neutral-200 shadow-sm">
                <SiBigcommerce className="w-3.5 h-3.5 text-[#0D52FF]" />
                <span>BigCommerce</span>
              </div>
            </div>
          </div>

          {/* Card Headings */}
          <div>
            <h3 className="text-lg sm:text-xl font-semibold tracking-tight text-neutral-900 dark:text-white">
              Headless E-Commerce
            </h3>
            <p className="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400 mt-1.5 max-w-sm leading-relaxed">
              Custom Shopify &amp; BigCommerce headless stores with 1-click Apple Pay checkout, cart-session resilience, and CDN acceleration.
            </p>
          </div>
        </div>

        {/* ================= CARD 3: REAL-TIME WAVEFORM & SYNC (col-span-5) ================= */}
        <div className="lg:col-span-5 hero-card-surface rounded-[24px] sm:rounded-[36px] p-5 sm:p-7 lg:p-8 flex flex-col justify-between group transition-colors duration-300">
          {/* Top Interactive Micro-UI: Live Waveform Bars & Sync Stats */}
          <div className="w-full rounded-[18px] sm:rounded-[24px] bg-neutral-100/70 dark:bg-black/35 border border-black/[0.05] dark:border-white/[0.08] p-4 sm:p-5 mb-5 sm:mb-6 flex flex-col justify-between gap-4 shadow-inner">
            {/* Live Waveform Bars Display */}
            <div className="flex items-center justify-between">
              <div>
                <span className="text-2xl sm:text-3xl font-semibold tracking-tight text-neutral-900 dark:text-white font-mono">
                  99.99%
                </span>
                <p className="text-xs font-medium text-neutral-500 dark:text-neutral-400 mt-1">
                  API Uptime &amp; Webhook Sync
                </p>
              </div>

              {/* Animated Waveform Visualizer */}
              <div className="flex items-end gap-1 h-8 px-2 py-1 bg-white dark:bg-[#181920] rounded-xl border border-black/[0.08] dark:border-white/10 shadow-sm">
                {WAVEFORM_HEIGHTS.slice(0, 10).map((h, i) => (
                  <span
                    key={i}
                    className="w-1 rounded-full bg-neutral-900 dark:bg-white animate-vidyst-waveform"
                    style={{
                      height: `${h}px`,
                      animationDelay: `${i * 0.12}s`,
                    }}
                  />
                ))}
              </div>
            </div>

            {/* Connected Platform Pills */}
            <div className="flex flex-wrap items-center gap-2 pt-3 border-t border-black/[0.04] dark:border-white/[0.05]">
              <div className="bg-white dark:bg-[#181920] px-2.5 py-1 rounded-full border border-black/[0.08] dark:border-white/10 inline-flex items-center gap-1.5 text-xs font-medium text-neutral-800 dark:text-neutral-200 shadow-sm">
                <SiSanity className="w-3.5 h-3.5 text-[#F03E2F]" />
                <span>Sanity</span>
              </div>
              <div className="bg-white dark:bg-[#181920] px-2.5 py-1 rounded-full border border-black/[0.08] dark:border-white/10 inline-flex items-center gap-1.5 text-xs font-medium text-neutral-800 dark:text-neutral-200 shadow-sm">
                <SiNodedotjs className="w-3.5 h-3.5 text-[#5FA04E]" />
                <span>Node.js</span>
              </div>
              <span className="text-[11px] font-mono text-neutral-400 dark:text-neutral-500 px-2 py-0.5 rounded bg-black/[0.03] dark:bg-white/[0.04]">
                REST &amp; GraphQL
              </span>
            </div>
          </div>

          {/* Card Headings */}
          <div>
            <h3 className="text-lg sm:text-xl font-semibold tracking-tight text-neutral-900 dark:text-white">
              Scalable APIs &amp; Content Hub
            </h3>
            <p className="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400 mt-1.5 max-w-sm leading-relaxed">
              Resilient REST APIs, Node.js microservices, Shopify-to-MuleSoft middleware pipelines, and headless Sanity CMS content modeling.
            </p>
          </div>
        </div>

        {/* ================= CARD 4: AI SOLUTIONS & 100 LIGHTHOUSE (col-span-7) ================= */}
        <div className="lg:col-span-7 hero-card-surface rounded-[24px] sm:rounded-[36px] p-5 sm:p-7 lg:p-8 flex flex-col justify-between group transition-colors duration-300">
          {/* Top Interactive Micro-UI: AI Stream Box & Circular 100 Score */}
          <div className="w-full rounded-[18px] sm:rounded-[24px] bg-neutral-100/70 dark:bg-black/35 border border-black/[0.05] dark:border-white/[0.08] p-4 sm:p-5 mb-5 sm:mb-6 flex flex-col sm:flex-row items-center justify-between gap-5 shadow-inner">
            {/* OpenAI Real-time Streaming Prompt Box */}
            <div className="flex-1 w-full flex items-center gap-3 bg-white dark:bg-[#202024] border border-black/[0.08] dark:border-white/10 p-3.5 rounded-2xl shadow-sm">
              <div className="w-9 h-9 rounded-xl bg-[#10A37F]/10 flex items-center justify-center shrink-0">
                <SiOpenai className="w-5 h-5 text-[#10A37F]" />
              </div>
              <div className="flex flex-col text-left overflow-hidden">
                <span className="text-[10px] font-mono text-neutral-400 dark:text-neutral-500 truncate">
                  prompt: &quot;Optimize bundle &amp; stream responses&quot;
                </span>
                <span className="text-xs font-semibold text-neutral-800 dark:text-neutral-200 flex items-center gap-1.5 mt-0.5">
                  Streaming 200ms TTFT
                  <span className="inline-block w-1.5 h-3.5 bg-[#10A37F] animate-pulse" />
                </span>
              </div>
            </div>

            {/* Circular 100 Lighthouse Performance Gauge */}
            <div className="flex items-center gap-3 shrink-0">
              <div className="relative w-12 h-12 flex items-center justify-center">
                <svg className="w-12 h-12 -rotate-90" viewBox="0 0 36 36">
                  <path
                    className="text-neutral-200 dark:text-neutral-700"
                    strokeWidth="3.2"
                    stroke="currentColor"
                    fill="none"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                  <path
                    className="text-[#10A37F]"
                    strokeDasharray="100, 100"
                    strokeWidth="3.2"
                    strokeLinecap="round"
                    stroke="currentColor"
                    fill="none"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                </svg>
                <span className="absolute text-xs font-bold text-neutral-900 dark:text-white font-mono">
                  100
                </span>
              </div>
              <div className="flex flex-col text-left">
                <span className="text-xs font-semibold text-neutral-800 dark:text-neutral-200">
                  Lighthouse 100
                </span>
                <span className="text-[10px] text-neutral-400 dark:text-neutral-500">
                  Maximum Speed
                </span>
              </div>
            </div>
          </div>

          {/* Card Headings */}
          <div>
            <h3 className="text-xl sm:text-2xl font-semibold tracking-tight text-neutral-900 dark:text-white">
              AI Solutions &amp; Edge Performance
            </h3>
            <p className="text-sm text-neutral-500 dark:text-neutral-400 mt-2 max-w-md leading-relaxed">
              Integrated OpenAI streaming assistants with real-time response latency, server-side rendering (SSR/SSG), and Lighthouse 100 web performance.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AppWrap(
  MotionWrap(About, "app__about"),
  "about",
  "app__whitebg"
);
