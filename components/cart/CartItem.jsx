'use client';

import { QuantityStepper } from '@/components/ui/QuantityStepper';
import { formatPrice } from '@/lib/format';
import styles from './CartItem.module.css';

export function CartItem({ item, onQuantityStep, onQuantitySet, onRemove }) {
  const { product, quantity } = item;

  const handleStep = (delta) => {
    if (quantity + delta <= 0) {
      onRemove(product);
      return;
    }
    onQuantityStep(product.id, delta);
  };

  const handleSet = (nextQuantity) => {
    if (nextQuantity <= 0) {
      onRemove(product);
      return;
    }
    onQuantitySet(product.id, nextQuantity);
  };

  return (
    <li className={styles.item}>
      <div className={styles.image} aria-hidden="true">圖片</div>
      <div className={styles.details}>
        <p className={styles.title}>{product.name}</p>
        <p className={styles.price}>{formatPrice(product.price)}</p>
        <QuantityStepper
          value={quantity}
          onStep={handleStep}
          onSet={handleSet}
          min={0}
          label={`${product.name} 數量`}
        />
      </div>
      <div className={styles.aside}>
        <p className={styles.subtotal}>{formatPrice(product.price * quantity)}</p>
        <button
          type="button"
          className={styles.remove}
          onClick={() => onRemove(product)}
          aria-label={`移除 ${product.name}`}
        >
          移除
        </button>
      </div>
    </li>
  );
}
