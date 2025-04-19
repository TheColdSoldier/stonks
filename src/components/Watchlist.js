import React from 'react';

const Watchlist = ({ stocks, onStockSelect, toggleWatch }) => {
  return (
    <section className="Watchlist">
      <h2>📌 Watchlist</h2>
      {stocks.length === 0 ? (
        <p style={{ opacity: 0.6 }}>No stocks pinned.</p>
      ) : (
        <ul>
          {stocks.map((ticker) => (
            <li key={ticker}>
              <div className="stock-item">
                <div onClick={() => onStockSelect(ticker)}>{ticker}</div>
                <button onClick={() => toggleWatch(ticker)}>✕</button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
};

export default Watchlist;
