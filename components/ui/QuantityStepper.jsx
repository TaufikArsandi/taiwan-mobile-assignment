'use client';

import { useQuantityInput } from '@/hooks/useQuantityInput';
import { MAX_QUANTITY } from '@/lib/quantity';
import styles from './QuantityStepper.module.css';

/**
 * Quantity control supporting ±1 steps and typing any amount directly.
 * Steps are emitted as deltas (`onStep(+1 | -1)`) so rapid clicks are applied
 * to the latest state instead of a stale rendered value; typed amounts are
 * emitted as absolute values via `onSet` (0 only when `min` is 0, meaning "remove").
 */
export function QuantityStepper({ value, onStep, onSet, min = 1, max = MAX_QUANTITY, label }) {
  const inputProps = useQuantityInput(value, (quantity) => onSet(Math.max(quantity, min)));

  return (
    <div className={styles.stepper} role="group" aria-label={label}>
      <button
        type="button"
        className={styles.step}
        onClick={() => onStep(-1)}
        disabled={value <= min}
        aria-label="減少數量"
      >
        −
      </button>
      <input className={styles.input} aria-label="數量" {...inputProps} />
      <button
        type="button"
        className={styles.step}
        onClick={() => onStep(1)}
        disabled={value >= max}
        aria-label="增加數量"
      >
        +
      </button>
    </div>
  );
}
