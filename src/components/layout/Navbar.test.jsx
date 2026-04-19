import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Navbar from './Navbar';
import '../../i18n/i18n';

function renderNavbar() {
  return render(
    <MemoryRouter>
      <Navbar />
    </MemoryRouter>
  );
}

describe('Navbar', () => {
  it('renders the logo text', () => {
    renderNavbar();
    expect(screen.getByText('Esmeraldas Juliana')).toBeInTheDocument();
  });

  it('renders navigation links in Spanish by default', () => {
    renderNavbar();
    expect(screen.getAllByText('Inicio').length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText('Catálogo').length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText('Nosotros').length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText('Contacto').length).toBeGreaterThanOrEqual(1);
  });

  it('renders a hamburger button for mobile', () => {
    renderNavbar();
    const hamburger = screen.getByLabelText('Open menu');
    expect(hamburger).toBeInTheDocument();
  });

  it('toggles mobile panel when hamburger is clicked', () => {
    renderNavbar();
    const hamburger = screen.getByLabelText('Open menu');

    fireEvent.click(hamburger);
    expect(hamburger).toHaveAttribute('aria-expanded', 'true');

    fireEvent.click(hamburger);
    expect(hamburger).toHaveAttribute('aria-expanded', 'false');
  });

  it('closes mobile panel when a mobile link is clicked', () => {
    renderNavbar();
    const hamburger = screen.getByLabelText('Open menu');
    fireEvent.click(hamburger);

    // Click the first mobile nav link (there are duplicates for desktop + mobile)
    const allInicio = screen.getAllByText('Inicio');
    fireEvent.click(allInicio[allInicio.length - 1]);

    expect(hamburger).toHaveAttribute('aria-expanded', 'false');
  });

  it('has correct link destinations', () => {
    renderNavbar();
    const links = screen.getAllByRole('link');
    const hrefs = links.map((l) => l.getAttribute('href'));
    expect(hrefs).toContain('/');
    expect(hrefs).toContain('/catalog');
    expect(hrefs).toContain('/about');
    expect(hrefs).toContain('/contact');
  });
});
