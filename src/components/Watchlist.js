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
                <button
                  className="watchlist-stock-button"
                  onClick={() => onStockSelect(ticker)}
                  title={`View ${ticker}`}
                >
                  {ticker}
                </button>
                <button
                  className="remove-btn"
                  onClick={() => toggleWatch(ticker)}
                  title="Remove from Watchlist"
                  aria-label={`Remove ${ticker}`}
                >
                  ✕
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
};

export default Watchlist;
