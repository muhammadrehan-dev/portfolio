"use client";

import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { usePresentationContext } from "./PresentationProvider";

interface PanelProps {
  id: string;
  index: number;
  bgImage?: string;
  children: React.ReactNode;
}

// ─── Slide Variants ────────────────────────────────────────────────────────────
// Pure horizontal slide — NO opacity change.
// Both the exiting panel and the entering panel are fully visible during the
// transition, so the user sees one panel sliding out while the next slides in.
// This eliminates the "black flash" that occurred when opacity was animated.

const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? "100%" : "-100%",
  }),
  center: {
    x: "0%",
  },
  exit: (direction: number) => ({
    x: direction > 0 ? "-100%" : "100%",
  }),
};

export function Panel({ id, index, bgImage, children }: PanelProps) {
  const { activeIndex, direction } = usePresentationContext();
  const isActive = index === activeIndex;

  // Always render the AnimatePresence wrapper so it can track
  // the child mounting/unmounting and play exit animations.
  // Only the motion.section is conditionally rendered inside.
  return (
    <AnimatePresence initial={false} custom={direction} mode="sync">
      {isActive && (
        <motion.section
          key={id}
          custom={direction}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            x: { type: "tween", duration: 0.9, ease: [0.4, 0, 0.2, 1] },
          }}
          id={id}
          className="absolute inset-0 flex items-center overflow-hidden"
        >
          {/* Background with grayscale and overlay */}
          {bgImage && (
            <div
              className="absolute inset-0 z-0 bg-cover bg-center grayscale"
              style={{ backgroundImage: `url(${bgImage})` }}
            />
          )}

          {/* Dark overlay */}
          <div className="absolute inset-0 z-0 bg-black/60" />

          {/* Content wrapper */}
          <div className="relative z-10 w-full h-full px-5 pt-16 pb-24 md:px-24 md:pt-0 md:pb-0 flex items-center overflow-y-auto md:overflow-visible">
            <div className="w-full max-w-7xl mx-auto">
              {children}
            </div>
          </div>
        </motion.section>
      )}
    </AnimatePresence>
  );
}
