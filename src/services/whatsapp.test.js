import { describe, it, expect } from 'vitest';
import {
  isValidPhoneNumber,
  generateProductWhatsAppUrl,
  generateGreetingWhatsAppUrl,
} from './whatsapp.js';

describe('isValidPhoneNumber', () => {
  it('accepts a valid 10-digit number', () => {
    expect(isValidPhoneNumber('5730012345')).toBe(true);
  });

  it('accepts a valid number longer than 10 digits', () => {
    expect(isValidPhoneNumber('573134152951')).toBe(true);
  });

  it('rejects a number shorter than 10 digits', () => {
    expect(isValidPhoneNumber('12345')).toBe(false);
  });

  it('rejects a number with non-digit characters', () => {
    expect(isValidPhoneNumber('+573134152951')).toBe(false);
    expect(isValidPhoneNumber('57-300-123')).toBe(false);
  });

  it('rejects non-string input', () => {
    expect(isValidPhoneNumber(573134152951)).toBe(false);
    expect(isValidPhoneNumber(null)).toBe(false);
    expect(isValidPhoneNumber(undefined)).toBe(false);
  });

  it('rejects empty string', () => {
    expect(isValidPhoneNumber('')).toBe(false);
  });
});

describe('generateProductWhatsAppUrl', () => {
  it('generates a valid WhatsApp URL for Spanish', () => {
    const url = generateProductWhatsAppUrl('Esmeralda Muzo', '$2.500.000', 'es');
    expect(url).not.toBeNull();
    expect(url).toMatch(/^https:\/\/wa\.me\/573134152951\?text=/);
    const text = decodeURIComponent(url.split('?text=')[1]);
    expect(text).toContain('Esmeralda Muzo');
    expect(text).toContain('$2.500.000');
  });

  it('generates a valid WhatsApp URL for English', () => {
    const url = generateProductWhatsAppUrl('Muzo Emerald', '$2,500,000', 'en');
    expect(url).not.toBeNull();
    const text = decodeURIComponent(url.split('?text=')[1]);
    expect(text).toContain('Muzo Emerald');
    expect(text).toContain('$2,500,000');
  });

  it('defaults to Spanish when no language is provided', () => {
    const url = generateProductWhatsAppUrl('Esmeralda', '$1.000.000');
    const text = decodeURIComponent(url.split('?text=')[1]);
    expect(text).toContain('¡Hola!');
  });

  it('falls back to Spanish for unsupported language codes', () => {
    const url = generateProductWhatsAppUrl('Esmeralda', '$1.000.000', 'fr');
    const text = decodeURIComponent(url.split('?text=')[1]);
    expect(text).toContain('¡Hola!');
  });
});

describe('generateGreetingWhatsAppUrl', () => {
  it('generates greeting URL in Spanish', () => {
    const url = generateGreetingWhatsAppUrl('es');
    expect(url).not.toBeNull();
    expect(url).toMatch(/^https:\/\/wa\.me\/573134152951\?text=/);
    const text = decodeURIComponent(url.split('?text=')[1]);
    expect(text).toBe('¡Hola! Estoy interesado en sus esmeraldas colombianas.');
  });

  it('generates greeting URL in English', () => {
    const url = generateGreetingWhatsAppUrl('en');
    const text = decodeURIComponent(url.split('?text=')[1]);
    expect(text).toBe("Hello! I'm interested in your Colombian emeralds.");
  });

  it('defaults to Spanish when no language is provided', () => {
    const url = generateGreetingWhatsAppUrl();
    const text = decodeURIComponent(url.split('?text=')[1]);
    expect(text).toContain('¡Hola!');
  });
});
