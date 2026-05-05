// ============================================================
// src/services/movieApi.js
// ============================================================
// This is the file YOU will implement in the RTK Query class.
//
// Your task: build a single RTK Query API slice that talks to
// two different backends:
//   1. OMDb API (https://www.omdbapi.com/)   — search movies
//   2. json-server on http://localhost:3001  — manage watchlist
//
// ── ENDPOINTS TO IMPLEMENT ────────────────────────────────
//
//   searchMovies(term)           → query  → GET OMDb ?s=term
//   getWatchlist()               → query  → GET /watchlist
//   addToWatchlist(movie)        → mutation → POST /watchlist
//   removeFromWatchlist(id)      → mutation → DELETE /watchlist/:id
//
// ── CACHE TAGS ────────────────────────────────────────────
//   tagTypes: ['Watchlist']
//   getWatchlist    → providesTags: ['Watchlist']
//   addToWatchlist  → invalidatesTags: ['Watchlist']
//   removeFromWatchlist → invalidatesTags: ['Watchlist']
//
// ── HINTS ─────────────────────────────────────────────────
//   • import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
//   • You need TWO base URLs. The cleanest approach is a
//     single createApi with a custom baseQuery that picks the
//     right URL based on the endpoint name (or arg).
//     Alternatively, create two separate slices — one per API.
//   • OMDb key lives in import.meta.env.VITE_OMDB_KEY
//   • OMDb search: ?apikey=KEY&s=TERM  → response.Search is the array
//   • json-server base URL: http://localhost:3001
//
// ── EXAMPLE SHAPE ─────────────────────────────────────────
//   export const movieApi = createApi({
//     reducerPath: 'movieApi',
//     baseQuery: ...,            // TODO
//     tagTypes: ['Watchlist'],
//     endpoints: (builder) => ({
//       searchMovies: builder.query({ ... }),       // TODO
//       getWatchlist: builder.query({ ... }),       // TODO
//       addToWatchlist: builder.mutation({ ... }),  // TODO
//       removeFromWatchlist: builder.mutation({ ...}), // TODO
//     }),
//   });
//
//   export const {
//     useSearchMoviesQuery,
//     useGetWatchlistQuery,
//     useAddToWatchlistMutation,
//     useRemoveFromWatchlistMutation,
//   } = movieApi;
// ============================================================

// TODO: implement movieApi here
