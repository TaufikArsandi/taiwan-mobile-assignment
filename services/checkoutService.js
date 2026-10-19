import { delay } from '@/lib/delay';

const SIMULATED_LATENCY_MS = 1500;

/**
 * Simulated checkout API.
 * @param {Array<{ productId: number, quantity: number }>} lines
 * @returns {Promise<{ orderId: string }>}
 */
export async function submitOrder(lines) {
  if (lines.length === 0) {
    throw new Error('購物車是空的');
  }
  await delay(SIMULATED_LATENCY_MS);
  return { orderId: `ORD-${Date.now()}` };
}
