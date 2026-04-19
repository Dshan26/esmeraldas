import { useTranslation } from 'react-i18next';
import ScrollAnimation from '../components/common/ScrollAnimation';
import { assetPath } from '../services/assetPath';
import styles from './AboutPage.module.css';

export default function AboutPage() {
  const { t } = useTranslation();

  return (
    <div className={styles.about}>
      <ScrollAnimation animation="fadeIn">
        <h1 className={styles.pageTitle}>{t('about.title')}</h1>
      </ScrollAnimation>

      <ScrollAnimation animation="slideUp" delay={100}>
        <div className={styles.minePhotos}>
          <img src={assetPath('/images/products/mia1.jpeg')} alt="En las minas de esmeraldas" className={styles.minePhoto} />
          <img src={assetPath('/images/products/mia2.jpeg')} alt="Extracción de esmeraldas" className={styles.minePhoto} />
        </div>
      </ScrollAnimation>

      <ScrollAnimation animation="slideUp" delay={200}>
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>{t('about.history')}</h2>
        </section>
      </ScrollAnimation>

      <ScrollAnimation animation="slideUp" delay={400}>
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>{t('about.origin')}</h2>
          <p className={styles.sectionText}>{t('about.originText')}</p>
        </section>
      </ScrollAnimation>

      <ScrollAnimation animation="slideUp" delay={600}>
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>{t('about.value')}</h2>
        </section>
      </ScrollAnimation>
    </div>
  );
}
