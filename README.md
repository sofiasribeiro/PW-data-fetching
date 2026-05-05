# 🎬 Movie Watchlist: Data Fetching with RTK Query

This is the starter for the **Data Fetching with RTK Query** class (Projeto Web, MCTW @UA).
The UI is done. Your job is to build the data layer.

---

## Setup

```
git clone https://github.com/sofiasribeiro/PW-data-fetching.git [][Clone the repo]
cd PW-data-fetching
npm install [][Install dependencies]

# Add your OMDb API key
cp .env.example .env.local
# Then open .env.local and set VITE_OMDB_KEY=your_key_here

# Start the app (Vite dev server + json-server run in parallel)
npm run start
```

Open **http://localhost:5173** | You'll see the app with placeholder data.  
The json-server mock API runs on **http://localhost:3001**.

> **Get a free OMDb key** at http://www.omdbapi.com/apikey.aspx — it's instant.

---

## File map — where you write code

These are the **only four files** you need to touch:

| File | What to do |
|------|-----------|
| `src/services/movieApi.js` | Create the RTK Query API slice with all four endpoints |
| `src/store.js` | Register the API reducer and middleware |
| `src/features/search/SearchPage.jsx` | Replace placeholder data with `useSearchMoviesQuery` + `useAddToWatchlistMutation` |
| `src/features/watchlist/WatchlistPage.jsx` | Replace placeholder data with `useGetWatchlistQuery` + `useRemoveFromWatchlistMutation` |

Each file has `// TODO` comments guiding you through every step.

---

## What you should NOT touch

- `src/components/` — all UI components are done
- `src/styles/` — tokens and global styles
- `src/context/ToastContext.jsx` — toast notification system
- `src/App.jsx`, `src/main.jsx` — router and providers
- Any `*.module.css` files

---

## What you WILL write

### `src/services/movieApi.js`
```js
// Four endpoints:
searchMovies(term)          // query  → GET OMDb ?s=term
getWatchlist()              // query  → GET http://localhost:3001/watchlist
addToWatchlist(movie)       // mutation → POST http://localhost:3001/watchlist
removeFromWatchlist(id)     // mutation → DELETE http://localhost:3001/watchlist/:id
```

### `src/store.js`
Register `movieApi.reducer` and `movieApi.middleware` in `configureStore`.

### `SearchPage.jsx`
```js
const { data, isLoading, isError } = useSearchMoviesQuery(debouncedTerm, { skip: !debouncedTerm });
const [addToWatchlist] = useAddToWatchlistMutation();
```

### `WatchlistPage.jsx`
```js
const { data: watchlist = [] } = useGetWatchlistQuery();
const [removeFromWatchlist] = useRemoveFromWatchlistMutation();
```

---

## Stuck?

No worries, check the fully working solution branch. Run:

```bash
git checkout solution
```

Read the code, understand the pattern, then:

```bash
git checkout main
```

and try again from memory. Don't copy-paste, the goal is to internalise the pattern.

---

## OMDb API reference

- Docs: https://www.omdbapi.com/
- Search: `https://www.omdbapi.com/?apikey=KEY&s=TERM`
- Single movie: `https://www.omdbapi.com/?apikey=KEY&i=IMDB_ID`
- The search response has a `Search` array of `{ imdbID, Title, Year, Poster }` objects

---

## Available scripts

| Command | What it does |
|---------|-------------|
| `npm run start` | Runs Vite + json-server concurrently |
| `npm run dev` | Vite dev server only |
| `npm run mock` | json-server only (port 3001) |
| `npm run build` | Production build |
| `npm run lint` | ESLint |
| `npm run format` | Prettier |
