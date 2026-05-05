import styles from './MovieCard.module.css';

/**
 * MovieCard — displays a single movie's poster, title, year, and an action button.
 *
 * Props:
 *   movie   — { id, title, year, poster }
 *   onAdd   — optional: called when "+ Add to Watchlist" is clicked (Search page)
 *   onRemove — optional: called when "×" is clicked (Watchlist page)
 *   isAdding — boolean, shows loading state on the Add button
 *   isRemoving — boolean, shows loading state on the Remove button
 *   inWatchlist — boolean, shows "In Watchlist" badge if true
 */
function MovieCard({ movie, onAdd, onRemove, isAdding, isRemoving, inWatchlist }) {
  const { title, year, poster } = movie;

  const fallbackPoster = `https://placehold.co/300x445/e5e7eb/9ca3af?text=${encodeURIComponent(title)}`;

  return (
    <article className={styles.card} aria-label={`${title} (${year})`}>
      <div className={styles.posterWrapper}>
        <img
          src={poster && poster !== 'N/A' ? poster : fallbackPoster}
          alt={`${title} poster`}
          className={styles.poster}
          loading="lazy"
          onError={(e) => {
            e.currentTarget.src = fallbackPoster;
          }}
        />
        {inWatchlist && (
          <span className={styles.badge} aria-label="Already in watchlist">
            ✓ In Watchlist
          </span>
        )}
      </div>

      <div className={styles.info}>
        <h3 className={styles.title} title={title}>
          {title}
        </h3>
        <p className={styles.year}>{year}</p>

        <div className={styles.actions}>
          {onAdd && (
            <button
              className={styles.btnAdd}
              onClick={() => onAdd(movie)}
              disabled={isAdding || inWatchlist}
              aria-label={
                inWatchlist
                  ? `${title} is already in your watchlist`
                  : `Add ${title} to watchlist`
              }
            >
              {isAdding ? (
                <span className={styles.btnSpinner} aria-hidden="true" />
              ) : (
                <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
              )}
              {isAdding ? 'Adding…' : inWatchlist ? 'Added' : 'Add to Watchlist'}
            </button>
          )}

          {onRemove && (
            <button
              className={styles.btnRemove}
              onClick={() => onRemove(movie.id)}
              disabled={isRemoving}
              aria-label={`Remove ${title} from watchlist`}
            >
              {isRemoving ? (
                <span className={styles.btnSpinner} aria-hidden="true" />
              ) : (
                '×'
              )}
            </button>
          )}
        </div>
      </div>
    </article>
  );
}

export default MovieCard;
