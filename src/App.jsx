import { Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import SearchPage from './features/search/SearchPage';
import WatchlistPage from './features/watchlist/WatchlistPage';
import ToastContainer from './components/Toast/ToastContainer';
import { ToastProvider } from './context/ToastContext';
import styles from './App.module.css';

function App() {
  return (
    <ToastProvider>
      <div className={styles.app}>
        <Navbar />
        <main className={styles.main}>
          <Routes>
            <Route path="/" element={<Navigate to="/search" replace />} />
            <Route path="/search" element={<SearchPage />} />
            <Route path="/watchlist" element={<WatchlistPage />} />
          </Routes>
        </main>
        <ToastContainer />
      </div>
    </ToastProvider>
  );
}

export default App;
