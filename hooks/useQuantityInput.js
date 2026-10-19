'use client';

import { useCallback, useState } from 'react';
import { parseQuantity } from '@/lib/quantity';

/**
 * Keeps a free-typing text draft for a quantity field and commits a parsed
 * number on blur/Enter. Invalid input snaps back to the current value.
 * @param {number} value
 * @param {(quantity: number) => void} onCommit  receives 0 when the user typed 0
 */
export function useQuantityInput(value, onCommit) {
  const [draft, setDraft] = useState(null);

  const commit = useCallback(() => {
    if (draft === null) return;
    const parsed = parseQuantity(draft);
    setDraft(null);
    if (parsed !== null && parsed !== value) onCommit(parsed);
  }, [draft, value, onCommit]);

  const inputProps = {
    value: draft ?? String(value),
    inputMode: 'numeric',
    onChange: (event) => setDraft(event.target.value.replace(/\D/g, '')),
    onBlur: commit,
    onKeyDown: (event) => {
      if (event.key === 'Enter') event.currentTarget.blur();
    },
  };

  return inputProps;
}
