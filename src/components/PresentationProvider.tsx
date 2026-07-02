"use client";

import { createContext, useContext, useCallback, useEffect, useState, useRef } from "react";

// ─── Context ───────────────────────────────────────────────────────────────────
// This context provides the current active panel index and a function to jump
// to any panel. It also tracks the scroll direction so panels can animate
// in from the correct side (left or right).

interface PresentationContextValue {
  activeIndex: number;
  direction: number; // +1 = going forward (right-to-left), -1 = going backward (left-to-right)
  totalPanels: number;
  goTo: (index: number) => void;
}

const PresentationContext = createContext<PresentationContextValue>({
  activeIndex: 0,
  direction: 1,
  totalPanels: 7,
  goTo: () => {},
});

export function usePresentationContext() {
  return useContext(PresentationContext);
}

// ─── Provider Component ────────────────────────────────────────────────────────
// Captures wheel, keyboard, and touch events and translates them into
// discrete panel transitions with a cooldown debounce.

const TOTAL_PANELS = 7;
const COOLDOWN_MS = 700; // debounce between transitions

export function PresentationProvider({ children }: { children: React.ReactNode }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [isMobile, setIsMobile] = useState(false);
  const lastTransition = useRef(0);
  const touchStartY = useRef(0);

  // ── Responsive check ──
  useEffect(() => {
    const check = () => {
      setIsMobile(window.innerWidth < 768);
      document.documentElement.style.setProperty('--vw', `${document.documentElement.clientWidth}px`);
    };
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  // ── Core navigation function with debounce ──
  const navigate = useCallback((delta: number) => {
    const now = Date.now();
    if (now - lastTransition.current < COOLDOWN_MS) return;

    setActiveIndex((prev) => {
      const next = prev + delta;
      if (next < 0 || next >= TOTAL_PANELS) return prev;
      lastTransition.current = now;
      setDirection(delta); // +1 forward, -1 backward
      return next;
    });
  }, []);

  const goTo = useCallback((index: number) => {
    if (index < 0 || index >= TOTAL_PANELS) return;
    const now = Date.now();
    lastTransition.current = now;
    setActiveIndex((prev) => {
      setDirection(index > prev ? 1 : -1);
      return index;
    });
  }, []);

  // ── Wheel listener ──
  useEffect(() => {
    if (isMobile) return;

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      if (Math.abs(e.deltaY) < 5) return; // ignore tiny trackpad noise
      navigate(e.deltaY > 0 ? 1 : -1);
    };

    window.addEventListener("wheel", handleWheel, { passive: false });
    return () => window.removeEventListener("wheel", handleWheel);
  }, [isMobile, navigate]);

  // ── Keyboard listener (ArrowDown/Right = next, ArrowUp/Left = prev) ──
  useEffect(() => {
    if (isMobile) return;

    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowDown" || e.key === "ArrowRight" || e.key === " ") {
        e.preventDefault();
        navigate(1);
      } else if (e.key === "ArrowUp" || e.key === "ArrowLeft") {
        e.preventDefault();
        navigate(-1);
      }
    };

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [isMobile, navigate]);

  // ── Touch swipe listener (mobile) ──
  useEffect(() => {
    if (!isMobile) return;

    const handleTouchStart = (e: TouchEvent) => {
      touchStartY.current = e.touches[0].clientY;
    };

    const handleTouchEnd = (e: TouchEvent) => {
      const diff = touchStartY.current - e.changedTouches[0].clientY;
      if (Math.abs(diff) > 50) {
        navigate(diff > 0 ? 1 : -1);
      }
    };

    window.addEventListener("touchstart", handleTouchStart, { passive: true });
    window.addEventListener("touchend", handleTouchEnd, { passive: true });
    return () => {
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchend", handleTouchEnd);
    };
  }, [isMobile, navigate]);

  return (
    <PresentationContext.Provider value={{ activeIndex, direction, totalPanels: TOTAL_PANELS, goTo }}>
      {/* Fixed viewport container — panels are positioned absolutely inside */}
      <div className="relative w-screen h-screen overflow-hidden">
        {children}
      </div>
    </PresentationContext.Provider>
  );
}
