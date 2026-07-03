"use client";

import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { usePresentationContext } from "./PresentationProvider";

interface PanelProps {
  id: string;
  index: number;
  bgImage?: string;
  bgPosition?: string;
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

export function Panel({ id, index, bgImage, bgPosition, children }: PanelProps) {
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
          className="absolute inset-0 flex overflow-hidden"
        >
          {/* Background with grayscale and overlay */}
          {bgImage && (
            <div
              className={cn("absolute inset-0 z-0 bg-cover grayscale", bgPosition || "bg-center")}
              style={{ backgroundImage: `url(${bgImage})` }}
            />
          )}

          {/* Dark overlay */}
          <div className="absolute inset-0 z-0 bg-black/60" />

          {/* Content wrapper */}
          <div className="relative z-10 w-full h-full px-5 pt-16 pb-20 md:px-24 md:py-0 flex flex-col overflow-y-auto">
            <div className="w-full max-w-7xl mx-auto my-auto shrink-0 py-8 md:py-0">
              {children}
            </div>
          </div>
        </motion.section>
      )}
    </AnimatePresence>
  );
}
