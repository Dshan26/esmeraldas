import { useState, useCallback } from 'react';
import { useLazyLoad } from '../../hooks/useLazyLoad';
import PlaceholderImage from './PlaceholderImage';
import styles from './LazyImage.module.css';

/**
 * Image component with lazy loading via IntersectionObserver.
 * Uses <picture> element with WebP source and JPEG fallback.
 * Shows PlaceholderImage until visible, fades in on load, and
 * falls back to PlaceholderImage on error.
 */
export default function LazyImage({ src, alt, className = '', aspectRatio = '4/3' }) {
  const [ref, isVisible] = useLazyLoad();
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);

  const handleLoad = useCallback(() => {
    setLoaded(true);
  }, []);

  const handleError = useCallback(() => {
    setError(true);
  }, []);

  /**
   * Derive a JPEG fallback path from the src.
   * If src ends with .webp, replace with .jpg; otherwise use src as-is.
   */
  const jpegSrc = src ? src.replace(/\.webp$/, '.jpg') : '';

  if (error) {
    return (
      <div ref={ref} className={`${styles.container} ${className}`} style={{ aspectRatio }}>
        <PlaceholderImage aspectRatio={aspectRatio} className={styles.fill} />
      </div>
    );
  }

  return (
    <div ref={ref} className={`${styles.container} ${className}`} style={{ aspectRatio }}>
      {!loaded && (
        <PlaceholderImage aspectRatio={aspectRatio} className={styles.fill} />
      )}
      {isVisible && src && (
        <picture>
          <source srcSet={src} type="image/webp" />
          <img
            src={jpegSrc}
            alt={alt}
            className={`${styles.image} ${loaded ? styles.visible : styles.hidden}`}
            onLoad={handleLoad}
            onError={handleError}
            loading="lazy"
          />
        </picture>
      )}
    </div>
  );
}
