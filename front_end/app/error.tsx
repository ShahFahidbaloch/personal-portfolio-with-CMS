"use client";

import React, { useEffect } from "react";
import { RefreshCw, Home } from "lucide-react";
import Link from "next/link";

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function GlobalError({ error, reset }: ErrorProps) {
  useEffect(() => {
    console.error("[Application Error Boundary caught error]:", error);
  }, [error]);

  return (
    <div className="min-h-screen w-full bg-[#f5f5f7] dark:bg-[#000000] text-neutral-900 dark:text-white flex flex-col items-center justify-center px-4 sm:px-6 select-none transition-colors duration-300">
      <div className="text-center max-w-md mx-auto">
        <p className="text-xs font-mono uppercase tracking-widest text-neutral-400 dark:text-neutral-500 mb-3">
          Runtime Notice
        </p>
        <h1 className="text-3xl sm:text-5xl font-semibold tracking-[-0.03em] leading-tight text-neutral-950 dark:text-white">
          Something went wrong.
        </h1>
        <p className="mt-3 text-sm sm:text-base text-neutral-600 dark:text-neutral-400 leading-relaxed">
          An unexpected issue interrupted this view. You can reload the component state or return to the main showcase.
        </p>

        <div className="mt-7 flex items-center justify-center gap-3">
          <button
            type="button"
            onClick={() => reset()}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-neutral-950 dark:bg-white text-white dark:text-black text-xs sm:text-sm font-medium hover:scale-[1.02] active:scale-[0.98] transition-all shadow-sm cursor-pointer"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Try again</span>
          </button>

          <Link
            href="/"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-black/[0.05] dark:bg-white/[0.08] hover:bg-black/[0.08] dark:hover:bg-white/[0.12] border border-black/10 dark:border-white/10 text-xs sm:text-sm font-medium text-neutral-800 dark:text-neutral-200 hover:scale-[1.02] active:scale-[0.98] transition-all"
          >
            <Home className="w-3.5 h-3.5" />
            <span>Home</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
