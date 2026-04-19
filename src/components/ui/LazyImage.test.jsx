import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, fireEvent, act } from '@testing-library/react';
import LazyImage from './LazyImage';

describe('LazyImage', () => {
  let observerCallback;
  let originalIO;

  beforeEach(() => {
    originalIO = globalThis.IntersectionObserver;

    globalThis.IntersectionObserver = function (callback) {
      observerCallback = callback;
      this.observe = vi.fn();
      this.unobserve = vi.fn();
    };
  });

  afterEach(() => {
    globalThis.IntersectionObserver = originalIO;
  });

  it('shows placeholder before becoming visible', () => {
    render(<LazyImage src="/test.webp" alt="Test" />);
    expect(screen.getByText('Imagen no disponible')).toBeInTheDocument();
  });

  it('does not render img element before intersection', () => {
    const { container } = render(<LazyImage src="/test.webp" alt="Test" />);
    expect(container.querySelector('img')).not.toBeInTheDocument();
  });

  it('renders picture element with WebP source after intersection', () => {
    const { container } = render(<LazyImage src="/test.webp" alt="Test emerald" />);

    act(() => {
      observerCallback([{ isIntersecting: true }]);
    });

    const source = container.querySelector('source[type="image/webp"]');
    expect(source).toBeInTheDocument();
    expect(source).toHaveAttribute('srcSet', '/test.webp');

    const img = screen.getByAltText('Test emerald');
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute('src', '/test.jpg');
    expect(img).toHaveAttribute('loading', 'lazy');
  });

  it('fades in image on load', () => {
    render(<LazyImage src="/test.webp" alt="Test" />);

    act(() => {
      observerCallback([{ isIntersecting: true }]);
    });

    const img = screen.getByAltText('Test');
    expect(img.className).toContain('hidden');

    fireEvent.load(img);
    expect(img.className).toContain('visible');
  });

  it('shows placeholder on image error', () => {
    render(<LazyImage src="/broken.webp" alt="Broken" />);

    act(() => {
      observerCallback([{ isIntersecting: true }]);
    });

    const img = screen.getByAltText('Broken');
    fireEvent.error(img);

    expect(screen.getByText('Imagen no disponible')).toBeInTheDocument();
    expect(screen.queryByAltText('Broken')).not.toBeInTheDocument();
  });

  it('applies custom aspectRatio', () => {
    const { container } = render(<LazyImage src="/test.webp" alt="Test" aspectRatio="1/1" />);
    expect(container.firstChild).toHaveStyle({ aspectRatio: '1/1' });
  });

  it('applies custom className', () => {
    const { container } = render(<LazyImage src="/test.webp" alt="Test" className="my-class" />);
    expect(container.firstChild.className).toContain('my-class');
  });

  it('uses default aspectRatio of 4/3', () => {
    const { container } = render(<LazyImage src="/test.webp" alt="Test" />);
    expect(container.firstChild).toHaveStyle({ aspectRatio: '4/3' });
  });
});
