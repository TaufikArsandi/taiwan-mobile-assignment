import styles from './Button.module.css';

/**
 * @param {{ variant?: 'primary' | 'secondary' | 'danger' | 'success' | 'ghost', block?: boolean } & React.ButtonHTMLAttributes<HTMLButtonElement>} props
 */
export function Button({ variant = 'primary', block = false, className = '', type = 'button', ...props }) {
  const classes = [styles.button, styles[variant], block && styles.block, className]
    .filter(Boolean)
    .join(' ');
  return <button type={type} className={classes} {...props} />;
}
