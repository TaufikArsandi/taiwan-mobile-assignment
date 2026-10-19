'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { QuantityStepper } from '@/components/ui/QuantityStepper';
import { formatPrice } from '@/lib/format';
import { clampQuantity } from '@/lib/quantity';
import styles from './ProductCard.module.css';

export function ProductCard({ product, onAddToCart }) {
  const [quantity, setQuantity] = useState(1);

  const stepQuantity = (delta) => setQuantity((current) => clampQuantity(current + delta));

  const handleAdd = () => {
    onAddToCart(product, quantity);
    setQuantity(1);
  };

  return (
    <article className={styles.card}>
      <div className={styles.image} aria-hidden="true">圖片</div>
      <h3 className={styles.title}>{product.name}</h3>
      <p className={styles.price}>{formatPrice(product.price)}</p>
      <div className={styles.actions}>
        <QuantityStepper
          value={quantity}
          onStep={stepQuantity}
          onSet={setQuantity}
          label={`${product.name} 數量`}
        />
        <Button variant="success" block onClick={handleAdd}>加入購物車</Button>
      </div>
    </article>
  );
}
