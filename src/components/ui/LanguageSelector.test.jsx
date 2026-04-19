import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import i18n from '../../i18n/i18n';
import LanguageSelector from './LanguageSelector';

describe('LanguageSelector', () => {
  beforeEach(async () => {
    await i18n.changeLanguage('es');
  });

  it('renders ES and EN buttons', () => {
    render(<LanguageSelector />);
    expect(screen.getByRole('button', { name: 'Español' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'English' })).toBeInTheDocument();
  });

  it('marks the current language button as pressed', () => {
    render(<LanguageSelector />);
    expect(screen.getByRole('button', { name: 'Español' })).toHaveAttribute('aria-pressed', 'true');
    expect(screen.getByRole('button', { name: 'English' })).toHaveAttribute('aria-pressed', 'false');
  });

  it('switches language to English on click without page reload', async () => {
    const user = userEvent.setup();
    render(<LanguageSelector />);

    await user.click(screen.getByRole('button', { name: 'English' }));

    expect(i18n.language).toBe('en');
    expect(screen.getByRole('button', { name: 'English' })).toHaveAttribute('aria-pressed', 'true');
    expect(screen.getByRole('button', { name: 'Español' })).toHaveAttribute('aria-pressed', 'false');
  });

  it('switches language back to Spanish on click', async () => {
    const user = userEvent.setup();
    await i18n.changeLanguage('en');
    render(<LanguageSelector />);

    await user.click(screen.getByRole('button', { name: 'Español' }));

    expect(i18n.language).toBe('es');
    expect(screen.getByRole('button', { name: 'Español' })).toHaveAttribute('aria-pressed', 'true');
  });

  it('maintains language selection during session (no localStorage needed)', async () => {
    const user = userEvent.setup();
    const { unmount } = render(<LanguageSelector />);

    await user.click(screen.getByRole('button', { name: 'English' }));
    expect(i18n.language).toBe('en');

    // Unmount and re-render to simulate navigation
    unmount();
    render(<LanguageSelector />);

    // Language persists in i18n instance across renders
    expect(i18n.language).toBe('en');
    expect(screen.getByRole('button', { name: 'English' })).toHaveAttribute('aria-pressed', 'true');
  });
});
