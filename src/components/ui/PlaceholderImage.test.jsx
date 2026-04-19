import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import PlaceholderImage from './PlaceholderImage';

describe('PlaceholderImage', () => {
  it('renders with default props', () => {
    render(<PlaceholderImage />);
    const container = screen.getByRole('img', { name: /imagen no disponible/i });
    expect(container).toBeInTheDocument();
    expect(container).toHaveStyle({ aspectRatio: '4/3' });
  });

  it('renders the "Imagen no disponible" text', () => {
    render(<PlaceholderImage />);
    expect(screen.getByText('Imagen no disponible')).toBeInTheDocument();
  });

  it('renders an SVG emerald icon', () => {
    const { container } = render(<PlaceholderImage />);
    const svg = container.querySelector('svg');
    expect(svg).toBeInTheDocument();
    expect(svg).toHaveAttribute('aria-hidden', 'true');
  });

  it('applies custom aspectRatio', () => {
    render(<PlaceholderImage aspectRatio="1/1" />);
    const container = screen.getByRole('img', { name: /imagen no disponible/i });
    expect(container).toHaveStyle({ aspectRatio: '1/1' });
  });

  it('applies custom className', () => {
    render(<PlaceholderImage className="custom-class" />);
    const container = screen.getByRole('img', { name: /imagen no disponible/i });
    expect(container.className).toContain('custom-class');
  });
});
