// ============================================================
// src/store.js
// ============================================================
// This is the Redux store configuration file.
// Your task: register the movieApi reducer and middleware.
//
// ── HINTS ─────────────────────────────────────────────────
//   • import { configureStore } from '@reduxjs/toolkit'
//   • import { movieApi } from './services/movieApi'
//   • Add movieApi.reducer under the key movieApi.reducerPath
//   • Add movieApi.middleware to the middleware chain using
//     getDefaultMiddleware().concat(movieApi.middleware)
//
// ── EXAMPLE SHAPE ─────────────────────────────────────────
//   export const store = configureStore({
//     reducer: {
//       [movieApi.reducerPath]: movieApi.reducer,  // TODO
//     },
//     middleware: (getDefaultMiddleware) =>
//       getDefaultMiddleware().concat(movieApi.middleware), // TODO
//   });
// ============================================================

import { configureStore } from '@reduxjs/toolkit';

// TODO: import movieApi from './services/movieApi' once you implement it

export const store = configureStore({
  reducer: {
    // TODO: add movieApi.reducer here
    // [movieApi.reducerPath]: movieApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware(),
    // TODO: add movieApi.middleware here
    // .concat(movieApi.middleware),
});
