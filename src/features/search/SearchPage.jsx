// ============================================================
// SearchPage — starter branch (placeholder data)
// ============================================================
//
// TODO: replace placeholder data with real RTK Query hooks:
//
//   import {
//     useSearchMoviesQuery,
//     useAddToWatchlistMutation,
//   } from '../../services/movieApi';
//
//   const [term, setTerm] = useState('');
//   const [debouncedTerm, setDebouncedTerm] = useState('');
//   // debounce term → setDebouncedTerm after 500 ms
//
//   const { data, isLoading, isError } = useSearchMoviesQuery(
//     debouncedTerm,
//     { skip: !debouncedTerm }   // skip the request when input is empty
//   );
//
//   const [addToWatchlist, { isLoading: isAdding }] =
//     useAddToWatchlistMutation();
//
//   Then wire:
//   - movies  ← data (or [] when empty/error)
//   - isLoading, isError from the hook
//   - onAdd → calls addToWatchlist(movie) then addToast(...)
// ============================================================

import { useState } from 'react';
import MovieCard from '../../components/MovieCard/MovieCard';
import MovieGrid from '../../components/MovieGrid/MovieGrid';
import SkeletonCard from '../../components/SkeletonCard/SkeletonCard';
import EmptyState from '../../components/EmptyState/EmptyState';
import { useToast } from '../../context/useToast';
import { PLACEHOLDER_SEARCH_RESULTS } from '../../data/placeholders';
import styles from './SearchPage.module.css';

function SearchPage() {
  const [term, setTerm] = useState('');
  const { addToast } = useToast();

  // ── PLACEHOLDER DATA (remove when you implement RTK Query) ──
  // The real hook will be: useSearchMoviesQuery(debouncedTerm, { skip: !debouncedTerm })
  const isLoading = false;
  const isError = false;
  const movies = term.length === 0 ? [] : PLACEHOLDER_SEARCH_RESULTS;
  // ────────────────────────────────────────────────────────────

  // TODO: replace this handler with useAddToWatchlistMutation()
  function handleAdd(movie) {
    // Real implementation: await addToWatchlist(movie).unwrap()
    addToast(`"${movie.title}" added to watchlist`, 'add');
  }

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

      {/* Loading state */}
      {isLoading && (
        <MovieGrid label="Loading results">
          {Array.from({ length: 8 }, (_, i) => (
            <SkeletonCard key={i} />
          ))}
        </MovieGrid>
      )}

      {/* Error state */}
      {isError && !isLoading && (
        <EmptyState
          icon="⚠️"
          title="Couldn't reach OMDb"
          message="Check your API key in .env.local and make sure you're connected to the internet. Then try again."
        />
      )}

      {/* Empty / prompt state */}
      {!isLoading && !isError && movies.length === 0 && (
        <EmptyState
          icon="🎬"
          title="Search for a film to start"
          message="Type a title above and results will appear here."
        />
      )}

      {/* Results grid */}
      {!isLoading && !isError && movies.length > 0 && (
        <MovieGrid label="Search results">
          {movies.map((movie) => (
            <MovieCard
              key={movie.id}
              movie={movie}
              onAdd={handleAdd}
            />
          ))}
        </MovieGrid>
      )}
    </div>
  );
}

export default SearchPage;
