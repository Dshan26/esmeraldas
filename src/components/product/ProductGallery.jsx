import { useState, useCallback } from 'react';
import LazyImage from '../ui/LazyImage';
import PlaceholderImage from '../ui/PlaceholderImage';
import styles from './ProductGallery.module.css';

/**
 * Product image gallery with main image, prev/next controls, and thumbnails.
 *
 * @param {{ images: string[], productName: string }} props
 */
export default function ProductGallery({ images = [], productName = '' }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const hasImages = images.length > 0;
  const showControls = images.length > 1;

  const goToPrevious = useCallback(() => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  }, [images.length]);

  const goToNext = useCallback(() => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  }, [images.length]);

  const selectImage = useCallback((index) => {
    setCurrentIndex(index);
  }, []);

  if (!hasImages) {
    return (
      <div className={styles.gallery} data-testid="product-gallery">
        <div className={styles.mainImage}>
          <PlaceholderImage aspectRatio="4/3" />
        </div>
      </div>
    );
  }

  return (
    <div className={styles.gallery} data-testid="product-gallery">
      <div className={styles.mainImageWrapper}>
        <LazyImage
          src={images[currentIndex]}
          alt={`${productName} - ${currentIndex + 1}`}
          aspectRatio="4/3"
          className={styles.mainImage}
        />
        {showControls && (
          <>
            <button
              className={`${styles.navButton} ${styles.prevButton}`}
              onClick={goToPrevious}
              type="button"
              aria-label="Previous image"
            >
              &#8249;
            </button>
            <button
              className={`${styles.navButton} ${styles.nextButton}`}
              onClick={goToNext}
              type="button"
              aria-label="Next image"
            >
              &#8250;
            </button>
          </>
        )}
      </div>
      {showControls && (
        <div className={styles.thumbnails} data-testid="gallery-thumbnails">
          {images.map((img, index) => (
            <button
              key={img}
              className={`${styles.thumbnail} ${index === currentIndex ? styles.active : ''}`}
              onClick={() => selectImage(index)}
              type="button"
              aria-label={`View image ${index + 1}`}
            >
              <LazyImage
                src={img}
                alt={`${productName} thumbnail ${index + 1}`}
                aspectRatio="1/1"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
