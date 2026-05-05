import { useToast } from '../../context/useToast';
import styles from './Toast.module.css';

/**
 * ToastContainer — renders active toasts in a fixed portal area.
 * Toasts auto-dismiss after 3 seconds.
 */
function ToastContainer() {
  const { toasts, removeToast } = useToast();

  if (toasts.length === 0) return null;

  return (
    <div className={styles.container} role="status" aria-live="polite" aria-atomic="false">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`${styles.toast} ${
            toast.variant === 'remove' ? styles.toastRemove : styles.toastAdd
          }`}
        >
          <span className={styles.icon}>
            {toast.variant === 'remove' ? '🗑' : '✓'}
          </span>
          <span className={styles.message}>{toast.message}</span>
          <button
            className={styles.close}
            onClick={() => removeToast(toast.id)}
            aria-label="Dismiss notification"
          >
            ×
          </button>
        </div>
      ))}
    </div>
  );
}

export default ToastContainer;
