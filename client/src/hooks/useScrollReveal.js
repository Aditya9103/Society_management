import { useRef } from 'react';
import { useInView } from 'framer-motion';

/**
 * Returns a ref and a boolean `inView` — triggers once when element enters viewport.
 * Respects `prefers-reduced-motion`.
 */
export function useScrollReveal({ once = true, amount = 0.2 } = {}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once, amount });
  return { ref, inView };
}
