'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export function CookieBanner() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('analytics_consent');
    if (!consent) {
      setShow(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('analytics_consent', 'granted');
    setShow(false);
    // trigger a custom event so the analytics provider knows to initialize
    window.dispatchEvent(new Event('analytics_consent_granted'));
  };

  const handleDecline = () => {
    localStorage.setItem('analytics_consent', 'denied');
    setShow(false);
  };

  if (!show) return null;

  return (
    <div className="fixed bottom-0 left-0 w-full bg-black border-t border-white/20 p-4 md:p-6 z-50 font-mono shadow-[0_-10px_30px_rgba(0,0,0,0.8)]">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="text-sm text-gray-300">
          <p className="mb-1 text-white font-bold tracking-widest uppercase">System Notification: Cookies & Telemetry</p>
          <p>
            We use cookies and device telemetry to monitor network traffic and enhance system performance. 
            By initializing this protocol, you agree to our <Link href="/privacy" className="text-white underline underline-offset-4 hover:text-gray-400">Privacy Policy</Link>.
          </p>
        </div>
        <div className="flex gap-4 w-full md:w-auto shrink-0">
          <button 
            onClick={handleDecline}
            className="flex-1 md:flex-none border border-white/30 px-6 py-2 uppercase tracking-widest text-xs hover:bg-white/10 transition-colors"
          >
            Decline
          </button>
          <button 
            onClick={handleAccept}
            className="flex-1 md:flex-none bg-white text-black font-bold border border-white px-6 py-2 uppercase tracking-widest text-xs hover:bg-gray-200 transition-colors"
          >
            Acknowledge
          </button>
        </div>
      </div>
    </div>
  );
}
