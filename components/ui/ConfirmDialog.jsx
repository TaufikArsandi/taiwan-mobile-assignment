'use client';

import { useCallback } from 'react';
import { useShallow } from 'zustand/react/shallow';
import { useDialogStore } from '@/store/dialogStore';
import { Button } from './Button';
import { Modal } from './Modal';

export function ConfirmDialog() {
  const { request, respond } = useDialogStore(
    useShallow((state) => ({ request: state.request, respond: state.respond })),
  );
  const cancel = useCallback(() => respond(false), [respond]);

  if (!request) return null;

  const { title, message, confirmLabel = '確認', cancelLabel = '取消', tone = 'primary' } = request;

  return (
    <Modal
      role="alertdialog"
      title={title}
      onClose={cancel}
      actions={
        <>
          <Button variant="secondary" onClick={cancel}>{cancelLabel}</Button>
          <Button variant={tone} onClick={() => respond(true)} data-autofocus>
            {confirmLabel}
          </Button>
        </>
      }
    >
      <p>{message}</p>
    </Modal>
  );
}
