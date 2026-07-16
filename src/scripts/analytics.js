// Fires a "smart event" the way the current Clarity/Meta Pixel setup expects:
// a dataLayer push plus a direct fbq call when the Pixel is present.
export function trackEvent(name, params = {}) {
  try {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({ event: name, ...params });
  } catch (_) {
    // localStorage/dataLayer can be unavailable in some in-app WebViews; never throw.
  }
  try {
    if (typeof window.fbq === 'function') {
      window.fbq('trackCustom', name, params);
    }
  } catch (_) {}
}
