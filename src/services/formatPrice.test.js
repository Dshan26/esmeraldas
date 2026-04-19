import { describe, it, expect } from 'vitest';
import { formatPrice } from './formatPrice';

describe('formatPrice', () => {
  it('formats zero correctly', () => {
    expect(formatPrice(0)).toBe('$0 COP');
  });

  it('formats small numbers without separators', () => {
    expect(formatPrice(500)).toBe('$500 COP');
  });

  it('formats thousands with dot separator', () => {
    expect(formatPrice(1000)).toBe('$1.000 COP');
  });

  it('formats millions correctly', () => {
    expect(formatPrice(2500000)).toBe('$2.500.000 COP');
  });

  it('formats large numbers correctly', () => {
    expect(formatPrice(150000000)).toBe('$150.000.000 COP');
  });

  it('always starts with $ and ends with COP', () => {
    const result = formatPrice(42000);
    expect(result.startsWith('$')).toBe(true);
    expect(result.endsWith(' COP')).toBe(true);
  });
});
