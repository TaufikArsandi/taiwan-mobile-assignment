'use client';

import { useEffect } from 'react';
import { useNotificationStore } from '@/store/notificationStore';
import styles from './Toaster.module.css';

const TOAST_DURATION_MS = 3000;

function Toast({ notification, onDismiss }) {
  useEffect(() => {
    const timer = setTimeout(() => onDismiss(notification.id), TOAST_DURATION_MS);
    return () => clearTimeout(timer);
  }, [notification.id, onDismiss]);

  return (
    <li className={`${styles.toast} ${styles[notification.tone]}`}>
      <span className={styles.message}>{notification.message}</span>
      <button
        type="button"
        className={styles.close}
        onClick={() => onDismiss(notification.id)}
        aria-label="關閉通知"
      >
        ×
      </button>
    </li>
  );
}

export function Toaster() {
  const notifications = useNotificationStore((state) => state.notifications);
  const dismiss = useNotificationStore((state) => state.dismiss);

  return (
    <ol className={styles.toaster} aria-live="polite" aria-label="通知">
      {notifications.map((notification) => (
        <Toast key={notification.id} notification={notification} onDismiss={dismiss} />
      ))}
    </ol>
  );
}
