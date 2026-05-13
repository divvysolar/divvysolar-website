export const FB_PIXEL_ID = process.env.NEXT_PUBLIC_FACEBOOK_PIXEL_ID;

/**
 * Tracks a standard page view.
 * Called automatically on every route change via FacebookPixel component.
 */
export const pageview = () => {
  if (!FB_PIXEL_ID || typeof window === 'undefined' || !window.fbq) return;
  window.fbq('track', 'PageView');
};

/**
 * Tracks a custom or standard Meta Pixel event.
 * @param {string} name - Event name (e.g., 'Lead', 'Contact', 'ViewContent')
 * @param {object} options - Optional event parameters
 */
export const event = (name, options = {}) => {
  if (!FB_PIXEL_ID || typeof window === 'undefined' || !window.fbq) return;
  window.fbq('track', name, options);
};
