import { act, render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import HomePage from '@/app/page';
import { PRODUCTS } from '@/data/products';
import { useCartStore } from '@/store/cartStore';

vi.mock('@/services/productService', () => ({
  fetchProducts: vi.fn(async () => PRODUCTS.map((product) => ({ ...product }))),
}));

vi.mock('@/services/checkoutService', () => ({
  submitOrder: vi.fn(async () => ({ orderId: 'ORD-TEST' })),
}));

async function renderShop() {
  const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime });
  render(<HomePage />);
  await screen.findByText('智慧手錶');
  return user;
}

function productCard(name) {
  return screen.getByRole('heading', { name }).closest('article');
}

function cartDrawer() {
  return document.querySelector('aside');
}

describe('Shop', () => {
  beforeEach(() => vi.useFakeTimers({ shouldAdvanceTime: true }));
  afterEach(() => vi.useRealTimers());

  it('notifies and updates the cart badge when adding multiple units', async () => {
    const user = await renderShop();
    const card = productCard('無線滑鼠');

    await user.click(within(card).getByRole('button', { name: '增加數量' }));
    await user.click(within(card).getByRole('button', { name: '增加數量' }));
    await user.click(within(card).getByRole('button', { name: '加入購物車' }));

    expect(screen.getByText('已將 3 件「無線滑鼠」加入購物車')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: '購物車，共 3 件商品' })).toBeInTheDocument();
  });

  it('counts every click when + is clicked rapidly (before re-render)', async () => {
    useCartStore.getState().addItem(PRODUCTS[0]);
    const user = await renderShop();
    await user.click(screen.getByRole('button', { name: /購物車，共/ }));

    const plus = within(cartDrawer()).getByRole('button', { name: '增加數量' });
    act(() => {
      plus.click();
      plus.click();
      plus.click();
    });

    expect(useCartStore.getState().items[0].quantity).toBe(4);
  });

  it('dismisses notifications automatically', async () => {
    const user = await renderShop();
    await user.click(within(productCard('智慧手錶')).getByRole('button', { name: '加入購物車' }));
    expect(screen.getByText('已將 1 件「智慧手錶」加入購物車')).toBeInTheDocument();

    await act(() => vi.advanceTimersByTimeAsync(3100));
    expect(screen.queryByText('已將 1 件「智慧手錶」加入購物車')).not.toBeInTheDocument();
  });

  it('filters products with the search box', async () => {
    const user = await renderShop();

    await user.type(screen.getByRole('searchbox', { name: '搜尋商品' }), '無線');
    await act(() => vi.advanceTimersByTimeAsync(300));

    expect(screen.getAllByRole('article')).toHaveLength(2);
    expect(screen.queryByText('智慧手錶')).not.toBeInTheDocument();
  });

  it('shows an empty state when the search has no matches', async () => {
    const user = await renderShop();

    await user.type(screen.getByRole('searchbox', { name: '搜尋商品' }), '冰箱');
    await act(() => vi.advanceTimersByTimeAsync(300));

    expect(screen.getByText('找不到符合「冰箱」的商品')).toBeInTheDocument();
  });

  it('lets the user type a quantity directly in the cart', async () => {
    useCartStore.getState().addItem(PRODUCTS[0]);
    const user = await renderShop();
    await user.click(screen.getByRole('button', { name: /購物車，共/ }));

    const input = within(cartDrawer()).getByRole('textbox', { name: '數量' });
    await user.tripleClick(input);
    await user.keyboard('12{Enter}');

    expect(useCartStore.getState().items[0].quantity).toBe(12);
    expect(within(cartDrawer()).getByTestId('cart-total-quantity')).toHaveTextContent('12 件');
  });

  it('asks for confirmation before removing an item and respects cancel', async () => {
    useCartStore.getState().addItem(PRODUCTS[0]);
    const user = await renderShop();
    await user.click(screen.getByRole('button', { name: /購物車，共/ }));

    await user.click(within(cartDrawer()).getByRole('button', { name: '移除 無線藍牙耳機' }));
    const dialog = screen.getByRole('alertdialog', { name: '移除商品' });
    await user.click(within(dialog).getByRole('button', { name: '取消' }));
    expect(useCartStore.getState().items).toHaveLength(1);

    await user.click(within(cartDrawer()).getByRole('button', { name: '移除 無線藍牙耳機' }));
    await user.click(within(screen.getByRole('alertdialog')).getByRole('button', { name: '移除' }));
    expect(useCartStore.getState().items).toHaveLength(0);
    expect(within(cartDrawer()).getByText('購物車是空的')).toBeInTheDocument();
  });

  it('asks for confirmation when decrementing the last unit', async () => {
    useCartStore.getState().addItem(PRODUCTS[0]);
    const user = await renderShop();
    await user.click(screen.getByRole('button', { name: /購物車，共/ }));

    await user.click(within(cartDrawer()).getByRole('button', { name: '減少數量' }));

    expect(screen.getByRole('alertdialog', { name: '移除商品' })).toBeInTheDocument();
  });

  it('confirms checkout, clears the cart and shows the order confirmation', async () => {
    useCartStore.getState().addItem(PRODUCTS[0], 2);
    const user = await renderShop();
    await user.click(screen.getByRole('button', { name: /購物車，共/ }));

    await user.click(within(cartDrawer()).getByRole('button', { name: '結帳' }));
    const confirmDialog = screen.getByRole('alertdialog', { name: '確認結帳' });
    expect(confirmDialog).toHaveTextContent('共 2 件商品，總計 NT$ 5,998');
    await user.click(within(confirmDialog).getByRole('button', { name: '結帳' }));

    const success = await screen.findByRole('dialog', { name: '結帳成功！' });
    expect(success).toHaveTextContent('ORD-TEST');
    expect(success).toHaveTextContent('無線藍牙耳機 × 2');
    expect(useCartStore.getState().items).toEqual([]);
    expect(screen.getByRole('button', { name: '購物車，共 0 件商品' })).toBeInTheDocument();

    await user.click(within(success).getByRole('button', { name: '繼續購物' }));
    expect(screen.queryByRole('dialog', { name: '結帳成功！' })).not.toBeInTheDocument();
  });

  it('shows an error notification when checkout fails and keeps the cart', async () => {
    const { submitOrder } = await import('@/services/checkoutService');
    submitOrder.mockRejectedValueOnce(new Error('付款服務暫時無法使用'));
    useCartStore.getState().addItem(PRODUCTS[0]);
    const user = await renderShop();
    await user.click(screen.getByRole('button', { name: /購物車，共/ }));

    await user.click(within(cartDrawer()).getByRole('button', { name: '結帳' }));
    await user.click(within(screen.getByRole('alertdialog')).getByRole('button', { name: '結帳' }));

    expect(await screen.findByText('付款服務暫時無法使用')).toBeInTheDocument();
    expect(useCartStore.getState().items).toHaveLength(1);
  });

  it('does not check out when the dialog is dismissed with Escape', async () => {
    useCartStore.getState().addItem(PRODUCTS[0]);
    const user = await renderShop();
    await user.click(screen.getByRole('button', { name: /購物車，共/ }));

    await user.click(within(cartDrawer()).getByRole('button', { name: '結帳' }));
    await user.keyboard('{Escape}');

    expect(screen.queryByRole('alertdialog')).not.toBeInTheDocument();
    expect(useCartStore.getState().items).toHaveLength(1);
    expect(cartDrawer()).toHaveAttribute('aria-hidden', 'false');
  });
});
