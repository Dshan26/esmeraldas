import { useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import LanguageSelector from '../ui/LanguageSelector';
import styles from './Navbar.module.css';

const NAV_ITEMS = [
  { key: 'nav.home', to: '/' },
  { key: 'nav.catalog', to: '/catalog' },
  { key: 'nav.about', to: '/about' },
  { key: 'nav.contact', to: '/contact' },
];

export default function Navbar() {
  const { t } = useTranslation();
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = useCallback(() => {
    setMenuOpen((prev) => !prev);
  }, []);

  const closeMenu = useCallback(() => {
    setMenuOpen(false);
  }, []);

  return (
    <nav className={styles.navbar} aria-label="Main navigation">
      <div className={styles.container}>
        <Link to="/" className={styles.logo}>
          Esmeraldas Juliana
        </Link>

        {/* Desktop navigation */}
        <ul className={styles.navLinks}>
          {NAV_ITEMS.map(({ key, to }) => (
            <li key={key}>
              <Link to={to} className={styles.navLink}>
                {t(key)}
              </Link>
            </li>
          ))}
        </ul>

        <div className={styles.rightSection}>
          <div className={styles.langSlot}>
            <LanguageSelector />
          </div>

          {/* Hamburger button — mobile only */}
          <button
            className={`${styles.hamburger} ${menuOpen ? styles.hamburgerOpen : ''}`}
            onClick={toggleMenu}
            aria-expanded={menuOpen}
            aria-controls="mobile-nav-panel"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </div>

      {/* Overlay */}
      <div
        className={`${styles.overlay} ${menuOpen ? styles.overlayVisible : ''}`}
        onClick={closeMenu}
        aria-hidden="true"
      />

      {/* Mobile slide-in panel */}
      <div
        id="mobile-nav-panel"
        className={`${styles.mobilePanel} ${menuOpen ? styles.mobilePanelOpen : ''}`}
        role="dialog"
        aria-modal={menuOpen}
        aria-label="Mobile navigation"
      >
        {NAV_ITEMS.map(({ key, to }) => (
          <Link
            key={key}
            to={to}
            className={styles.mobileNavLink}
            onClick={closeMenu}
          >
            {t(key)}
          </Link>
        ))}
        <div className={styles.mobileLangSlot}>
          <LanguageSelector />
        </div>
      </div>
    </nav>
  );
}
