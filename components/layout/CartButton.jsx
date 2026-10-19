'use client';

import { selectTotalQuantity, useCartStore } from '@/store/cartStore';
import { useUiStore } from '@/store/uiStore';
import styles from './CartButton.module.css';

export function CartButton() {
  const totalQuantity = useCartStore(selectTotalQuantity);
  const toggleCart = useUiStore((state) => state.toggleCart);

  return (
    <button
      type="button"
      className={styles.cartButton}
      onClick={toggleCart}
      aria-label={`購物車，共 ${totalQuantity} 件商品`}
    >
      <span aria-hidden="true">🛒</span>
      <span className={styles.label}>購物車</span>
      <span className={styles.badge} aria-hidden="true">{totalQuantity}</span>
    </button>
  );
}
