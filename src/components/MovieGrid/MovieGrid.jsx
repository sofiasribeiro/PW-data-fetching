import styles from './MovieGrid.module.css';

/**
 * MovieGrid — responsive 4→2→1 column grid that renders children.
 */
function MovieGrid({ children, label }) {
  return (
    <section className={styles.grid} aria-label={label || 'Movie results'}>
      {children}
    </section>
  );
}

export default MovieGrid;
