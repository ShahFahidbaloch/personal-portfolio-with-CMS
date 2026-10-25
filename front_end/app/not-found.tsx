import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function RootNotFound() {
  return (
    <div className="min-h-screen w-full bg-[#f5f5f7] dark:bg-[#000000] text-neutral-900 dark:text-white flex flex-col items-center justify-center px-4 sm:px-6 select-none transition-colors duration-300">
      <div className="text-center max-w-md mx-auto">
        <p className="text-xs font-mono uppercase tracking-widest text-neutral-400 dark:text-neutral-500 mb-3">
          404 Error
        </p>
        <h1 className="text-4xl sm:text-6xl font-semibold tracking-[-0.03em] leading-tight text-neutral-950 dark:text-white">
          Page Not Found.
        </h1>
        <p className="mt-4 text-sm sm:text-base text-neutral-600 dark:text-neutral-400 leading-relaxed">
          The requested page could not be located. It may have been moved or the URL might be mistyped.
        </p>
        <div className="mt-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-neutral-950 dark:bg-white text-white dark:text-black text-xs sm:text-sm font-medium hover:scale-[1.02] active:scale-[0.98] transition-all shadow-sm"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Return to Portfolio</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
