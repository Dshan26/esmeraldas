import styles from './PlaceholderImage.module.css';

/**
 * Elegant placeholder displayed when a product image is unavailable.
 * Shows a green emerald gem SVG icon with "Imagen no disponible" text.
 */
export default function PlaceholderImage({ className = '', aspectRatio = '4/3' }) {
  return (
    <div
      className={`${styles.placeholder} ${className}`}
      style={{ aspectRatio }}
      role="img"
      aria-label="Imagen no disponible"
    >
      <svg
        className={styles.icon}
        viewBox="0 0 64 64"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <polygon
          points="32,4 56,24 48,58 16,58 8,24"
          stroke="#50C878"
          strokeWidth="2"
          fill="none"
        />
        <polygon
          points="32,12 48,26 42,52 22,52 16,26"
          stroke="#50C878"
          strokeWidth="1"
          fill="none"
          opacity="0.5"
        />
        <line x1="32" y1="4" x2="32" y2="58" stroke="#50C878" strokeWidth="1" opacity="0.3" />
      </svg>
      <span className={styles.text}>Imagen no disponible</span>
    </div>
  );
}
