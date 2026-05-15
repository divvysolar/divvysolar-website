'use client';

import { useEffect } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import Script from 'next/script';
import { FB_PIXEL_ID, pageview } from '@/lib/fpixel';

/**
 * FacebookPixel — Injects Meta Pixel base code into the document head
 * and fires a PageView event on every client-side route change.
 *
 * Activation: Set NEXT_PUBLIC_FACEBOOK_PIXEL_ID in .env.local
 * If the env var is missing, this component renders nothing and throws no errors.
 */
export default function FacebookPixel() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Fire PageView on every route change
  useEffect(() => {
    if (!FB_PIXEL_ID) return;
    pageview();
  }, [pathname, searchParams]);

  // Do not inject anything if Pixel ID is not configured
  if (!FB_PIXEL_ID) return null;

  return (
    <Script
      id="fb-pixel-base"
      strategy="lazyOnload"
      dangerouslySetInnerHTML={{
        __html: `
          !function(f,b,e,v,n,t,s)
          {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
          n.callMethod.apply(n,arguments):n.queue.push(arguments)};
          if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
          n.queue=[];t=b.createElement(e);t.async=!0;
          t.src=v;s=b.getElementsByTagName(e)[0];
          s.parentNode.insertBefore(t,s)}(window,document,'script',
          'https://connect.facebook.net/en_US/fbevents.js');
          fbq('init', '${FB_PIXEL_ID}');
          fbq('track', 'PageView');
        `,
      }}
    />
  );
}
