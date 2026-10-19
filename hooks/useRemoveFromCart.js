'use client';

import { useCallback } from 'react';
import { useCartStore } from '@/store/cartStore';
import { useDialogStore } from '@/store/dialogStore';
import { useNotificationStore } from '@/store/notificationStore';

/** Returns an async remover that asks for confirmation first. Resolves `true` if removed. */
export function useRemoveFromCart() {
  const removeItem = useCartStore((state) => state.removeItem);
  const confirm = useDialogStore((state) => state.confirm);
  const notify = useNotificationStore((state) => state.notify);

  return useCallback(
    async (product) => {
      const confirmed = await confirm({
        title: '移除商品',
        message: `確定要將「${product.name}」從購物車移除嗎？`,
        confirmLabel: '移除',
        tone: 'danger',
      });
      if (!confirmed) return false;

      removeItem(product.id);
      notify({ message: `已移除「${product.name}」`, tone: 'info' });
      return true;
    },
    [confirm, removeItem, notify],
  );
}
