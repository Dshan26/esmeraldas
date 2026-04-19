import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import ProductGallery from './ProductGallery';

// Mock IntersectionObserver for LazyImage
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

const mockImages = [
  '/images/products/muzo-001-main.webp',
  '/images/products/muzo-001-side.webp',
  '/images/products/muzo-001-detail.webp',
];

describe('ProductGallery', () => {
  it('renders placeholder when no images provided', () => {
    render(<ProductGallery images={[]} productName="Test" />);
    expect(screen.getByTestId('product-gallery')).toBeInTheDocument();
    expect(screen.getByLabelText('Imagen no disponible')).toBeInTheDocument();
  });

  it('hides navigation controls with a single image', () => {
    render(<ProductGallery images={[mockImages[0]]} productName="Test" />);
    expect(screen.queryByLabelText('Previous image')).not.toBeInTheDocument();
    expect(screen.queryByLabelText('Next image')).not.toBeInTheDocument();
    expect(screen.queryByTestId('gallery-thumbnails')).not.toBeInTheDocument();
  });

  it('shows navigation controls with multiple images', () => {
    render(<ProductGallery images={mockImages} productName="Test" />);
    expect(screen.getByLabelText('Previous image')).toBeInTheDocument();
    expect(screen.getByLabelText('Next image')).toBeInTheDocument();
    expect(screen.getByTestId('gallery-thumbnails')).toBeInTheDocument();
  });

  it('renders correct number of thumbnails', () => {
    render(<ProductGallery images={mockImages} productName="Test" />);
    const thumbnails = screen.getAllByRole('button', { name: /View image/i });
    expect(thumbnails).toHaveLength(3);
  });

  it('wraps around when clicking next on last image', () => {
    render(<ProductGallery images={mockImages} productName="Test" />);
    const nextBtn = screen.getByLabelText('Next image');

    // Click next twice to reach last image (index 2)
    fireEvent.click(nextBtn);
    fireEvent.click(nextBtn);
    // Click next again to wrap to first (index 0)
    fireEvent.click(nextBtn);

    // First thumbnail should be active again
    const thumbnails = screen.getAllByRole('button', { name: /View image/i });
    expect(thumbnails[0].className).toContain('active');
  });

  it('wraps around when clicking previous on first image', () => {
    render(<ProductGallery images={mockImages} productName="Test" />);
    const prevBtn = screen.getByLabelText('Previous image');

    // Click prev on first image wraps to last
    fireEvent.click(prevBtn);

    const thumbnails = screen.getAllByRole('button', { name: /View image/i });
    expect(thumbnails[2].className).toContain('active');
  });

  it('selects image when clicking a thumbnail', () => {
    render(<ProductGallery images={mockImages} productName="Test" />);
    const thumbnails = screen.getAllByRole('button', { name: /View image/i });

    fireEvent.click(thumbnails[1]);
    expect(thumbnails[1].className).toContain('active');
  });
});
