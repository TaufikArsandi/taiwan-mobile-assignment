'use client';

import { useMemo, useState } from 'react';
import { filterProducts } from '@/lib/filterProducts';
import { useDebouncedValue } from './useDebouncedValue';

const SEARCH_DEBOUNCE_MS = 250;

export function useProductSearch(products) {
  const [query, setQuery] = useState('');
  const debouncedQuery = useDebouncedValue(query, SEARCH_DEBOUNCE_MS);

  const results = useMemo(
    () => filterProducts(products, debouncedQuery),
    [products, debouncedQuery],
  );

  return { query, setQuery, debouncedQuery, results };
}
