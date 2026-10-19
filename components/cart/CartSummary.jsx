'use client';

import { Button } from '@/components/ui/Button';
import { useCheckout } from '@/hooks/useCheckout';
import { formatPrice } from '@/lib/format';
import { selectTotalPrice, selectTotalQuantity, useCartStore } from '@/store/cartStore';
import styles from './CartSummary.module.css';

export function CartSummary() {
  const totalQuantity = useCartStore(selectTotalQuantity);
  const totalPrice = useCartStore(selectTotalPrice);
  const { checkout, isSubmitting } = useCheckout();

  return (
    <div className={styles.summary}>
      <dl className={styles.rows}>
        <div className={styles.row}>
          <dt>商品數量</dt>
          <dd data-testid="cart-total-quantity">{totalQuantity} 件</dd>
        </div>
        <div className={`${styles.row} ${styles.total}`}>
          <dt>總計</dt>
          <dd data-testid="cart-total-price">{formatPrice(totalPrice)}</dd>
        </div>
      </dl>
      <Button
        variant="danger"
        block
        onClick={checkout}
        disabled={totalQuantity === 0 || isSubmitting}
        aria-busy={isSubmitting}
      >
        {isSubmitting ? '結帳中...' : '結帳'}
      </Button>
    </div>
  );
}
