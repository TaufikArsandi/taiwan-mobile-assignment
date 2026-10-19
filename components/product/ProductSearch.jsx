'use client';

import styles from './ProductSearch.module.css';

export function ProductSearch({ value, onChange }) {
  return (
    <div className={styles.search} role="search">
      <span className={styles.icon} aria-hidden="true">🔍</span>
      <input
        type="search"
        className={styles.input}
        placeholder="搜尋商品…"
        aria-label="搜尋商品"
        value={value}
        onChange={(event) => onChange(event.target.value)}
      />
      {value && (
        <button type="button" className={styles.clear} onClick={() => onChange('')} aria-label="清除搜尋">
          ×
        </button>
      )}
    </div>
  );
}
