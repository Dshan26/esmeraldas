import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import WhatsAppFloatingButton from './WhatsAppFloatingButton';
import '../../i18n/i18n';

describe('WhatsAppFloatingButton', () => {
  it('renders a link with aria-label WhatsApp', () => {
    render(<WhatsAppFloatingButton />);
    const link = screen.getByLabelText('WhatsApp');
    expect(link).toBeInTheDocument();
  });

  it('opens in a new tab with noopener noreferrer', () => {
    render(<WhatsAppFloatingButton />);
    const link = screen.getByLabelText('WhatsApp');
    expect(link).toHaveAttribute('target', '_blank');
    expect(link).toHaveAttribute('rel', 'noopener noreferrer');
  });

  it('links to wa.me with the configured phone number', () => {
    render(<WhatsAppFloatingButton />);
    const link = screen.getByLabelText('WhatsApp');
    expect(link.getAttribute('href')).toMatch(/^https:\/\/wa\.me\/573134152951/);
  });

  it('includes a greeting message in the URL', () => {
    render(<WhatsAppFloatingButton />);
    const link = screen.getByLabelText('WhatsApp');
    const href = link.getAttribute('href');
    expect(href).toContain('text=');
    const url = new URL(href);
    const text = url.searchParams.get('text');
    expect(text.length).toBeGreaterThan(0);
  });

  it('contains an SVG icon', () => {
    render(<WhatsAppFloatingButton />);
    const link = screen.getByLabelText('WhatsApp');
    const svg = link.querySelector('svg');
    expect(svg).toBeInTheDocument();
  });
});
