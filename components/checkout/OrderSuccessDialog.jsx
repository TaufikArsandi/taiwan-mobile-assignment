'use client';

import { useShallow } from 'zustand/react/shallow';
import { Button } from '@/components/ui/Button';
import { Modal } from '@/components/ui/Modal';
import { formatPrice } from '@/lib/format';
import { useOrderStore } from '@/store/orderStore';
import styles from './OrderSuccessDialog.module.css';

export function OrderSuccessDialog() {
  const { lastOrder, dismissLastOrder } = useOrderStore(
    useShallow((state) => ({ lastOrder: state.lastOrder, dismissLastOrder: state.dismissLastOrder })),
  );

  if (!lastOrder) return null;

  return (
    <Modal
      title="結帳成功！"
      onClose={dismissLastOrder}
      actions={
        <Button variant="success" onClick={dismissLastOrder} data-autofocus>繼續購物</Button>
      }
    >
      <p className={styles.icon} aria-hidden="true">✓</p>
      <p className={styles.thanks}>感謝您的購買。</p>
      <p className={styles.orderId}>
        訂單編號：<strong>{lastOrder.orderId}</strong>
      </p>
      <ul className={styles.lines}>
        {lastOrder.lines.map((line) => (
          <li key={line.productId} className={styles.line}>
            <span>{line.name} × {line.quantity}</span>
            <span>{formatPrice(line.price * line.quantity)}</span>
          </li>
        ))}
      </ul>
      <p className={styles.total}>
        <span>共 {lastOrder.totalQuantity} 件</span>
        <span>總計 {formatPrice(lastOrder.totalPrice)}</span>
      </p>
    </Modal>
  );
}
