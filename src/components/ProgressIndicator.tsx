"use client";

import { motion } from "framer-motion";
import { usePresentationContext } from "./PresentationProvider";

export function ProgressIndicator() {
  const { activeIndex, totalPanels } = usePresentationContext();

  const progress = activeIndex / (totalPanels - 1);

  return (
    <div className="fixed bottom-0 left-0 right-0 h-1 bg-white/10 z-50 pointer-events-none">
      <motion.div
        className="h-full bg-white"
        animate={{ scaleX: progress }}
        transition={{ type: "tween", duration: 0.5, ease: "easeOut" }}
        style={{ transformOrigin: "0%" }}
      />
    </div>
  );
}
