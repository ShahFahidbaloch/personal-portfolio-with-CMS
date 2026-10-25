import React from "react";

export default function Loading() {
  return (
    <div
      className="min-h-screen w-full bg-[#f5f5f7] dark:bg-[#000000] flex flex-col items-center justify-center transition-colors duration-300"
      aria-label="Loading portfolio"
      role="status"
    >
      <div className="relative flex items-center justify-center">
        {/* Apple Minimalist Spinner */}
        <div className="w-8 h-8 rounded-full border-2 border-black/10 dark:border-white/10 border-t-neutral-900 dark:border-t-white animate-spin" />
      </div>
      <p className="mt-4 text-xs font-mono uppercase tracking-widest text-neutral-400 dark:text-neutral-500">
        Loading...
      </p>
    </div>
  );
}
