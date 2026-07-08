'use client';

import { useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';

function generateSessionId() {
  return Math.random().toString(36).substring(2) + Date.now().toString(36);
}

export function AnalyticsProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const sessionIdRef = useRef<string | null>(null);
  const viewIdRef = useRef<string | null>(null);
  const [consentGranted, setConsentGranted] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('analytics_consent');
    if (consent === 'granted') {
      setConsentGranted(true);
    }

    const handleConsent = () => {
      setConsentGranted(true);
    };
    
    window.addEventListener('analytics_consent_granted', handleConsent);
    return () => window.removeEventListener('analytics_consent_granted', handleConsent);
  }, []);

  useEffect(() => {
    if (!consentGranted || pathname?.startsWith('/admin')) return;

    // 1. Setup session tracking
    let sessionId = sessionStorage.getItem('analytics_session_id');
    if (!sessionId) {
      sessionId = generateSessionId();
      sessionStorage.setItem('analytics_session_id', sessionId);
      sessionIdRef.current = sessionId;

      // Collect initial device data
      const initSession = async () => {
        let batteryData = { level: null as number | null, charging: null as boolean | null };
        try {
          if ('getBattery' in navigator) {
            const battery: any = await (navigator as any).getBattery();
            batteryData.level = battery.level;
            batteryData.charging = battery.charging;
          }
        } catch (e) {
          // ignore battery api errors
        }

        const deviceInfo = navigator.userAgent;

        await fetch('/api/analytics/session', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            sessionId,
            deviceInfo,
            ...batteryData,
          }),
        });
      };
      
      initSession();
    } else {
      sessionIdRef.current = sessionId;
    }
  }, [consentGranted, pathname]);

  useEffect(() => {
    // 2. Setup page view tracking
    if (!consentGranted || !sessionIdRef.current || !pathname || pathname.startsWith('/admin')) return;

    let intervalId: NodeJS.Timeout;
    
    const trackPageView = async () => {
      try {
        const res = await fetch('/api/analytics/pageview', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            sessionId: sessionIdRef.current,
            path: pathname,
          }),
        });
        const data = await res.json();
        if (data.viewId) {
          viewIdRef.current = data.viewId;
          
          // start pinging to update time_spent
          let timeSpent = 0;
          intervalId = setInterval(() => {
            timeSpent += 5; // increment by 5 seconds
            fetch('/api/analytics/pageview', {
              method: 'PUT',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                viewId: data.viewId,
                timeSpent,
              }),
              keepalive: true, // ensure it sends even if navigating away
            });
          }, 5000);
        }
      } catch (e) {
        console.error('Failed to track page view', e);
      }
    };

    trackPageView();

    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [pathname, consentGranted]);

  return <>{children}</>;
}
