// ============================================================
// src/store.js  —  SOLUTION BRANCH
// ============================================================
// Configure the Redux store with RTK Query middleware.
//
// Why do we need the middleware?
// ─────────────────────────────
// RTK Query uses the middleware to:
//   1. Handle cache lifecycle (invalidation, refetching)
//   2. Manage in-flight request deduplication
//   3. Clean up cached data after its lifetime expires
//
// Without it, queries and mutations still work but caching,
// tag invalidation, and automatic re-fetches do NOT.
// ============================================================

import { configureStore } from '@reduxjs/toolkit';
import { movieApi } from './services/movieApi';

export const store = configureStore({
  reducer: {
    // Register the API slice's reducer under its own key.
    // movieApi.reducerPath is just the string 'movieApi' — using the
    // computed property makes it resilient if you ever rename it.
    [movieApi.reducerPath]: movieApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    // Spread RTK's default middleware (thunk, serializability checks)
    // then append RTK Query's middleware which manages the cache.
    getDefaultMiddleware().concat(movieApi.middleware),
});
