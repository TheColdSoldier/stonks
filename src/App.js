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
  const dropdownRef = useRef(null);


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
    <div className="App">
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
            <TrendsChart selectedStock={selectedStock} />
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
          <p style={{ marginLeft: '20px' }}>Coming soon: Theme switcher, API key input, etc.</p>
        </main>
      )}
    </div>
  );
}

export default App;
