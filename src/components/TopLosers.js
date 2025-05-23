import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  LineChart,
  Line,
  Tooltip,
  ResponsiveContainer,
  XAxis,
  YAxis
} from 'recharts';

const TopLosers = ({ onStockSelect, watchlist, toggleWatch }) => {
  const [losers, setLosers] = useState([]);
  const [hoveredTicker, setHoveredTicker] = useState(null);
  const [hoveredData, setHoveredData] = useState([]);
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

  const fetchMiniChart = async (ticker) => {
    try {
      const res = await axios.get(
        `https://financialmodelingprep.com/api/v3/historical-price-full/${ticker}?serietype=line&apikey=${API_KEY}`
      );
      const hist = res.data.historical.slice(0, 7).reverse();
      setHoveredData(hist.map((item) => ({ date: item.date, close: item.close })));
    } catch (err) {
      console.error(`Error loading mini-chart for ${ticker}`, err);
    }
  };

  return (
    <div className="top-losers">
        <h2>Top Losers of the Day</h2>
        <ul>
          {losers.map((stock) => (
            <li
              key={stock.ticker}
              onClick={() => onStockSelect?.(stock.ticker)}
              onMouseEnter={() => {
                setHoveredTicker(stock.ticker);
                fetchMiniChart(stock.ticker);
              }}
              onMouseLeave={() => setHoveredTicker(null)}
            >
              <div className="stock-item">
                <div className="stock-ticker" style={{ cursor: 'pointer' }}>{stock.ticker}</div>
                <div>
                  <span className="stock-loss">{stock.changesPercentage}</span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleWatch?.(stock.ticker);
                    }}
                    style={{ marginLeft: '10px', cursor: 'pointer' }}
                  >
                    {watchlist?.includes(stock.ticker) ? '★' : '☆'}
                  </button>
                </div>
              </div>
              {hoveredTicker === stock.ticker && hoveredData.length > 0 && (
                <div className="minigraph">
                  <ResponsiveContainer width="100%" height={60}>
                    <LineChart data={hoveredData}>
                      <XAxis dataKey="date" hide />
                      <YAxis hide domain={['dataMin', 'dataMax']} />
                      <Tooltip />
                      <Line type="monotone" dataKey="close" stroke="#ff5252" dot={false} strokeWidth={2} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              )}
            </li>
          ))}
        </ul>
    </div>
  );
};

export default TopLosers;
