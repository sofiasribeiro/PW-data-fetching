// ============================================================
// src/services/movieApi.js  —  SOLUTION BRANCH
// ============================================================
// A single RTK Query API slice that talks to TWO different
// backends using a custom baseQuery that routes requests:
//   • Endpoint names starting with "watchlist" → json-server
//   • Everything else → OMDb API
//
// Why a custom baseQuery instead of two separate slices?
// ─────────────────────────────────────────────────────────
// RTK Query lets you use one slice for multiple base URLs by
// wrapping fetchBaseQuery yourself. The slice stays coherent:
// one set of tag types, one reducer path, one middleware entry.
// ============================================================

import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// ── Base queries for each backend ──────────────────────────
const omdbBaseQuery = fetchBaseQuery({
  baseUrl: 'https://www.omdbapi.com/',
});

const jsonServerBaseQuery = fetchBaseQuery({
  baseUrl: 'http://localhost:3001/',
});

// ── Custom routing baseQuery ────────────────────────────────
// RTK Query calls this for every request. We decide which
// real base query to delegate to based on the endpoint name.
async function rootBaseQuery(args, api, extraOptions) {
  const endpointName = api.endpoint; // e.g. 'searchMovies', 'getWatchlist'

  if (
    endpointName === 'getWatchlist' ||
    endpointName === 'addToWatchlist' ||
    endpointName === 'removeFromWatchlist'
  ) {
    // Route to json-server
    return jsonServerBaseQuery(args, api, extraOptions);
  }

  // Default: route to OMDb
  return omdbBaseQuery(args, api, extraOptions);
}

// ── API slice ───────────────────────────────────────────────
export const movieApi = createApi({
  reducerPath: 'movieApi',
  baseQuery: rootBaseQuery,

  // Cache tags let RTK Query automatically re-fetch the watchlist
  // whenever addToWatchlist or removeFromWatchlist succeeds.
  tagTypes: ['Watchlist'],

  endpoints: (builder) => ({
    // ── searchMovies ────────────────────────────────────────
    // GET https://www.omdbapi.com/?apikey=KEY&s=TERM
    // OMDb returns { Search: [...], totalResults, Response }
    searchMovies: builder.query({
      query: (term) => ({
        url: '',
        params: {
          apikey: import.meta.env.VITE_OMDB_KEY,
          s: term,
        },
      }),
      // Transform OMDb's response shape into a clean array.
      // OMDb uses capital keys (imdbID, Title, Year, Poster) — we
      // normalise them to lowercase so the rest of the app is consistent.
      transformResponse: (response) => {
        if (response.Response === 'False') return [];
        return (response.Search || []).map((m) => ({
          id: m.imdbID,
          title: m.Title,
          year: m.Year,
          poster: m.Poster,
        }));
      },
    }),

    // ── getWatchlist ────────────────────────────────────────
    // GET http://localhost:3001/watchlist
    getWatchlist: builder.query({
      query: () => 'watchlist',
      // This endpoint "provides" the Watchlist tag.
      // When the tag is invalidated (by add/remove), RTK Query
      // automatically re-fetches this query in the background.
      providesTags: ['Watchlist'],
    }),

    // ── addToWatchlist ──────────────────────────────────────
    // POST http://localhost:3001/watchlist  { body: movie }
    addToWatchlist: builder.mutation({
      query: (movie) => ({
        url: 'watchlist',
        method: 'POST',
        body: movie,
      }),
      // Invalidating 'Watchlist' causes getWatchlist to re-fetch,
      // so the watchlist page updates automatically after adding.
      invalidatesTags: ['Watchlist'],
    }),

    // ── removeFromWatchlist ─────────────────────────────────
    // DELETE http://localhost:3001/watchlist/:id
    removeFromWatchlist: builder.mutation({
      query: (id) => ({
        url: `watchlist/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Watchlist'],
    }),
  }),
});

// Export the auto-generated hooks — one per endpoint.
// The naming convention: use{EndpointName}Query / use{EndpointName}Mutation
export const {
  useSearchMoviesQuery,
  useGetWatchlistQuery,
  useAddToWatchlistMutation,
  useRemoveFromWatchlistMutation,
} = movieApi;
