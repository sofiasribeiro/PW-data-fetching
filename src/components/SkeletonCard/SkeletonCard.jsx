import styles from './SkeletonCard.module.css';

/**
 * SkeletonCard — animated shimmer placeholder shown while movies are loading.
 */
function SkeletonCard() {
  return (
    <div className={styles.card} aria-hidden="true" role="presentation">
      <div className={styles.poster} />
      <div className={styles.info}>
        <div className={`${styles.line} ${styles.titleLine}`} />
        <div className={`${styles.line} ${styles.yearLine}`} />
        <div className={`${styles.line} ${styles.btnLine}`} />
      </div>
    </div>
  );
}

export default SkeletonCard;
