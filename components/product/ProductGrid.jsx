import { ProductCard } from './ProductCard';
import styles from './ProductGrid.module.css';

export function ProductGrid({ products, onAddToCart }) {
  return (
    <ul className={styles.grid}>
      {products.map((product) => (
        <li key={product.id}>
          <ProductCard product={product} onAddToCart={onAddToCart} />
        </li>
      ))}
    </ul>
  );
}
