'use client';

import { useCallback, useState } from 'react';
import { formatPrice } from '@/lib/format';
import { submitOrder } from '@/services/checkoutService';
import { selectTotalPrice, selectTotalQuantity, useCartStore } from '@/store/cartStore';
import { useDialogStore } from '@/store/dialogStore';
import { useNotificationStore } from '@/store/notificationStore';
import { useOrderStore } from '@/store/orderStore';
import { useUiStore } from '@/store/uiStore';

function toOrderLines(items) {
  return items.map(({ product, quantity }) => ({
    productId: product.id,
    name: product.name,
    price: product.price,
    quantity,
  }));
}

export function useCheckout() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const confirm = useDialogStore((state) => state.confirm);
  const notify = useNotificationStore((state) => state.notify);
  const setLastOrder = useOrderStore((state) => state.setLastOrder);
  const closeCart = useUiStore((state) => state.closeCart);

  const checkout = useCallback(async () => {
    const cart = useCartStore.getState();
    if (cart.items.length === 0) {
      notify({ message: '購物車是空的！', tone: 'error' });
      return;
    }

    const totalQuantity = selectTotalQuantity(cart);
    const totalPrice = selectTotalPrice(cart);
    const confirmed = await confirm({
      title: '確認結帳',
      message: `共 ${totalQuantity} 件商品，總計 ${formatPrice(totalPrice)}。確定要結帳嗎？`,
      confirmLabel: '結帳',
    });
    if (!confirmed) return;

    setIsSubmitting(true);
    try {
      const lines = toOrderLines(cart.items);
      const { orderId } = await submitOrder(lines);
      useCartStore.getState().clear();
      closeCart();
      setLastOrder({ orderId, lines, totalQuantity, totalPrice });
    } catch (error) {
      notify({ message: error instanceof Error ? error.message : '結帳失敗，請稍後再試', tone: 'error' });
    } finally {
      setIsSubmitting(false);
    }
  }, [confirm, notify, setLastOrder, closeCart]);

  return { checkout, isSubmitting };
}
