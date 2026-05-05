import styles from './EmptyState.module.css';

/**
 * EmptyState — generic empty/placeholder message with an icon.
 *
 * Props:
 *   icon    — emoji or small text icon (optional)
 *   title   — main heading
 *   message — supportive copy
 */
function EmptyState({ icon, title, message }) {
  return (
    <div className={styles.wrapper} role="status" aria-live="polite">
      {icon && <span className={styles.icon} aria-hidden="true">{icon}</span>}
      <h2 className={styles.title}>{title}</h2>
      {message && <p className={styles.message}>{message}</p>}
    </div>
  );
}

export default EmptyState;
