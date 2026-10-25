"use client";

import React from "react";
import {
  SiNextdotjs,
  SiShopify,
  SiBigcommerce,
  SiCloudflare,
  SiAmazonaws,
  SiSanity,
} from "react-icons/si";
import { Quote, CheckCircle2, ArrowUpRight } from "lucide-react";
import { AppWrap } from "../../wrapper";
import "./Testimonial.scss";

// Verified Ecosystem Partners with authentic colorful brand icons
const ECOSYSTEM_PARTNERS = [
  {
    name: "Next.js",
    category: "Full-Stack Framework",
    icon: SiNextdotjs,
    color: "text-neutral-950 dark:text-white",
    bgColor: "bg-black/[0.05] dark:bg-white/[0.08]",
  },
  {
    name: "Shopify",
    category: "Storefront & APIs",
    icon: SiShopify,
    color: "text-[#96BF48]",
    bgColor: "bg-[#96BF48]/10",
  },
  {
    name: "BigCommerce",
    category: "Enterprise Engine",
    icon: SiBigcommerce,
    color: "text-[#0D52FF] dark:text-[#3C64F4]",
    bgColor: "bg-[#0D52FF]/10",
  },
  {
    name: "Cloudflare",
    category: "Edge & Workers",
    icon: SiCloudflare,
    color: "text-[#F38020]",
    bgColor: "bg-[#F38020]/10",
  },
  {
    name: "AWS",
    category: "Cloud Services",
    icon: SiAmazonaws,
    color: "text-[#FF9900]",
    bgColor: "bg-[#FF9900]/10",
  },
  {
    name: "Sanity CMS",
    category: "Structured Content",
    icon: SiSanity,
    color: "text-[#F03E2F]",
    bgColor: "bg-[#F03E2F]/10",
  },
];

const Testimonial: React.FC = () => {
  return (
    <section className="relative w-full max-w-6xl mx-auto px-3 sm:px-6 select-none">
      {/* ================= 1. SECTION HEADER (MATCHING ABOUT HEADING TYPOGRAPHY) ================= */}
      <div className="text-center mb-10 sm:mb-12 max-w-3xl mx-auto">
        <p className="text-xs font-mono uppercase tracking-widest text-neutral-400 dark:text-neutral-500 mb-2 sm:mb-3">
          Endorsements
        </p>
        <h2 className="text-3xl sm:text-5xl lg:text-6xl font-semibold tracking-[-0.03em] leading-[1.12] text-neutral-900 dark:text-white text-center">
          Trusted by Engineering Leaders.
        </h2>
      </div>

      {/* ================= 2. ASYMMETRIC 12-COLUMN BENTO GRID ================= */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-5 max-w-6xl mx-auto">
        {/* ================= CARD 1: FEATURED TESTIMONIAL (7 COLS - HANI GHALAYINI) ================= */}
        <div className="col-span-1 md:col-span-7 testimonial-bento-card hero-card-surface rounded-[22px] sm:rounded-[32px] p-4 sm:p-6 lg:p-7 flex flex-col justify-between group transition-all duration-300">
          {/* Top Meta Bar */}
          <div className="flex items-center justify-between pb-4 border-b border-black/[0.05] dark:border-white/[0.06] gap-2">
            <div className="flex items-center gap-2 min-w-0">
              <span className="p-1.5 rounded-lg bg-black/[0.03] dark:bg-white/[0.04] text-neutral-600 dark:text-neutral-400 border border-black/[0.05] dark:border-white/[0.06] flex-shrink-0">
                <Quote className="w-3.5 h-3.5" />
              </span>
              <span className="text-[11px] sm:text-xs font-mono uppercase tracking-wider text-neutral-500 dark:text-neutral-400 font-medium">
                <span className="hidden sm:inline">Featured Endorsement</span>
                <span className="sm:hidden">Endorsement</span>
              </span>
            </div>

            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-mono text-neutral-500 dark:text-[#86868B] bg-neutral-100/60 dark:bg-white/[0.03] border border-black/[0.04] dark:border-white/[0.06] whitespace-nowrap flex-shrink-0">
              <CheckCircle2 className="w-3 h-3 text-neutral-700 dark:text-neutral-300" />
              <span>Verified Client</span>
            </div>
          </div>

          {/* Pull Quote */}
          <div className="my-6 sm:my-8 flex-1 flex items-center">
            <blockquote className="text-lg sm:text-xl lg:text-[22px] font-medium leading-[1.42] tracking-[-0.015em] text-neutral-900 dark:text-white">
              &ldquo;Shah Fahid&apos;s frontend architecture and dedication to clean
              component design drastically accelerated our headless storefront
              delivery.&rdquo;
            </blockquote>
          </div>

          {/* Author Info (Hani Ghalayini - Managing Director) */}
          <div className="pt-4 border-t border-black/[0.05] dark:border-white/[0.06] flex items-center justify-between gap-3">
            <a
              href="https://www.linkedin.com/in/hanighalayini/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 group/author"
            >
              {/* Monogram Avatar */}
              <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-neutral-100 dark:bg-neutral-800/80 border border-black/10 dark:border-white/10 flex items-center justify-center font-mono font-semibold text-xs text-neutral-800 dark:text-neutral-200 shadow-inner flex-shrink-0 group-hover/author:border-black/30 dark:group-hover/author:border-white/30 transition-colors">
                HG
              </div>

              <div>
                <div className="flex items-center gap-1.5">
                  <h3 className="font-semibold text-sm sm:text-base text-neutral-900 dark:text-white leading-tight group-hover/author:underline">
                    Hani Ghalayini
                  </h3>
                  <ArrowUpRight className="w-3.5 h-3.5 text-neutral-400 opacity-0 group-hover/author:opacity-100 transition-opacity" />
                </div>
                <p className="text-xs text-neutral-500 dark:text-[#86868B] mt-0.5">
                  Managing Director · Superior eCommerce (United Kingdom)
                </p>
              </div>
            </a>

            <span className="hidden sm:inline-block text-[11px] font-mono text-neutral-400 dark:text-neutral-500 whitespace-nowrap flex-shrink-0">
              Headless Storefront
            </span>
          </div>
        </div>

        {/* ================= CARD 2: ECOSYSTEM & STACK PARTNERS (5 COLS) ================= */}
        <div className="col-span-1 md:col-span-5 testimonial-bento-card hero-card-surface rounded-[22px] sm:rounded-[32px] p-4 sm:p-6 lg:p-7 flex flex-col justify-between group transition-all duration-300">
          {/* Header */}
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-medium text-neutral-600 dark:text-neutral-400">
              Ecosystem &amp; Stack Partners
            </h3>
            <span className="text-[11px] font-mono text-neutral-400 dark:text-neutral-500">
              Production Stack
            </span>
          </div>

          {/* Stack Badges Grid (Colorful Brand Icons) */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 sm:gap-3 my-auto py-2">
            {ECOSYSTEM_PARTNERS.map((partner) => {
              const IconComponent = partner.icon;
              return (
                <div
                  key={partner.name}
                  className="flex flex-col items-center justify-center p-3 sm:p-3.5 rounded-2xl bg-neutral-50 dark:bg-white/[0.03] border border-black/[0.05] dark:border-white/[0.06] hover:border-black/20 dark:hover:border-white/20 transition-all duration-200 group/item hover:scale-[1.03] active:scale-[0.98]"
                >
                  <div className={`w-9 h-9 rounded-xl ${partner.bgColor} flex items-center justify-center mb-1.5 transition-transform duration-200 group-hover/item:scale-110 shadow-sm`}>
                    <IconComponent className={`w-5 h-5 ${partner.color}`} />
                  </div>
                  <span className="text-xs font-mono font-medium text-neutral-800 dark:text-neutral-200 text-center">
                    {partner.name}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Subtitle / Note */}
          <div className="pt-3 border-t border-black/[0.04] dark:border-white/[0.05] flex items-center justify-between text-[11px] text-neutral-400 dark:text-neutral-500 font-mono">
            <span>Direct API &amp; SDK Integration</span>
            <span className="text-neutral-500 dark:text-neutral-400 font-semibold">6 Stacks</span>
          </div>
        </div>

        {/* ================= CARD 3: METRICS / IMPACT BENTO BOX (5 COLS) ================= */}
        <div className="col-span-1 md:col-span-5 testimonial-bento-card hero-card-surface rounded-[22px] sm:rounded-[32px] p-4 sm:p-6 lg:p-7 flex flex-col justify-between group transition-all duration-300">
          {/* Header */}
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-medium text-neutral-600 dark:text-neutral-400">
              Performance &amp; Reliability
            </h3>
            <span className="text-[11px] font-mono text-neutral-400 dark:text-neutral-500">
              Core Web Vitals
            </span>
          </div>

          {/* Primary Metric Stat */}
          <div className="my-auto py-2">
            <div className="flex items-baseline gap-2">
              <span className="text-4xl sm:text-5xl lg:text-6xl font-semibold font-mono tracking-tight text-neutral-900 dark:text-white">
                100%
              </span>
              <span className="text-xs sm:text-sm font-mono text-neutral-500 dark:text-neutral-400">
                Score
              </span>
            </div>
            <p className="text-sm font-medium text-neutral-700 dark:text-neutral-300 mt-1">
              Lighthouse Performance &amp; Accessibility
            </p>

            {/* Micro Stats Grid */}
            <div className="grid grid-cols-3 gap-2 mt-4 pt-3 border-t border-black/[0.04] dark:border-white/[0.05]">
              <div className="p-2 rounded-xl bg-neutral-50 dark:bg-white/[0.02] border border-black/[0.04] dark:border-white/[0.05]">
                <div className="text-xs sm:text-sm font-semibold font-mono text-neutral-900 dark:text-white">
                  10+
                </div>
                <div className="text-[10px] text-neutral-500 dark:text-[#86868B] font-mono mt-0.5">
                  Deploys
                </div>
              </div>

              <div className="p-2 rounded-xl bg-neutral-50 dark:bg-white/[0.02] border border-black/[0.04] dark:border-white/[0.05]">
                <div className="text-xs sm:text-sm font-semibold font-mono text-neutral-900 dark:text-white">
                  99.9%
                </div>
                <div className="text-[10px] text-neutral-500 dark:text-[#86868B] font-mono mt-0.5">
                  Uptime
                </div>
              </div>

              <div className="p-2 rounded-xl bg-neutral-50 dark:bg-white/[0.02] border border-black/[0.04] dark:border-white/[0.05]">
                <div className="text-xs sm:text-sm font-semibold font-mono text-neutral-900 dark:text-white">
                  &lt;200ms
                </div>
                <div className="text-[10px] text-neutral-500 dark:text-[#86868B] font-mono mt-0.5">
                  Edge TTFB
                </div>
              </div>
            </div>
          </div>

          {/* Subtitle */}
          <p className="text-xs leading-relaxed text-neutral-500 dark:text-[#86868B] mt-4 pt-3 border-t border-black/[0.04] dark:border-white/[0.05]">
            Engineered with edge SSR caching, optimized asset hydration, and
            zero-downtime CI/CD workflows for seamless client launches.
          </p>
        </div>

        {/* ================= CARD 4: PEER / COLLABORATION TESTIMONIAL (7 COLS) ================= */}
        <div className="col-span-1 md:col-span-7 testimonial-bento-card hero-card-surface rounded-[22px] sm:rounded-[32px] p-4 sm:p-6 lg:p-7 flex flex-col justify-between group transition-all duration-300">
          {/* Top Meta Bar */}
          <div className="flex items-center justify-between pb-4 border-b border-black/[0.05] dark:border-white/[0.06] gap-2">
            <div className="flex items-center gap-2 min-w-0">
              <span className="p-1.5 rounded-lg bg-black/[0.03] dark:bg-white/[0.04] text-neutral-600 dark:text-neutral-400 border border-black/[0.05] dark:border-white/[0.06] flex-shrink-0">
                <Quote className="w-3.5 h-3.5" />
              </span>
              <span className="text-[11px] sm:text-xs font-mono uppercase tracking-wider text-neutral-500 dark:text-neutral-400 font-medium">
                <span className="hidden sm:inline">Peer Collaboration</span>
                <span className="sm:hidden">Peer Review</span>
              </span>
            </div>

            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-mono text-neutral-500 dark:text-[#86868B] bg-neutral-100/60 dark:bg-white/[0.03] border border-black/[0.04] dark:border-white/[0.06] whitespace-nowrap flex-shrink-0">
              <CheckCircle2 className="w-3 h-3 text-neutral-700 dark:text-neutral-300" />
              <span>Engineering Peer</span>
            </div>
          </div>

          {/* Pull Quote */}
          <div className="my-6 sm:my-8 flex-1 flex items-center">
            <blockquote className="text-base sm:text-lg lg:text-[19px] font-medium leading-[1.45] tracking-[-0.01em] text-neutral-900 dark:text-white">
              &ldquo;Working alongside Shah on multi-region headless architectures
              was seamless. His mastery of edge caching, clean component abstractions,
              and async state reduced our sprint turnaround time noticeably while
              maintaining immaculate code quality.&rdquo;
            </blockquote>
          </div>

          {/* Author Info */}
          <div className="pt-4 border-t border-black/[0.05] dark:border-white/[0.06] flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              {/* Monogram Avatar */}
              <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-neutral-100 dark:bg-neutral-800/80 border border-black/10 dark:border-white/10 flex items-center justify-center font-mono font-semibold text-xs text-neutral-800 dark:text-neutral-200 shadow-inner flex-shrink-0">
                MZ
              </div>

              <div>
                <h3 className="font-semibold text-sm sm:text-base text-neutral-900 dark:text-white leading-tight">
                  Muhammad Zaid
                </h3>
                <p className="text-xs text-neutral-500 dark:text-[#86868B] mt-0.5">
                  Lead Full-Stack Engineer · Afynix Digital
                </p>
              </div>
            </div>

            <span className="hidden sm:inline-block text-[11px] font-mono text-neutral-400 dark:text-neutral-500 whitespace-nowrap flex-shrink-0">
              Sprint Velocity &amp; Architecture
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AppWrap(
  Testimonial,
  "testimonial",
  "app__testimonial-wrap"
);
