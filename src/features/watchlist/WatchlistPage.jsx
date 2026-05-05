// ============================================================
// WatchlistPage — SOLUTION BRANCH
// ============================================================
// Fully wired with RTK Query.
//
// Key ideas:
//   1. useGetWatchlistQuery — fetches /watchlist from json-server
//   2. useRemoveFromWatchlistMutation — deletes one item by id
//   3. Tag invalidation: after removeFromWatchlist succeeds,
//      RTK Query automatically re-fetches getWatchlist because
//      removeFromWatchlist invalidates the 'Watchlist' tag.
// ============================================================

import {
  useGetWatchlistQuery,
  useRemoveFromWatchlistMutation,
} from '../../services/movieApi';
import MovieCard from '../../components/MovieCard/MovieCard';
import MovieGrid from '../../components/MovieGrid/MovieGrid';
import SkeletonCard from '../../components/SkeletonCard/SkeletonCard';
import EmptyState from '../../components/EmptyState/EmptyState';
import { useToast } from '../../context/useToast';
import styles from './WatchlistPage.module.css';

function WatchlistPage() {
  const { addToast } = useToast();

  // ── Watchlist query ───────────────────────────────────────
  // Default to [] so we never get undefined in the template below.
  const { data: watchlist = [], isLoading } = useGetWatchlistQuery();

  // ── Remove mutation ───────────────────────────────────────
  const [removeFromWatchlist] = useRemoveFromWatchlistMutation();

  // ── Handler ───────────────────────────────────────────────
  async function handleRemove(id) {
    const movie = watchlist.find((m) => m.id === id);
    try {
      await removeFromWatchlist(id).unwrap();
      if (movie) addToast(`"${movie.title}" removed from watchlist`, 'remove');
    } catch {
      addToast('Could not remove film. Is json-server running?', 'remove');
    }
  }

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <h1 className={styles.heading}>My Watchlist</h1>
        {watchlist.length > 0 && (
          <span className={styles.count} aria-label={`${watchlist.length} films`}>
            {watchlist.length} {watchlist.length === 1 ? 'film' : 'films'}
          </span>
        )}
      </div>

      {/* Loading state */}
      {isLoading && (
        <MovieGrid label="Loading watchlist">
          {Array.from({ length: 4 }, (_, i) => (
            <SkeletonCard key={i} />
          ))}
        </MovieGrid>
      )}

      {/* Empty state */}
      {!isLoading && watchlist.length === 0 && (
        <EmptyState
          icon="🔖"
          title="Your watchlist is empty"
          message="Search for a film and hit '+ Add to Watchlist' to save it here."
        />
      )}

      {/* Watchlist grid */}
      {!isLoading && watchlist.length > 0 && (
        <MovieGrid label="Your watchlist">
          {watchlist.map((movie) => (
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
