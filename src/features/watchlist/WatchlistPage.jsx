// ============================================================
// WatchlistPage — starter branch (placeholder data)
// ============================================================
//
// TODO: replace placeholder data with real RTK Query hooks:
//
//   import {
//     useGetWatchlistQuery,
//     useRemoveFromWatchlistMutation,
//   } from '../../services/movieApi';
//
//   const { data: watchlist = [], isLoading } = useGetWatchlistQuery();
//   const [removeFromWatchlist, { isLoading: isRemoving }] =
//     useRemoveFromWatchlistMutation();
//
//   Then wire:
//   - movies  ← watchlist
//   - isLoading from the hook
//   - onRemove → calls removeFromWatchlist(id) then addToast(...)
// ============================================================

import MovieCard from '../../components/MovieCard/MovieCard';
import MovieGrid from '../../components/MovieGrid/MovieGrid';
import EmptyState from '../../components/EmptyState/EmptyState';
import { useToast } from '../../context/useToast';
import { PLACEHOLDER_WATCHLIST } from '../../data/placeholders';
import styles from './WatchlistPage.module.css';

function WatchlistPage() {
  const { addToast } = useToast();

  // ── PLACEHOLDER DATA (remove when you implement RTK Query) ──
  // The real hook will be: useGetWatchlistQuery()
  const isLoading = false;
  const movies = PLACEHOLDER_WATCHLIST;
  // ────────────────────────────────────────────────────────────

  // TODO: replace this handler with useRemoveFromWatchlistMutation()
  function handleRemove(id) {
    // Real implementation: await removeFromWatchlist(id).unwrap()
    const movie = movies.find((m) => m.id === id);
    if (movie) addToast(`"${movie.title}" removed from watchlist`, 'remove');
  }

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <h1 className={styles.heading}>My Watchlist</h1>
        {movies.length > 0 && (
          <span className={styles.count} aria-label={`${movies.length} films`}>
            {movies.length} {movies.length === 1 ? 'film' : 'films'}
          </span>
        )}
      </div>

      {/* Loading state */}
      {isLoading && (
        <p className={styles.loading} aria-live="polite">
          Loading watchlist…
        </p>
      )}

      {/* Empty state */}
      {!isLoading && movies.length === 0 && (
        <EmptyState
          icon="🔖"
          title="Your watchlist is empty"
          message="Search for a film and hit '+ Add to Watchlist' to save it here."
        />
      )}

      {/* Watchlist grid */}
      {!isLoading && movies.length > 0 && (
        <MovieGrid label="Your watchlist">
          {movies.map((movie) => (
            <MovieCard
              key={movie.id}
              movie={movie}
              onRemove={handleRemove}
            />
          ))}
        </MovieGrid>
      )}
    </div>
  );
}

export default WatchlistPage;
