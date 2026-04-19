import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import Footer from './Footer';
import '../../i18n/i18n';

describe('Footer', () => {
  it('renders the logo text in gold', () => {
    render(<Footer />);
    expect(screen.getByText('Esmeraldas Juliana')).toBeInTheDocument();
  });

  it('renders the tagline in Spanish by default', () => {
    render(<Footer />);
    expect(screen.getByText('Esmeraldas colombianas de la más alta calidad')).toBeInTheDocument();
  });

  it('renders contact email link', () => {
    render(<Footer />);
    const emailLink = screen.getByText('c-san2015@hotmail.com');
    expect(emailLink).toBeInTheDocument();
    expect(emailLink.closest('a')).toHaveAttribute('href', 'mailto:c-san2015@hotmail.com');
  });

  it('renders location text', () => {
    render(<Footer />);
    expect(screen.getByText('Colombia')).toBeInTheDocument();
  });

  it('renders Instagram link', () => {
    render(<Footer />);
    expect(screen.getByLabelText('Instagram')).toBeInTheDocument();
  });

  it('renders copyright notice with current year', () => {
    render(<Footer />);
    const year = new Date().getFullYear();
    expect(screen.getByText(new RegExp(`© ${year} Esmeraldas Juliana`))).toBeInTheDocument();
  });

  it('renders translated rights text', () => {
    render(<Footer />);
    expect(screen.getByText(/Todos los derechos reservados/)).toBeInTheDocument();
  });
});
