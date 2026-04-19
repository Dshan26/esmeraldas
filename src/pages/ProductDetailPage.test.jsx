import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import ProductDetailPage from './ProductDetailPage';

// Mock react-i18next
vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key) => {
      const translations = {
        'product.notFound': 'Producto no encontrado',
        'product.backToCatalog': 'Volver al catálogo',
        'product.carats': 'Quilates',
        'product.cut': 'Corte',
        'product.clarity': 'Claridad',
        'product.origin': 'Origen',
        'product.buyWhatsApp': 'Comprar por WhatsApp',
      };
      return translations[key] || key;
    },
    i18n: { language: 'es' },
  }),
}));

// Mock whatsapp service
vi.mock('../services/whatsapp', () => ({
  generateProductWhatsAppUrl: () => 'https://wa.me/573134152951?text=test',
}));

function renderWithRoute(id) {
  return render(
    <MemoryRouter initialEntries={[`/product/${id}`]}>
      <Routes>
        <Route path="/product/:id" element={<ProductDetailPage />} />
      </Routes>
    </MemoryRouter>
  );
}

describe('ProductDetailPage', () => {
  let originalIO;

  beforeEach(() => {
    originalIO = globalThis.IntersectionObserver;
    globalThis.IntersectionObserver = function (callback) {
      this.observe = vi.fn();
      this.unobserve = vi.fn();
    };
  });

  afterEach(() => {
    globalThis.IntersectionObserver = originalIO;
  });

  it('renders product gallery and details for a valid product ID', () => {
    renderWithRoute('esmeralda-muzo-001');

    expect(screen.getByTestId('product-gallery')).toBeInTheDocument();
    expect(screen.getByTestId('product-details')).toBeInTheDocument();
    expect(screen.getByText('Esmeralda Muzo Ovalada')).toBeInTheDocument();
  });

  it('shows not-found message for an invalid product ID', () => {
    renderWithRoute('nonexistent-id');

    expect(screen.getByTestId('product-not-found')).toBeInTheDocument();
    expect(screen.getByText('Producto no encontrado')).toBeInTheDocument();
  });

  it('shows a link back to catalog when product is not found', () => {
    renderWithRoute('nonexistent-id');

    const link = screen.getByText('Volver al catálogo');
    expect(link).toBeInTheDocument();
    expect(link.closest('a')).toHaveAttribute('href', '/catalog');
  });
});
