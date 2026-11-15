/**
 * Ultra-lightweight native haptic feedback utility
 * Binds directly to VybZ Android native bridge, falling back to Web Vibration API.
 */
export function triggerHaptic(type: 'light' | 'medium' | 'success' = 'light') {
  if (typeof window === 'undefined') return;

  // 1. Android Native Bridge (Zero CPU / 0ms instant click)
  try {
    if ((window as any).VybZNative?.performHaptic) {
      (window as any).VybZNative.performHaptic();
      return;
    }
  } catch {}

  // 2. Web Vibration API Fallback (Mobile Chrome / Android WebApp)
  try {
    if ('vibrate' in navigator && typeof navigator.vibrate === 'function') {
      if (type === 'light') {
        navigator.vibrate(8);
      } else if (type === 'medium') {
        navigator.vibrate(14);
      } else if (type === 'success') {
        navigator.vibrate([10, 30, 10]);
      }
    }
  } catch {}
}
