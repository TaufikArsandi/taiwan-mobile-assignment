const priceFormatter = new Intl.NumberFormat('zh-TW', { maximumFractionDigits: 0 });

export function formatPrice(amount) {
  return `NT$ ${priceFormatter.format(amount)}`;
}
