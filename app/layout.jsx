import './globals.css';

export const metadata = {
  title: '精品商店',
  description: '精品商店商品展示與購物車',
};

export default function RootLayout({ children }) {
  return (
    <html lang="zh-TW">
      <body>{children}</body>
    </html>
  );
}
