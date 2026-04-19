import { useTranslation } from 'react-i18next';
import styles from './LanguageSelector.module.css';

const LANGUAGES = ['es', 'en'];

export default function LanguageSelector() {
  const { i18n } = useTranslation();
  const currentLang = i18n.language;

  const handleChange = (lang) => {
    i18n.changeLanguage(lang);
  };

  return (
    <div className={styles.wrapper} role="group" aria-label="Language selector">
      {LANGUAGES.map((lang, idx) => (
        <span key={lang} style={{ display: 'contents' }}>
          {idx > 0 && <span className={styles.separator} aria-hidden="true">|</span>}
          <button
            className={`${styles.btn} ${currentLang === lang ? styles.active : ''}`}
            onClick={() => handleChange(lang)}
            aria-pressed={currentLang === lang}
            aria-label={lang === 'es' ? 'Español' : 'English'}
          >
            {lang.toUpperCase()}
          </button>
        </span>
      ))}
    </div>
  );
}
