'use client';

import { useRemoveFromCart } from '@/hooks/useRemoveFromCart';
import { selectCartItems, useCartStore } from '@/store/cartStore';
import { CartItem } from './CartItem';
import styles from './CartItemList.module.css';

export function CartItemList() {
  const items = useCartStore(selectCartItems);
  const setQuantity = useCartStore((state) => state.setQuantity);
  const changeQuantity = useCartStore((state) => state.changeQuantity);
  const removeFromCart = useRemoveFromCart();

  if (items.length === 0) {
    return <p className={styles.empty}>購物車是空的</p>;
  }

  return (
    <ul className={styles.list}>
      {items.map((item) => (
        <CartItem
          key={item.product.id}
          item={item}
          onQuantityStep={changeQuantity}
          onQuantitySet={setQuantity}
          onRemove={removeFromCart}
        />
      ))}
    </ul>
  );
}
