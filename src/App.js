import React, { useState, useEffect } from 'react';
import './App.css';
import TopGainers from './components/TopGainers';
import TrendsChart from './components/TrendsChart';
import Advice from './components/Advice';
import TopLosers from "./components/TopLosers";

function App() {

  const [selectedStock, setSelectedStock] = useState('AAPL'); // default to AAPL
  const [searchInput, setSearchInput] = useState('');
  const handleSearch = (e) => {
    e.preventDefault();
    if (searchInput.trim() !== '') {
      setSelectedStock(searchInput.trim().toUpperCase());
      setSearchInput('');
    }
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
          <TopGainers onStockSelect={setSelectedStock} />
          <TopLosers onStockSelect={setSelectedStock} />
        </div>
        <div className="content">
          <TrendsChart selectedStock={selectedStock} />
          <Advice/>
        </div>
      </main>
    </div>
  );
}

export default App;
