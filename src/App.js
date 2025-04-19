import React, { useState, useEffect, useRef } from 'react';
import './App.css';
import TopGainers from './components/TopGainers';
import TopLosers from './components/TopLosers';
import TrendsChart from './components/TrendsChart';
import Advice from './components/Advice';
import Watchlist from './components/Watchlist';

function App() {
  const [selectedStock, setSelectedStock] = useState('AAPL');
  const [searchInput, setSearchInput] = useState('');
  const [watchlist, setWatchlist] = useState([]);
  const [currentPage, setCurrentPage] = useState('Dashboard');
  const [showDropdown, setShowDropdown] = useState(false);
  const [theme, setTheme] = useState('dark');
  const dropdownRef = useRef(null);

  useEffect(() => {
    const storedTheme = localStorage.getItem('theme') || 'dark';
    setTheme(storedTheme);
  }, []);

  useEffect(() => {
    localStorage.setItem('theme', theme);
  }, [theme]);

  useEffect(() => {
    const storedWatchlist = localStorage.getItem('watchlist');
    if (storedWatchlist) {
      setWatchlist(JSON.parse(storedWatchlist));
    }
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    localStorage.setItem('watchlist', JSON.stringify(watchlist));
  }, [watchlist]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchInput.trim() !== '') {
      setSelectedStock(searchInput.trim().toUpperCase());
      setSearchInput('');
    }
  };

  const toggleWatch = (ticker) => {
    setWatchlist((prev) =>
      prev.includes(ticker) ? prev.filter((t) => t !== ticker) : [...prev, ticker]
    );
  };

  return (
    <div className={`App ${theme}`}>
      <header className="App-header">
        <div className="dropdown-container" ref={dropdownRef}>
          <div className="dropdown-toggle" onClick={() => setShowDropdown(prev => !prev)}>
            ☰ Menu
          </div>
          {showDropdown && (
            <div className="dropdown-menu">
              <div onClick={() => { setCurrentPage('Dashboard'); setShowDropdown(false); }}>📊 Dashboard</div>
              <div onClick={() => { setCurrentPage('Watchlist'); setShowDropdown(false); }}>📌 Watchlist</div>
              <div onClick={() => { setCurrentPage('Settings'); setShowDropdown(false); }}>⚙️ Settings</div>
            </div>
          )}
        </div>
        <h1>Stock Market Dashboard</h1>

        {currentPage === 'Dashboard' && (
          <form className="search-bar" onSubmit={handleSearch}>
            <input
              type="text"
              value={searchInput}
              placeholder="Search stock (e.g., TSLA)"
              onChange={(e) => setSearchInput(e.target.value)}
            />
            <button type="submit">Search</button>
          </form>
        )}
      </header>

      {/* 🔄 Page Switching Logic */}
      {currentPage === 'Dashboard' && (
        <main className="page-layout">
          <div className="sidebar">
            <TopGainers onStockSelect={setSelectedStock} watchlist={watchlist} toggleWatch={toggleWatch} />
            <TopLosers onStockSelect={setSelectedStock} watchlist={watchlist} toggleWatch={toggleWatch} />
          </div>
          <div className="content">
            <TrendsChart
              selectedStock={selectedStock}
              theme={theme}
              watchlist={watchlist}
              toggleWatch={toggleWatch}
            />
            <Advice />
            <Watchlist stocks={watchlist} onStockSelect={setSelectedStock} toggleWatch={toggleWatch} />
          </div>
        </main>
      )}

      {currentPage === 'Watchlist' && (
        <main className="content">
          <h2 style={{ marginLeft: '20px' }}>📌 My Watchlist</h2>
          <Watchlist stocks={watchlist} onStockSelect={setSelectedStock} toggleWatch={toggleWatch} />
        </main>
      )}

      {currentPage === 'Settings' && (
        <main className="content">
          <h2 style={{ marginLeft: '20px' }}>⚙️ Settings</h2>
          <div style={{ marginLeft: '20px', marginTop: '10px' }}>
            <label htmlFor="theme-toggle">Toggle Theme: </label>
            <select
              id="theme-toggle"
              value={theme}
              onChange={(e) => setTheme(e.target.value)}
            >
              <option value="dark">Dark</option>
              <option value="light">Light</option>
            </select>
          </div>
        </main>
      )}
    </div>
  );
}

export default App;
