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

const TopGainers = ({ onStockSelect, watchlist, toggleWatch, theme }) => {
  const [gainers, setGainers] = useState([]);
  const [hoveredTicker, setHoveredTicker] = useState(null);
  const [hoveredData, setHoveredData] = useState([]);
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
    <div className="top-gainers">
        <h2>Top Gainers of the Day</h2>
        <ul>
          {gainers.map((stock) => (
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
                  <span className="stock-gain">{stock.changesPercentage}</span>
                  <button onClick={() => toggleWatch?.(stock.ticker)}>
                    {watchlist?.includes(stock.ticker) ? '★' : '☆'}
                  </button>
                </div>
              </div>
              {hoveredTicker === stock.ticker && hoveredData.length > 0 && (
                <div className="minigraph">
                  <ResponsiveContainer width="100%" height={60}>
                    <LineChart
                      width={150}
                      height={50}
                      data={hoveredData}
                      style={{
                        backgroundColor: theme === 'dark' ? '#1c1c2b' : '#ffffff',
                        borderRadius: '8px'
                      }}
                    >
                      <XAxis hide dataKey="date" />
                      <YAxis hide />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: theme === 'dark' ? '#2e2e3d' : '#ffffff',
                          color: theme === 'dark' ? '#ffffff' : '#000000',
                          borderRadius: '6px'
                        }}
                        labelStyle={{
                          color: theme === 'dark' ? '#cccccc' : '#000000',
                          fontWeight: 'bold'
                        }}
                        itemStyle={{
                          color: theme === 'dark' ? '#a0f0a0' : '#006400'
                        }}
                      />
                      <Line type="monotone" dataKey="close" stroke={theme === 'dark' ? '#82ca9d' : '#ff6347'} dot={false} />
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

export default TopGainers;
