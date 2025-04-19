// TopGainers.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TopGainers = ({ onStockSelect }) => {
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
          <ul>
            {gainers.slice(0, 5).map((stock) => (
              <li key={stock.ticker} onClick={() => onStockSelect?.(stock.ticker)}>
                <div className="stock-item">
                  <div className="stock-ticker">{stock.ticker}</div>
                  <span className="stock-gain">{stock.changesPercentage}</span>
                </div>
              </li>
            ))}
          </ul>
        ))}
      </ul>
    </div>
  );
};

export default TopGainers;
