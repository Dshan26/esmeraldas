import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import ProductDetails from './ProductDetails';

// Mock react-i18next
vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key) => {
      const translations = {
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
vi.mock('../../services/whatsapp', () => ({
  generateProductWhatsAppUrl: (name, price, lang) =>
    `https://wa.me/573134152951?text=${encodeURIComponent(`${name} - ${price}`)}`,
}));

const mockProduct = {
  id: 'esmeralda-muzo-001',
  images: ['/images/products/muzo-001-main.webp'],
  carats: 2.5,
  priceInCOP: 2500000,
  cut: 'oval',
  clarity: 'AAA',
  origin: 'Muzo, Boyacá',
  name: { es: 'Esmeralda Muzo Ovalada', en: 'Muzo Oval Emerald' },
  shortDescription: { es: 'Descripción corta', en: 'Short description' },
  fullDescription: {
    es: 'Descripción completa de la esmeralda.',
    en: 'Full emerald description.',
  },
};

describe('ProductDetails', () => {
  let windowOpenSpy;

  beforeEach(() => {
    windowOpenSpy = vi.spyOn(window, 'open').mockImplementation(() => null);
  });

  afterEach(() => {
    windowOpenSpy.mockRestore();
  });

  it('renders product name as heading', () => {
    render(<ProductDetails product={mockProduct} />);
    expect(screen.getByRole('heading', { name: 'Esmeralda Muzo Ovalada' })).toBeInTheDocument();
  });

  it('renders full description', () => {
    render(<ProductDetails product={mockProduct} />);
    expect(screen.getByText('Descripción completa de la esmeralda.')).toBeInTheDocument();
  });

  it('renders all technical specs', () => {
    render(<ProductDetails product={mockProduct} />);
    expect(screen.getByText('Quilates')).toBeInTheDocument();
    expect(screen.getByText('2.5')).toBeInTheDocument();
    expect(screen.getByText('Corte')).toBeInTheDocument();
    expect(screen.getByText('oval')).toBeInTheDocument();
    expect(screen.getByText('Claridad')).toBeInTheDocument();
    expect(screen.getByText('AAA')).toBeInTheDocument();
    expect(screen.getByText('Origen')).toBeInTheDocument();
    expect(screen.getByText('Muzo, Boyacá')).toBeInTheDocument();
  });

  it('renders formatted price in gold color', () => {
    render(<ProductDetails product={mockProduct} />);
    expect(screen.getByText(/2\.500\.000 COP/)).toBeInTheDocument();
  });

  it('renders WhatsApp buy button', () => {
    render(<ProductDetails product={mockProduct} />);
    const button = screen.getByRole('button', { name: /Comprar por WhatsApp/i });
    expect(button).toBeInTheDocument();
  });

  it('opens WhatsApp link on buy button click', () => {
    render(<ProductDetails product={mockProduct} />);
    const button = screen.getByRole('button', { name: /Comprar por WhatsApp/i });
    fireEvent.click(button);
    expect(windowOpenSpy).toHaveBeenCalledWith(
      expect.stringContaining('https://wa.me/'),
      '_blank',
      'noopener,noreferrer'
    );
  });
});
