import { NavLink } from 'react-router-dom';
import styles from './Navbar.module.css';

function Navbar() {
  return (
    <header className={styles.header} role="banner">
      <nav className={styles.nav} aria-label="Main navigation">
        <div className={styles.logo} aria-label="Movie Watchlist home">
          {/* Simple clapperboard SVG logo */}
          <svg
            className={styles.logoIcon}
            viewBox="0 0 24 24"
            fill="none"
            aria-hidden="true"
            focusable="false"
          >
            <rect x="2" y="7" width="20" height="14" rx="2" fill="currentColor" opacity="0.15" />
            <rect x="2" y="7" width="20" height="14" rx="2" stroke="currentColor" strokeWidth="1.5" />
            <path d="M2 11h20" stroke="currentColor" strokeWidth="1.5" />
            <path d="M7 7V3M12 7V3M17 7V3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            <path d="M4 7L7 3M9 7L12 3M14 7L17 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
          <span className={styles.logoText}>Watchlist</span>
        </div>

        <div className={styles.tabs} role="tablist">
          <NavLink
            to="/search"
            className={({ isActive }) =>
              `${styles.tab} ${isActive ? styles.tabActive : ''}`
            }
            role="tab"
            aria-label="Search movies"
          >
            <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" focusable="false">
              <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="1.75" />
              <path d="M16.5 16.5L21 21" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
            </svg>
            Search
          </NavLink>

          <NavLink
            to="/watchlist"
            className={({ isActive }) =>
              `${styles.tab} ${isActive ? styles.tabActive : ''}`
            }
            role="tab"
            aria-label="View watchlist"
          >
            <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" focusable="false">
              <path
                d="M5 3h14a1 1 0 011 1v17l-7-3-7 3V4a1 1 0 011-1z"
                stroke="currentColor"
                strokeWidth="1.75"
                strokeLinejoin="round"
              />
            </svg>
            Watchlist
          </NavLink>
        </div>
      </nav>
    </header>
  );
}

export default Navbar;
