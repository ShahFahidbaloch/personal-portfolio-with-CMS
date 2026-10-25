"use client";

import * as React from "react";
import { useTheme } from "next-themes";
import { Sun, Moon } from "lucide-react";

export function ModeToggle() {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  const isDark = mounted ? (resolvedTheme === "dark" || theme === "dark") : true;

  const toggleTheme = () => {
    setTheme(isDark ? "light" : "dark");
  };

  return (
    <button
      type="button"
      role="switch"
      aria-checked={isDark}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      onClick={toggleTheme}
      className="relative flex items-center justify-center h-9 sm:h-10 w-9 sm:w-10 rounded-full bg-neutral-950/95 dark:bg-black/95 hover:bg-neutral-900 border border-white/15 hover:border-white/30 backdrop-blur-2xl transition-all duration-300 cursor-pointer shadow-[0_8px_24px_rgba(0,0,0,0.35)] focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 group hover:scale-[1.04] active:scale-[0.96]"
    >
      {isDark ? (
        <Moon
          className="w-4 h-4 sm:w-[18px] sm:h-[18px] text-sky-300 group-hover:text-sky-200 transition-transform duration-300 group-hover:scale-110"
          aria-hidden="true"
        />
      ) : (
        <Sun
          className="w-4 h-4 sm:w-[18px] sm:h-[18px] text-amber-400 group-hover:text-amber-300 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-45"
          aria-hidden="true"
        />
      )}
    </button>
  );
}
