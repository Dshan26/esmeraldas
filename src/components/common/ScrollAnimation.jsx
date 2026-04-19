import { useRef, useState, useEffect } from 'react';
import styles from './ScrollAnimation.module.css';

/**
 * Wrapper component that animates children when they enter the viewport.
 * Uses IntersectionObserver to detect visibility and triggers the animation once.
 *
 * @param {object} props
 * @param {React.ReactNode} props.children
 * @param {'fadeIn'|'slideUp'|'slideLeft'} [props.animation='fadeIn']
 * @param {number} [props.delay=0] - Delay in milliseconds before the animation starts
 */
export default function ScrollAnimation({ children, animation = 'fadeIn', delay = 0 }) {
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
      { rootMargin: '0px', threshold: 0.1 }
    );

    observer.observe(element);

    return () => {
      observer.unobserve(element);
    };
  }, []);

  const className = [
    styles.wrapper,
    styles[animation],
    isVisible ? styles.visible : '',
  ]
    .filter(Boolean)
    .join(' ');

  const style = delay > 0 ? { transitionDelay: `${delay}ms` } : undefined;

  return (
    <div ref={ref} className={className} style={style}>
      {children}
    </div>
  );
}
