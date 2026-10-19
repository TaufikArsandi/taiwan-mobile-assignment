import '@testing-library/jest-dom/vitest';
import { cleanup } from '@testing-library/react';
import { afterEach } from 'vitest';
import { useCartStore } from '@/store/cartStore';
import { useDialogStore } from '@/store/dialogStore';
import { useNotificationStore } from '@/store/notificationStore';
import { useOrderStore } from '@/store/orderStore';
import { useProductStore } from '@/store/productStore';
import { useUiStore } from '@/store/uiStore';

const stores = [useCartStore, useDialogStore, useNotificationStore, useOrderStore, useProductStore, useUiStore];
const initialStates = stores.map((store) => store.getInitialState());

afterEach(() => {
  cleanup();
  stores.forEach((store, index) => store.setState(initialStates[index], true));
});
