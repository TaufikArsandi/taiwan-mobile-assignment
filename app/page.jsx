import { CartDrawer } from '@/components/cart/CartDrawer';
import { OrderSuccessDialog } from '@/components/checkout/OrderSuccessDialog';
import { Header } from '@/components/layout/Header';
import { ProductCatalog } from '@/components/product/ProductCatalog';
import { ConfirmDialog } from '@/components/ui/ConfirmDialog';
import { Toaster } from '@/components/ui/Toaster';
import styles from './page.module.css';

export default function HomePage() {
  return (
    <>
      <main className={styles.container}>
        <Header />
        <ProductCatalog />
      </main>
      <CartDrawer />
      <ConfirmDialog />
      <OrderSuccessDialog />
      <Toaster />
    </>
  );
}
