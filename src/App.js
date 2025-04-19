import React, { useState, useEffect } from 'react';
import './App.css';
import TopGainers from './components/TopGainers';
import TopLosers from './components/TopLosers';
import TrendsChart from './components/TrendsChart';
import Advice from './components/Advice';
import Watchlist from './components/Watchlist';

function App() {
  const [selectedStock, setSelectedStock] = useState('AAPL'); // Default to AAPL
  const [searchInput, setSearchInput] = useState('');
  const [watchlist, setWatchlist] = useState([]);

  // Load watchlist from localStorage on mount
  useEffect(() => {
    const storedWatchlist = localStorage.getItem('watchlist');
    if (storedWatchlist) {
      setWatchlist(JSON.parse(storedWatchlist));
    }
  }, []);

  // Save watchlist to localStorage when it changes
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
      prev.includes(ticker)
        ? prev.filter((t) => t !== ticker)
        : [...prev, ticker]
    );
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Stock Market Dashboard</h1>
        <form className="search-bar" onSubmit={handleSearch}>
          <input
            type="text"
            value={searchInput}
            placeholder="Search stock (e.g., TSLA)"
            onChange={(e) => setSearchInput(e.target.value)}
          />
          <button type="submit">Search</button>
        </form>
      </header>

     <main className="page-layout">
  <div className="sidebar">
    <TopGainers onStockSelect={setSelectedStock} watchlist={watchlist} toggleWatch={toggleWatch} />
    <TopLosers onStockSelect={setSelectedStock} watchlist={watchlist} toggleWatch={toggleWatch} />
  </div>

  <div className="content">
    <TrendsChart selectedStock={selectedStock} />
    <Advice />
    <Watchlist
      stocks={watchlist}
      onStockSelect={setSelectedStock}
      toggleWatch={toggleWatch}
    />
  </div>
</main>
    </div>
  );
}

export default App;
