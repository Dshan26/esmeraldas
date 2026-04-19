import ProductCard from './ProductCard';
import styles from './ProductGrid.module.css';

/**
 * Responsive grid that renders a ProductCard for each product.
 * 1 column on mobile, 2 on tablet (768px+), 3 on desktop (1024px+).
 *
 * @param {{ products: object[] }} props
 */
export default function ProductGrid({ products }) {
  if (!products || products.length === 0) {
    return null;
  }

  return (
    <section className={styles.grid} data-testid="product-grid">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </section>
  );
}
