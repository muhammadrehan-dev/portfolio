"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { usePresentationContext } from "./PresentationProvider";

const navLinks = [
  { name: "Hero", id: "hero" },
  { name: "About", id: "about" },
  { name: "Education", id: "education" },
  { name: "Skills", id: "skills" },
  { name: "Projects", id: "projects" },
  { name: "Security", id: "security" },
  { name: "Contact", id: "contact" },
];

// ── Hamburger Icon (animated three-line → X) ──────────────────────────────────
function HamburgerIcon({ isOpen, toggle }: { isOpen: boolean; toggle: () => void }) {
  return (
    <button
      onClick={toggle}
      aria-label="Toggle menu"
      className="relative z-[60] flex flex-col justify-center items-center w-10 h-10 gap-[5px] pointer-events-auto"
    >
      <motion.span
        animate={isOpen ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
        transition={{ duration: 0.3 }}
        className="block w-6 h-[2px] bg-white origin-center"
      />
      <motion.span
        animate={isOpen ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
        transition={{ duration: 0.2 }}
        className="block w-6 h-[2px] bg-white origin-center"
      />
      <motion.span
        animate={isOpen ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
        transition={{ duration: 0.3 }}
        className="block w-6 h-[2px] bg-white origin-center"
      />
    </button>
  );
}

// ── Shutter overlay variants ──────────────────────────────────────────────────
const shutterVariants = {
  closed: {
    clipPath: "inset(0 0 100% 0)",
    transition: { duration: 0.5, ease: [0.76, 0, 0.24, 1] as [number, number, number, number] },
  },
  open: {
    clipPath: "inset(0 0 0% 0)",
    transition: { duration: 0.5, ease: [0.76, 0, 0.24, 1] as [number, number, number, number] },
  },
};

const linkVariants = {
  closed: { opacity: 0, y: 30 },
  open: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: 0.15 + i * 0.06, duration: 0.4, ease: "easeOut" as const },
  }),
};

export function Navbar() {
  const { activeIndex, goTo } = usePresentationContext();
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  // Lock body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  const handleNavClick = (index: number) => {
    goTo(index);
    setIsOpen(false);
  };

  // ── Desktop Navbar ──────────────────────────────────────────────────────────
  if (!isMobile) {
    return (
      <header className="fixed top-0 left-0 right-0 z-50 px-6 py-6 flex items-center justify-end pointer-events-none">
        <nav className="pointer-events-auto flex items-center gap-6 text-sm font-medium">
          {navLinks.map((link, index) => (
            <button
              key={link.id}
              onClick={() => goTo(index)}
              className="relative uppercase tracking-widest text-white/70 hover:text-white transition-colors"
            >
              {link.name}
              {activeIndex === index && (
                <motion.div
                  layoutId="nav-underline"
                  className="absolute left-0 right-0 -bottom-1 h-0.5 bg-white"
                  initial={false}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
            </button>
          ))}
        </nav>
      </header>
    );
  }

  // ── Mobile Hamburger + Shutter Menu ─────────────────────────────────────────
  return (
    <>
      {/* Hamburger button — top right */}
      <header className="fixed top-0 right-0 z-[60] p-5 pointer-events-none">
        <HamburgerIcon isOpen={isOpen} toggle={() => setIsOpen(!isOpen)} />
      </header>

      {/* Shutter overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="shutter"
            variants={shutterVariants}
            initial="closed"
            animate="open"
            exit="closed"
            className="fixed inset-0 z-50 bg-black/95 backdrop-blur-xl flex flex-col items-center justify-center"
          >
            {/* Section label */}
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-white/30 text-xs font-bold tracking-[0.3em] uppercase mb-8"
            >
              Navigation
            </motion.span>

            {/* Nav links */}
            <nav className="flex flex-col items-center gap-2">
              {navLinks.map((link, index) => (
                <motion.button
                  key={link.id}
                  custom={index}
                  variants={linkVariants}
                  initial="closed"
                  animate="open"
                  onClick={() => handleNavClick(index)}
                  className={`
                    relative text-3xl font-black uppercase tracking-wider px-6 py-3
                    transition-colors duration-300
                    ${activeIndex === index ? "text-white" : "text-white/40 hover:text-white/80"}
                  `}
                >
                  {/* Active indicator dot */}
                  {activeIndex === index && (
                    <motion.span
                      layoutId="mobile-active-dot"
                      className="absolute left-0 top-1/2 -translate-y-1/2 w-2 h-2 bg-white rounded-full"
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                  {link.name}
                </motion.button>
              ))}
            </nav>

            {/* Panel counter at bottom */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="absolute bottom-10 text-white/20 text-xs font-bold tracking-widest"
            >
              {String(activeIndex + 1).padStart(2, "0")} / {String(navLinks.length).padStart(2, "0")}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
