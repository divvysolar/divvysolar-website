'use client';

import { useEffect } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import { FB_PIXEL_ID, pageview } from '@/lib/fpixel';

export default function FacebookPixel() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (!FB_PIXEL_ID) return;
    pageview();
  }, [pathname, searchParams]);

  useEffect(() => {
    if (!FB_PIXEL_ID) return;

    const timer = setTimeout(() => {
      if (typeof window.fbq !== 'undefined') return;

      window.fbq = function () {
        window.fbq.callMethod
          ? window.fbq.callMethod.apply(window.fbq, arguments)
          : window.fbq.queue.push(arguments);
      };
      if (!window._fbq) window._fbq = window.fbq;
      window.fbq.push = window.fbq;
      window.fbq.loaded = true;
      window.fbq.version = '2.0';
      window.fbq.queue = [];

      const script = document.createElement('script');
      script.src = 'https://connect.facebook.net/en_US/fbevents.js';
      script.async = true;
      document.head.appendChild(script);

      script.onload = () => {
        window.fbq('init', FB_PIXEL_ID);
        window.fbq('track', 'PageView');
      };
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  if (!FB_PIXEL_ID) return null;
  return null;
}