import React, { useState, useEffect} from "react";
import axios from 'axios';
//TODO:
const TopLosers = ({ onStockSelect }) => {
  const [losers, setLosers] = useState([]);
  const API_KEY = process.env.REACT_APP_FMP_API_KEY;

  useEffect(() => {
    const fetchLosers = async () => {
      try {
        const res = await axios.get(
          `https://financialmodelingprep.com/api/v3/losers?apikey=${API_KEY}`
        );
        setLosers(res.data);
      } catch (error) {
        console.error("Error fetching Top Losers:", error);
      }
    };
    fetchLosers();
  }, [API_KEY]);

  return (
      <div className="top-losers">
        <h2>Top Losers of the Day</h2>
        <ul>
          {losers.map((stock) => (
            <li
              key={stock.ticker}
              onClick={() => onStockSelect(stock.ticker)}>
              <div className="stock-item">
                <div className="stock-ticker">{stock.ticker}</div>
              <span className="stock-loss">{stock.changesPercentage}</span>
              </div>
          </li>
          ))}
        </ul>
      </div>
  );
};

export default TopLosers;