import { useTranslation } from 'react-i18next';
import ProductGrid from '../components/product/ProductGrid';
import ScrollAnimation from '../components/common/ScrollAnimation';
import products from '../data/products.json';
import styles from './CatalogPage.module.css';

export default function CatalogPage() {
  const { t } = useTranslation();

  return (
    <section className={styles.catalog}>
      <div className="container">
        <ScrollAnimation animation="fadeIn">
          <h1 className={styles.title}>{t('catalog.title')}</h1>
        </ScrollAnimation>
        <ScrollAnimation animation="slideUp" delay={200}>
          <ProductGrid products={products} />
        </ScrollAnimation>
        <p className={styles.priceDisclaimer}>{t('product.priceDisclaimer')}</p>
      </div>
    </section>
  );
}
