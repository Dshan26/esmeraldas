import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import styles from './HeroBanner.module.css';

/**
 * Full-width hero banner for the home page.
 * Displays a translatable title, subtitle, and CTA button
 * over a dark emerald gradient background.
 */
export default function HeroBanner() {
  const { t } = useTranslation();

  return (
    <section className={styles.hero} data-testid="hero-banner">
      <div className={styles.overlay} aria-hidden="true" />
      <div className={styles.content}>
        <h1 className={styles.title}>{t('hero.title')}</h1>
        <p className={styles.subtitle}>{t('hero.subtitle')}</p>
        <Link to="/catalog" className={styles.cta}>
          {t('hero.cta')}
        </Link>
      </div>
    </section>
  );
}
