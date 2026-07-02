"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export function HorizontalScrollProvider({ children }: { children: React.ReactNode }) {
  const targetRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      document.documentElement.style.setProperty('--vw', `${document.documentElement.clientWidth}px`);
    };
    
    // Initial check
    handleResize();
    
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const { scrollYProgress } = useScroll({
    target: targetRef,
  });

  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-85.71428571%"]); 
  // 100% / 7 panels = ~14.28%. We want to translate up to -(100 - 14.28)% = -85.71%
  // Or more dynamically, we can use a calculation based on number of panels if we want it strictly dynamic.
  // We'll adjust this once we build the layout. Let's assume 7 panels for now.

  if (isMobile) {
    // On mobile, just render normally (vertical stacking)
    return <div className="flex flex-col">{children}</div>;
  }

  return (
    <section ref={targetRef} className="relative h-[700vh]">
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center">
        <motion.div style={{ x }} className="flex h-full w-max">
          {children}
        </motion.div>
      </div>
    </section>
  );
}
