import { useRef, useState, useEffect } from 'react';

/**
 * Custom hook for lazy loading using IntersectionObserver.
 * Once the element becomes visible, it stays visible (unobserves after first intersection).
 * @param {object} options - IntersectionObserver options
 * @param {string} [options.rootMargin='100px'] - Margin around root to preload slightly before viewport
 * @param {number} [options.threshold=0] - Visibility threshold
 * @returns {[React.RefObject, boolean]} - [ref, isVisible]
 */
export function useLazyLoad({ rootMargin = '100px', threshold = 0 } = {}) {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(element);
        }
      },
      { rootMargin, threshold }
    );

    observer.observe(element);

    return () => {
      observer.unobserve(element);
    };
  }, [rootMargin, threshold]);

  return [ref, isVisible];
}
