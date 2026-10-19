import { describe, expect, it } from 'vitest';
import { filterProducts } from '@/lib/filterProducts';
import { formatPrice } from '@/lib/format';
import { MAX_QUANTITY, parseQuantity } from '@/lib/quantity';
import { PRODUCTS } from '@/data/products';

describe('parseQuantity', () => {
  it('parses whole numbers, including multi-digit values', () => {
    expect(parseQuantity('5')).toBe(5);
    expect(parseQuantity(' 12 ')).toBe(12);
  });

  it('returns 0 for an explicit zero so callers can treat it as remove', () => {
    expect(parseQuantity('0')).toBe(0);
  });

  it('rejects non-numeric, negative and decimal input', () => {
    expect(parseQuantity('')).toBeNull();
    expect(parseQuantity('abc')).toBeNull();
    expect(parseQuantity('-3')).toBeNull();
    expect(parseQuantity('2.5')).toBeNull();
  });

  it('caps at the maximum quantity', () => {
    expect(parseQuantity('1000')).toBe(MAX_QUANTITY);
  });
});

describe('filterProducts', () => {
  it('returns all products for an empty query', () => {
    expect(filterProducts(PRODUCTS, '  ')).toHaveLength(PRODUCTS.length);
  });

  it('matches by substring, case-insensitively', () => {
    expect(filterProducts(PRODUCTS, '無線').map((p) => p.id)).toEqual([1, 4]);
    expect(filterProducts(PRODUCTS, 'usb').map((p) => p.id)).toEqual([7]);
  });

  it('returns an empty list when nothing matches', () => {
    expect(filterProducts(PRODUCTS, '冰箱')).toEqual([]);
  });
});

describe('formatPrice', () => {
  it('adds currency and thousands separators', () => {
    expect(formatPrice(8999)).toBe('NT$ 8,999');
  });
});
