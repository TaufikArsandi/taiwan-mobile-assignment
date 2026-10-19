import { CartButton } from './CartButton';
import styles from './Header.module.css';

export function Header() {
  return (
    <header className={styles.header}>
      <h1 className={styles.title}>精品商店</h1>
      <CartButton />
    </header>
  );
}
