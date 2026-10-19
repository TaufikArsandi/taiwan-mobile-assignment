# 精品商店 – Next.js + Zustand

A refactor of the original static page (`legacy/index.html`) into a Next.js (App Router) + React app with Zustand state management.

## Features

| Objective | Where |
| --- | --- |
| Confirm dialog before checkout / removing an item | `components/ui/ConfirmDialog.jsx`, `store/dialogStore.js` (promise-based `confirm()`), `hooks/useCheckout.js`, `hooks/useRemoveFromCart.js` |
| Notification when an item is added | `components/ui/Toaster.jsx`, `store/notificationStore.js`, `hooks/useAddToCart.js` |
| Total cart quantity | `selectTotalQuantity` in `store/cartStore.js` → header badge + cart summary |
| Product search (debounced) | `components/product/ProductSearch.jsx`, `hooks/useProductSearch.js`, `lib/filterProducts.js` |
| Update quantity by multiples | `components/ui/QuantityStepper.jsx` – type any amount (1–99), pick a quantity before adding; ± steps are applied as deltas so rapid clicks all count |
| Cart + simulated checkout with success confirmation | `components/cart/*`, `services/checkoutService.js`, `components/checkout/OrderSuccessDialog.jsx` |

## Structure

```
app/            Next.js entry (layout, page, global design tokens)
components/     UI split by domain: ui/, layout/, product/, cart/, checkout/
hooks/          Behaviour hooks – business logic lives here, not in components
store/          Zustand stores: cart, products, dialog, notifications, order, ui
services/       Simulated APIs (products, checkout)
lib/            Pure helpers (quantity parsing, filtering, formatting)
tests/          Vitest + Testing Library
```

Styling: CSS variables in `app/globals.css` + one CSS Module per component; responsive grid (4 → 3 → 2 → 1 columns).

## Scripts

```bash
npm install
npm run dev     # http://localhost:3000
npm run lint
npm test
npm run build
```
