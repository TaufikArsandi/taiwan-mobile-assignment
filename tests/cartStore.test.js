import { describe, expect, it } from 'vitest';
import { MAX_QUANTITY } from '@/lib/quantity';
import { selectTotalPrice, selectTotalQuantity, useCartStore } from '@/store/cartStore';
import { earphones, mouse } from './fixtures';

const cart = () => useCartStore.getState();

describe('cartStore', () => {
  it('adds a new product and merges repeat adds into one line', () => {
    cart().addItem(earphones);
    cart().addItem(earphones, 3);

    expect(cart().items).toEqual([{ product: earphones, quantity: 4 }]);
  });

  it('sets an absolute quantity (update by multiples)', () => {
    cart().addItem(earphones);
    cart().setQuantity(earphones.id, 7);

    expect(cart().items[0].quantity).toBe(7);
  });

  it('applies consecutive relative changes against the latest state', () => {
    cart().addItem(earphones);
    cart().changeQuantity(earphones.id, 1);
    cart().changeQuantity(earphones.id, 1);
    cart().changeQuantity(earphones.id, 1);

    expect(cart().items[0].quantity).toBe(4);
  });

  it('clamps quantities to the allowed range', () => {
    cart().addItem(earphones, 500);
    expect(cart().items[0].quantity).toBe(MAX_QUANTITY);

    cart().setQuantity(earphones.id, -2);
    expect(cart().items[0].quantity).toBe(1);
  });

  it('ignores updates for products not in the cart', () => {
    cart().addItem(earphones);
    cart().setQuantity(999, 5);
    cart().removeItem(999);

    expect(cart().items).toEqual([{ product: earphones, quantity: 1 }]);
  });

  it('computes total quantity and total price', () => {
    cart().addItem(earphones, 2);
    cart().addItem(mouse, 3);

    expect(selectTotalQuantity(cart())).toBe(5);
    expect(selectTotalPrice(cart())).toBe(2 * 2999 + 3 * 899);
  });

  it('removes items and clears the cart', () => {
    cart().addItem(earphones);
    cart().addItem(mouse);
    cart().removeItem(earphones.id);
    expect(cart().items.map((item) => item.product.id)).toEqual([mouse.id]);

    cart().clear();
    expect(cart().items).toEqual([]);
  });
});
