'use client';

import { Button } from '@/components/ui/Button';
import { useAddToCart } from '@/hooks/useAddToCart';
import { useProductSearch } from '@/hooks/useProductSearch';
import { useProducts } from '@/hooks/useProducts';
import { ProductGrid } from './ProductGrid';
import { ProductSearch } from './ProductSearch';
import styles from './ProductCatalog.module.css';

export function ProductCatalog() {
  const { products, status, error, reloadProducts } = useProducts();
  const { query, setQuery, debouncedQuery, results } = useProductSearch(products);
  const addToCart = useAddToCart();

  return (
    <section className={styles.catalog} aria-labelledby="catalog-heading">
      <div className={styles.toolbar}>
        <h2 id="catalog-heading" className={styles.heading}>所有商品</h2>
        <ProductSearch value={query} onChange={setQuery} />
      </div>

      {(status === 'idle' || status === 'loading') && (
        <p className={styles.status} role="status">載入中...</p>
      )}

      {status === 'error' && (
        <div className={styles.status} role="alert">
          <p>{error}</p>
          <Button variant="secondary" onClick={reloadProducts}>重新載入</Button>
        </div>
      )}

      {status === 'success' && results.length === 0 && (
        <p className={styles.status}>找不到符合「{debouncedQuery}」的商品</p>
      )}

      {status === 'success' && results.length > 0 && (
        <ProductGrid products={results} onAddToCart={addToCart} />
      )}
    </section>
  );
}
