import { useTranslation } from 'react-i18next';
import styles from './Footer.module.css';

export default function Footer() {
  const { t } = useTranslation();

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.columns}>
          {/* Brand column */}
          <div className={styles.column}>
            <span className={styles.logo}>Esmeraldas Juliana</span>
            <p className={styles.tagline}>{t('footer.tagline')}</p>
          </div>

          {/* Contact column */}
          <div className={styles.column}>
            <h3 className={styles.columnTitle}>{t('footer.contactTitle')}</h3>
            <ul className={styles.contactList}>
              <li>
                <a href="mailto:c-san2015@hotmail.com" className={styles.contactLink}>
                  c-san2015@hotmail.com
                </a>
              </li>
              <li className={styles.location}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
                {t('footer.location')}
              </li>
            </ul>
          </div>

          {/* Social column */}
          <div className={styles.column}>
            <h3 className={styles.columnTitle}>{t('footer.socialTitle')}</h3>
            <div className={styles.socialLinks}>
              <a href="https://www.instagram.com/julianaemeralds" target="_blank" className={styles.socialLink} aria-label="Instagram" rel="noopener noreferrer">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        <div className={styles.divider} />

        <p className={styles.copyright}>
          © {new Date().getFullYear()} Esmeraldas Juliana. {t('footer.rights')}
        </p>
      </div>
    </footer>
  );
}
