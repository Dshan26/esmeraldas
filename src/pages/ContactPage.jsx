import { useTranslation } from 'react-i18next';
import { generateGreetingWhatsAppUrl } from '../services/whatsapp.js';
import ScrollAnimation from '../components/common/ScrollAnimation';
import styles from './ContactPage.module.css';

export default function ContactPage() {
  const { t, i18n } = useTranslation();

  const whatsappUrl = generateGreetingWhatsAppUrl(i18n.language);

  return (
    <div className={styles.contact}>
      <h1 className={styles.pageTitle}>{t('contact.title')}</h1>
      <p className={styles.subtitle}>{t('contact.subtitle')}</p>

      <ScrollAnimation animation="slideUp" delay={200}>
      <div className={styles.cards}>
        {/* WhatsApp card */}
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.card}
        >
          <span className={styles.iconWrapper}>
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
              <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
            </svg>
          </span>
          <span className={styles.cardLabel}>{t('contact.whatsappChat')}</span>
        </a>

        {/* Email card */}
        <a
          href="mailto:c-san2015@hotmail.com"
          className={styles.card}
        >
          <span className={styles.iconWrapper}>
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
              <rect x="2" y="4" width="20" height="16" rx="2" />
              <path d="M22 4l-10 8L2 4" />
            </svg>
          </span>
          <span className={styles.cardLabel}>c-san2015@hotmail.com</span>
        </a>

        {/* Location card */}
        <div className={styles.card}>
          <span className={styles.iconWrapper}>
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
              <circle cx="12" cy="10" r="3" />
            </svg>
          </span>
          <span className={styles.cardLabel}>{t('contact.location')}</span>
        </div>
      </div>
      </ScrollAnimation>
    </div>
  );
}
