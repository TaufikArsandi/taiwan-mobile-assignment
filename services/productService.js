import { PRODUCTS } from '@/data/products';
import { delay } from '@/lib/delay';

const SIMULATED_LATENCY_MS = 800;

/** Simulated product API. Swap the body for a real `fetch` when a backend exists. */
export async function fetchProducts() {
  await delay(SIMULATED_LATENCY_MS);
  return PRODUCTS.map((product) => ({ ...product }));
}
