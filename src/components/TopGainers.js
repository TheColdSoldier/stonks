import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TopGainers = ({ onStockSelect, watchlist, toggleWatch }) => {
  const [gainers, setGainers] = useState([]);
  const API_KEY = process.env.REACT_APP_FMP_API_KEY;

  useEffect(() => {
    const fetchGainers = async () => {
      try {
        const res = await axios.get(
          `https://financialmodelingprep.com/api/v3/gainers?apikey=${API_KEY}`
        );
        setGainers(res.data);
      } catch (error) {
        console.error('Error fetching top gainers:', error);
      }
    };
    fetchGainers();
  }, [API_KEY]);

  return (
      <div className="top-gainers">
        <h2>Top Gainers of the Day</h2>
        <ul>
          {gainers.map((stock) => (
            <li key={stock.ticker}>
              <div className="stock-item">
                <div
                  className="stock-ticker"
                  style={{ cursor: 'pointer' }}
                  onClick={() => onStockSelect?.(stock.ticker)}
                >
                  {stock.ticker}
                </div>
                <div>
                  <span className="stock-gain">{stock.changesPercentage}</span>
                  <button
                    onClick={() => toggleWatch?.(stock.ticker)}
                    style={{ marginLeft: '10px', cursor: 'pointer' }}
                  >
                    {watchlist?.includes(stock.ticker) ? '★' : '☆'}
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
  );
};

export default TopGainers;
