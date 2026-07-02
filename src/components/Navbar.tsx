"use client";

import { motion } from "framer-motion";
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

export function Navbar() {
  const { activeIndex, goTo } = usePresentationContext();

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
