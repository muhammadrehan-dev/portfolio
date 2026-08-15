"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Greeting {
  text: string;
  lang: string;
  subtext: string;
  fontClass: string;
  dir?: "ltr" | "rtl";
}

const GREETINGS: Greeting[] = [
  { text: "hello", lang: "en", subtext: "English", fontClass: "font-[family-name:var(--font-sacramento)]" },
  { text: "hola", lang: "es", subtext: "Spanish", fontClass: "font-[family-name:var(--font-sacramento)]" },
  { text: "bonjour", lang: "fr", subtext: "French", fontClass: "font-[family-name:var(--font-sacramento)]" },
  { text: "سلام", lang: "ur", subtext: "Urdu", dir: "rtl", fontClass: "font-serif font-normal" },
  { text: "مرحبا", lang: "ar", subtext: "Arabic", dir: "rtl", fontClass: "font-serif font-normal" },
  { text: "你好", lang: "zh", subtext: "Chinese", fontClass: "font-sans font-medium" },
  { text: "नमस्ते", lang: "hi", subtext: "Hindi", fontClass: "font-sans font-medium" },
  { text: "こんにちは", lang: "ja", subtext: "Japanese", fontClass: "font-sans font-medium" },
  { text: "ciao", lang: "it", subtext: "Italian", fontClass: "font-[family-name:var(--font-sacramento)]" },
  { text: "привет", lang: "ru", subtext: "Russian", fontClass: "font-[family-name:var(--font-sacramento)]" },
];

export function IosGreetingsSplash() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const [isDismissing, setIsDismissing] = useState(false);

  // Lock body scroll while splash is visible
  useEffect(() => {
    if (isVisible && !isDismissing) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isVisible, isDismissing]);

  // Overall 2.6s cycle timing per greeting
  useEffect(() => {
    if (isDismissing) return;

    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % GREETINGS.length);
    }, 2600);

    return () => clearInterval(timer);
  }, [isDismissing]);

  const handleDismiss = () => {
    if (isDismissing) return;
    setIsDismissing(true);
  };

  if (!isVisible) return null;

  const currentGreeting = GREETINGS[currentIndex];
  const isRtl = currentGreeting.dir === "rtl";

  // LTR: Opens Left->Right, Exits unwriting back Right->Left
  // RTL: Opens Right->Left, Exits unwriting back Left->Right
  const initialClip = isRtl
    ? "polygon(100% 0, 100% 0, 100% 100%, 100% 100%)"
    : "polygon(0 0, 0 0, 0 100%, 0 100%)";

  const animateClip = "polygon(0 0, 100% 0, 100% 100%, 0 100%)";

  const exitClip = isRtl
    ? "polygon(100% 0, 100% 0, 100% 100%, 100% 100%)"
    : "polygon(0 0, 0 0, 0 100%, 0 100%)";

  // Symmetrical GPU-accelerated transition curve for perfectly mirror-matched entry & exit
  const symmetricalTransition = {
    duration: 0.9,
    ease: [0.4, 0, 0.2, 1] as const,
  };

  return (
    <AnimatePresence onExitComplete={() => setIsVisible(false)}>
      {!isDismissing && (
        <motion.div
          key="ios-splash"
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{
            opacity: 0,
            scale: 1.02,
            transition: { duration: 0.6, ease: "easeInOut" },
          }}
          onClick={handleDismiss}
          className="fixed inset-0 z-[999999] flex flex-col items-center justify-between bg-black text-white select-none cursor-pointer overflow-hidden p-6 sm:p-12"
          role="button"
          tabIndex={0}
          aria-label="Click anywhere to enter portfolio"
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") handleDismiss();
          }}
        >
          {/* Top subtle branding dot/indicator */}
          <div className="pt-6 sm:pt-10 flex items-center justify-center opacity-40">
            <span className="text-xs uppercase tracking-[0.35em] font-mono text-zinc-400">
              REHAN.DEV
            </span>
          </div>

          {/* Main Greeting Area: GPU-Accelerated Hardware Composited Smooth Mirror Transitions */}
          <div className="relative flex flex-col items-center justify-center min-h-[280px] sm:min-h-[360px] w-full max-w-5xl px-4 py-6">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentGreeting.text}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1, transition: symmetricalTransition }}
                exit={{ opacity: 0, transition: symmetricalTransition }}
                dir={currentGreeting.dir || "ltr"}
                className="flex flex-col items-center justify-center text-center w-full"
              >
                <div className="py-4 px-4 sm:py-8 sm:px-8 flex items-center justify-center overflow-visible w-full">
                  <motion.h1
                    initial={{
                      clipPath: initialClip,
                      opacity: 0,
                    }}
                    animate={{
                      clipPath: animateClip,
                      opacity: 1,
                      transition: symmetricalTransition,
                    }}
                    exit={{
                      clipPath: exitClip,
                      opacity: 0,
                      transition: symmetricalTransition,
                    }}
                    style={{
                      willChange: "clip-path, opacity",
                      transform: "translateZ(0)",
                    }}
                    className={`text-7xl sm:text-8xl md:text-9xl lg:text-[11rem] text-white leading-[1.35] tracking-tight ${currentGreeting.fontClass} drop-shadow-2xl px-2 py-2 inline-block whitespace-nowrap text-nowrap`}
                  >
                    {currentGreeting.text}
                  </motion.h1>
                </div>

                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.45, transition: symmetricalTransition }}
                  exit={{ opacity: 0, transition: symmetricalTransition }}
                  className="text-xs sm:text-sm font-medium tracking-[0.35em] text-zinc-400 uppercase font-mono mt-2"
                >
                  {currentGreeting.subtext}
                </motion.span>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Bottom iOS Swipe / Click to Continue Indicator */}
          <div className="pb-6 sm:pb-10 flex flex-col items-center space-y-4">
            <motion.div
              animate={{ opacity: [0.35, 0.85, 0.35] }}
              transition={{ repeat: Infinity, duration: 2.8, ease: "easeInOut" }}
              className="flex items-center space-y-2 flex-col"
            >
              <span className="text-xs sm:text-sm text-zinc-400 tracking-widest font-light uppercase">
                Click anywhere to enter
              </span>
              <svg
                className="w-4 h-4 text-zinc-500 animate-bounce mt-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                  d="M19 14l-7 7m0 0l-7-7m7 7V3"
                />
              </svg>
            </motion.div>

            {/* Classic iOS home indicator bar */}
            <div className="w-32 sm:w-40 h-1 bg-white/25 rounded-full mt-2" />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
