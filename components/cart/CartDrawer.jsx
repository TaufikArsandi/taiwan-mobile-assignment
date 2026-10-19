'use client';

import { useEffect } from 'react';
import { useShallow } from 'zustand/react/shallow';
import { selectIsDialogOpen, useDialogStore } from '@/store/dialogStore';
import { useUiStore } from '@/store/uiStore';
import { CartItemList } from './CartItemList';
import { CartSummary } from './CartSummary';
import styles from './CartDrawer.module.css';

export function CartDrawer() {
  const { isCartOpen, closeCart } = useUiStore(
    useShallow((state) => ({ isCartOpen: state.isCartOpen, closeCart: state.closeCart })),
  );

  useEffect(() => {
    if (!isCartOpen) return undefined;
    const handleKeyDown = (event) => {
      // The confirm dialog owns Escape while it is open.
      if (event.key === 'Escape' && !selectIsDialogOpen(useDialogStore.getState())) closeCart();
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isCartOpen, closeCart]);

  return (
    <>
      <div
        className={`${styles.backdrop} ${isCartOpen ? styles.visible : ''}`}
        onClick={closeCart}
        aria-hidden="true"
      />
      <aside
        className={`${styles.drawer} ${isCartOpen ? styles.open : ''}`}
        aria-label="購物車"
        aria-hidden={!isCartOpen}
        inert={!isCartOpen}
      >
        <header className={styles.header}>
          <h2 className={styles.title}>購物車</h2>
          <button type="button" className={styles.close} onClick={closeCart} aria-label="關閉購物車">
            ×
          </button>
        </header>
        <div className={styles.body}>
          <CartItemList />
        </div>
        <CartSummary />
      </aside>
    </>
  );
}
