import { useTranslation } from 'react-i18next';
import HeroBanner from '../components/ui/HeroBanner';
import ProductGrid from '../components/product/ProductGrid';
import ScrollAnimation from '../components/common/ScrollAnimation';
import products from '../data/products.json';
import styles from './HomePage.module.css';

const featuredProducts = products.slice(0, 3);

export default function HomePage() {
  const { t } = useTranslation();

  return (
    <>
      <HeroBanner />
      <section className={styles.featured}>
        <div className="container">
          <ScrollAnimation animation="fadeIn">
            <h2 className={styles.featuredTitle}>{t('home.featured')}</h2>
          </ScrollAnimation>
          <ScrollAnimation animation="slideUp" delay={200}>
            <ProductGrid products={featuredProducts} />
          </ScrollAnimation>
          <p className={styles.priceDisclaimer}>{t('product.priceDisclaimer')}</p>
        </div>
      </section>
    </>
  );
}
