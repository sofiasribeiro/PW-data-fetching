// ============================================================
// SearchPage — SOLUTION BRANCH
// ============================================================
// This page is fully wired with RTK Query.
//
// Key ideas demonstrated:
//   1. useSearchMoviesQuery with `skip` option
//      → avoids sending a request when the search box is empty
//   2. Debouncing the term before passing it to the query
//      → avoids hitting OMDb on every keystroke
//   3. useAddToWatchlistMutation
//      → isLoading state per-mutation invocation
//   4. useGetWatchlistQuery
//      → used *only* to mark cards already in the watchlist
//        (the list itself is shown on /watchlist)
// ============================================================

import { useState, useEffect } from 'react';
import {
  useSearchMoviesQuery,
  useAddToWatchlistMutation,
  useGetWatchlistQuery,
} from '../../services/movieApi';
import MovieCard from '../../components/MovieCard/MovieCard';
import MovieGrid from '../../components/MovieGrid/MovieGrid';
import SkeletonCard from '../../components/SkeletonCard/SkeletonCard';
import EmptyState from '../../components/EmptyState/EmptyState';
import { useToast } from '../../context/useToast';
import styles from './SearchPage.module.css';

function SearchPage() {
  const [term, setTerm] = useState('');
  // Debounced value — only changes 500 ms after the user stops typing.
  const [debouncedTerm, setDebouncedTerm] = useState('');
  const { addToast } = useToast();

  // ── Debounce ────────────────────────────────────────────
  useEffect(() => {
    const timer = setTimeout(() => setDebouncedTerm(term.trim()), 500);
    return () => clearTimeout(timer); // cancel if term changes before 500 ms
  }, [term]);

  // ── Search query ─────────────────────────────────────────
  // `skip: !debouncedTerm` means: don't fire a request when the
  // input is empty. This keeps the empty-state clean on first load.
  const {
    data: movies = [],
    isLoading,
    isError,
    isFetching,
  } = useSearchMoviesQuery(debouncedTerm, {
    skip: !debouncedTerm,
  });

  // ── Add mutation ─────────────────────────────────────────
  // addToWatchlist is a function we call; isAdding is its loading flag.
  const [addToWatchlist] = useAddToWatchlistMutation();

  // ── Watchlist query (for badge) ───────────────────────────
  // We fetch the watchlist here too, just to know which search
  // results are already saved (so we can show the "Added" badge).
  const { data: watchlist = [] } = useGetWatchlistQuery();
  const watchlistIds = new Set(watchlist.map((m) => m.id));

  // ── Handlers ─────────────────────────────────────────────
  async function handleAdd(movie) {
    // Check for duplicate before posting
    if (watchlistIds.has(movie.id)) return;
    try {
      // .unwrap() re-throws any error so we can catch it below.
      await addToWatchlist(movie).unwrap();
      addToast(`"${movie.title}" added to watchlist`, 'add');
    } catch {
      addToast('Could not add film. Is json-server running?', 'remove');
    }
  }

  const showLoading = isLoading || (isFetching && movies.length === 0);

  return (
    <div className={styles.page}>
      {/* Search input */}
      <div className={styles.searchBar}>
        <label htmlFor="search-input" className={styles.srOnly}>
          Search movies
        </label>
        <div className={styles.inputWrapper}>
          <svg
            className={styles.searchIcon}
            viewBox="0 0 24 24"
            fill="none"
            aria-hidden="true"
          >
            <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="1.75" />
            <path
              d="M16.5 16.5L21 21"
              stroke="currentColor"
              strokeWidth="1.75"
              strokeLinecap="round"
            />
          </svg>
          <input
            id="search-input"
            type="search"
            className={styles.input}
            placeholder="Search any movie…"
            value={term}
            onChange={(e) => setTerm(e.target.value)}
            autoFocus
            autoComplete="off"
            aria-label="Search for a movie"
          />
          {term && (
            <button
              className={styles.clearBtn}
              onClick={() => setTerm('')}
              aria-label="Clear search"
            >
              ×
            </button>
          )}
        </div>
      </div>

      {/* Loading skeletons */}
      {showLoading && (
        <MovieGrid label="Loading results">
          {Array.from({ length: 8 }, (_, i) => (
            <SkeletonCard key={i} />
          ))}
        </MovieGrid>
      )}

      {/* Error state */}
      {isError && !showLoading && (
        <EmptyState
          icon="⚠️"
          title="Couldn't reach OMDb"
          message="Check your API key in .env.local and make sure you're connected to the internet. Then try again."
        />
      )}

      {/* Prompt / empty state */}
      {!showLoading && !isError && movies.length === 0 && (
        <EmptyState
          icon="🎬"
          title="Search for a film to start"
          message="Type a title above and results will appear here."
        />
      )}

      {/* Results */}
      {!showLoading && !isError && movies.length > 0 && (
        <MovieGrid label="Search results">
          {movies.map((movie) => (
            <MovieCard
              key={movie.id}
              movie={movie}
              onAdd={handleAdd}
              inWatchlist={watchlistIds.has(movie.id)}
            />
          ))}
        </MovieGrid>
      )}
    </div>
  );
}

export default SearchPage;
