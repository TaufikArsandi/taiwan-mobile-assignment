'use client';

import { useEffect, useId, useRef } from 'react';
import styles from './Modal.module.css';

/**
 * Accessible modal shell: backdrop click and Escape call `onClose`,
 * and focus moves into the dialog when it opens.
 */
export function Modal({ title, onClose, role = 'dialog', children, actions }) {
  const dialogRef = useRef(null);
  const titleId = useId();

  useEffect(() => {
    const preferred = dialogRef.current?.querySelector('[data-autofocus]');
    (preferred ?? dialogRef.current)?.focus();

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  return (
    <div className={styles.backdrop} onClick={onClose}>
      <div
        ref={dialogRef}
        className={styles.dialog}
        role={role}
        aria-modal="true"
        aria-labelledby={titleId}
        tabIndex={-1}
        onClick={(event) => event.stopPropagation()}
      >
        <h2 id={titleId} className={styles.title}>{title}</h2>
        <div className={styles.content}>{children}</div>
        <div className={styles.actions}>{actions}</div>
      </div>
    </div>
  );
}
