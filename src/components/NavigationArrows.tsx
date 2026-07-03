"use client";

import { motion, AnimatePresence } from "framer-motion";
import { usePresentationContext } from "./PresentationProvider";
import { ChevronLeft, ChevronRight } from "lucide-react";

const navLabels = ["Hero", "About", "Education", "Skills", "Projects", "Security", "Contact"];

export function NavigationArrows() {
  const { activeIndex, totalPanels, goTo } = usePresentationContext();

  const canGoPrev = activeIndex > 0;
  const canGoNext = activeIndex < totalPanels - 1;

  return (
    <div className="fixed bottom-6 left-0 right-0 z-50 flex items-center justify-between px-5 pointer-events-none md:hidden">
      {/* Previous Arrow */}
      <AnimatePresence mode="wait">
        {canGoPrev ? (
          <motion.button
            key="prev"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            onClick={() => goTo(activeIndex - 1)}
            aria-label={`Go to ${navLabels[activeIndex - 1]}`}
            className="pointer-events-auto flex items-center gap-2 group"
          >
            <span className="flex items-center justify-center w-12 h-12 rounded-full border border-white/30 bg-black/50 backdrop-blur-sm group-active:scale-90 transition-transform">
              <ChevronLeft size={22} className="text-white" />
            </span>
            <span className="text-white/50 text-[10px] font-bold tracking-widest uppercase hidden min-[400px]:block">
              {navLabels[activeIndex - 1]}
            </span>
          </motion.button>
        ) : (
          <div className="w-12" /> /* Spacer to maintain layout */
        )}
      </AnimatePresence>

      {/* Panel Counter */}
      <motion.div
        key={activeIndex}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="text-white/30 text-xs font-bold tracking-widest tabular-nums"
      >
        {String(activeIndex + 1).padStart(2, "0")} <span className="text-white/15">/</span> {String(totalPanels).padStart(2, "0")}
      </motion.div>

      {/* Next Arrow */}
      <AnimatePresence mode="wait">
        {canGoNext ? (
          <motion.button
            key="next"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.3 }}
            onClick={() => goTo(activeIndex + 1)}
            aria-label={`Go to ${navLabels[activeIndex + 1]}`}
            className="pointer-events-auto flex items-center gap-2 group"
          >
            <span className="text-white/50 text-[10px] font-bold tracking-widest uppercase hidden min-[400px]:block">
              {navLabels[activeIndex + 1]}
            </span>
            <span className="flex items-center justify-center w-12 h-12 rounded-full border border-white/30 bg-black/50 backdrop-blur-sm group-active:scale-90 transition-transform">
              <ChevronRight size={22} className="text-white" />
            </span>
          </motion.button>
        ) : (
          <div className="w-12" /> /* Spacer to maintain layout */
        )}
      </AnimatePresence>
    </div>
  );
}
