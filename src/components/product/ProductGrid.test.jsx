import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import ProductGrid from './ProductGrid';

// Mock react-router-dom
vi.mock('react-router-dom', () => ({
  useNavigate: () => vi.fn(),
}));

// Mock react-i18next
vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key) => key,
    i18n: { language: 'es' },
  }),
}));

// Mock whatsapp service
vi.mock('../../services/whatsapp', () => ({
  generateProductWhatsAppUrl: () => 'https://wa.me/573134152951?text=test',
}));

const mockProducts = [
  {
    id: 'emerald-001',
    images: ['/img/001.webp'],
    carats: 1.5,
    priceInCOP: 1500000,
    name: { es: 'Esmeralda 1', en: 'Emerald 1' },
    shortDescription: { es: 'Desc 1', en: 'Desc 1' },
  },
  {
    id: 'emerald-002',
    images: ['/img/002.webp'],
    carats: 2.0,
    priceInCOP: 2000000,
    name: { es: 'Esmeralda 2', en: 'Emerald 2' },
    shortDescription: { es: 'Desc 2', en: 'Desc 2' },
  },
];

describe('ProductGrid', () => {
  let originalIO;

  beforeEach(() => {
    originalIO = globalThis.IntersectionObserver;
    globalThis.IntersectionObserver = function () {
      this.observe = vi.fn();
      this.unobserve = vi.fn();
    };
  });

  afterEach(() => {
    globalThis.IntersectionObserver = originalIO;
  });

  it('renders a ProductCard for each product', () => {
    render(<ProductGrid products={mockProducts} />);

    const cards = screen.getAllByTestId('product-card');
    expect(cards).toHaveLength(2);
  });

  it('renders the grid container with data-testid', () => {
    render(<ProductGrid products={mockProducts} />);

    expect(screen.getByTestId('product-grid')).toBeInTheDocument();
  });

  it('renders nothing when products array is empty', () => {
    const { container } = render(<ProductGrid products={[]} />);
    expect(container.innerHTML).toBe('');
  });

  it('renders nothing when products is undefined', () => {
    const { container } = render(<ProductGrid />);
    expect(container.innerHTML).toBe('');
  });
});
