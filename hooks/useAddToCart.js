'use client';

import { useCallback } from 'react';
import { useCartStore } from '@/store/cartStore';
import { useNotificationStore } from '@/store/notificationStore';

export function useAddToCart() {
  const addItem = useCartStore((state) => state.addItem);
  const notify = useNotificationStore((state) => state.notify);

  return useCallback(
    (product, quantity = 1) => {
      addItem(product, quantity);
      notify({ message: `已將 ${quantity} 件「${product.name}」加入購物車`, tone: 'success' });
    },
    [addItem, notify],
  );
}
