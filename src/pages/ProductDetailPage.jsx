import { useParams, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import products from '../data/products.json';
import ProductGallery from '../components/product/ProductGallery';
import ProductDetails from '../components/product/ProductDetails';
import styles from './ProductDetailPage.module.css';

export default function ProductDetailPage() {
  const { id } = useParams();
  const { t, i18n } = useTranslation();

  const product = products.find((p) => p.id === id);

  if (!product) {
    return (
      <div className={styles.container}>
        <div className={styles.notFound} data-testid="product-not-found">
          <span className={styles.notFoundIcon} aria-hidden="true">💎</span>
          <h1 className={styles.notFoundTitle}>{t('product.notFound')}</h1>
          <Link to="/catalog" className={styles.backLink}>
            {t('product.backToCatalog')}
          </Link>
        </div>
      </div>
    );
  }

  const productName = product.name[i18n.language] || product.name.es;

  return (
    <div className={styles.container}>
      <div className={styles.productLayout}>
        <ProductGallery images={product.images} productName={productName} />
        <ProductDetails product={product} />
      </div>
    </div>
  );
}
