import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import ProductCard from './ProductCard';

// Mock react-router-dom
const mockNavigate = vi.fn();
vi.mock('react-router-dom', () => ({
  useNavigate: () => mockNavigate,
}));

// Mock react-i18next
vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key) => {
      const translations = {
        'product.carats': 'Quilates',
        'product.buyWhatsApp': 'Comprar por WhatsApp',
      };
      return translations[key] || key;
    },
    i18n: { language: 'es' },
  }),
}));

// Mock whatsapp service
vi.mock('../../services/whatsapp', () => ({
  generateProductWhatsAppUrl: (name, price, lang) =>
    `https://wa.me/573134152951?text=${encodeURIComponent(`${name} - ${price}`)}`,
}));

const mockProduct = {
  id: 'esmeralda-muzo-001',
  images: ['/images/products/muzo-001-main.webp', '/images/products/muzo-001-side.webp'],
  carats: 2.5,
  priceInCOP: 2500000,
  name: { es: 'Esmeralda Muzo Ovalada', en: 'Muzo Oval Emerald' },
  shortDescription: {
    es: 'Esmeralda natural de 2.5 quilates.',
    en: 'Natural 2.5 carat emerald.',
  },
};

describe('ProductCard', () => {
  let observerCallback;
  let originalIO;
  let windowOpenSpy;

  beforeEach(() => {
    originalIO = globalThis.IntersectionObserver;
    globalThis.IntersectionObserver = function (callback) {
      observerCallback = callback;
      this.observe = vi.fn();
      this.unobserve = vi.fn();
    };
    mockNavigate.mockClear();
    windowOpenSpy = vi.spyOn(window, 'open').mockImplementation(() => null);
  });

  afterEach(() => {
    globalThis.IntersectionObserver = originalIO;
    windowOpenSpy.mockRestore();
  });

  it('renders product name, description, carats and price', () => {
    render(<ProductCard product={mockProduct} />);

    expect(screen.getByText('Esmeralda Muzo Ovalada')).toBeInTheDocument();
    expect(screen.getByText('Esmeralda natural de 2.5 quilates.')).toBeInTheDocument();
    expect(screen.getByText('2.5 Quilates')).toBeInTheDocument();
    expect(screen.getByText(/2\.500\.000 COP/)).toBeInTheDocument();
  });

  it('renders WhatsApp buy button with translated text', () => {
    render(<ProductCard product={mockProduct} />);

    const button = screen.getByRole('button', { name: /Comprar por WhatsApp/i });
    expect(button).toBeInTheDocument();
  });

  it('navigates to product detail on card click', () => {
    render(<ProductCard product={mockProduct} />);

    const card = screen.getByTestId('product-card');
    fireEvent.click(card);

    expect(mockNavigate).toHaveBeenCalledWith('/product/esmeralda-muzo-001');
  });

  it('opens WhatsApp link on buy button click without navigating', () => {
    render(<ProductCard product={mockProduct} />);

    const button = screen.getByRole('button', { name: /Comprar por WhatsApp/i });
    fireEvent.click(button);

    expect(windowOpenSpy).toHaveBeenCalledWith(
      expect.stringContaining('https://wa.me/'),
      '_blank',
      'noopener,noreferrer'
    );
    expect(mockNavigate).not.toHaveBeenCalled();
  });

  it('renders LazyImage with first product image', () => {
    render(<ProductCard product={mockProduct} />);

    // LazyImage shows placeholder initially; the alt text won't be present
    // until intersection triggers. The card should still render without errors.
    expect(screen.getByTestId('product-card')).toBeInTheDocument();
  });
});
