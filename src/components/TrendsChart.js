import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer
} from 'recharts';

const TrendsChart = ({ selectedStock, theme, watchlist, toggleWatch }) => {
  const [data, setData] = useState([]);
  const [range, setRange] = useState('1M');
  const API_KEY = process.env.REACT_APP_FMP_API_KEY;

  const getDataPointsForRange = {
    '1D': 1,
    '1W': 5,
    '1M': 22,
    '6M': 132,
    '1Y': 260,
    'MAX': 10000
  };

  useEffect(() => {
    const fetchTrend = async () => {
      try {
        const res = await axios.get(
          `https://financialmodelingprep.com/api/v3/historical-price-full/${selectedStock}?serietype=line&apikey=${API_KEY}`
        );
        if (res.data?.historical) {
          const days = getDataPointsForRange[range] || 30;
          const hist = res.data.historical.slice(0, days).reverse();
          setData(hist.map((item) => ({ date: item.date, close: item.close })));
        }
      } catch (error) {
        console.error('Error fetching market trends:', error);
      }
    };
    if (selectedStock) fetchTrend();
  }, [selectedStock, API_KEY, range]);

  return (
    <section
      className="TrendsChart"
      style={{
        backgroundColor: theme === 'dark' ? '#1c1c2b' : '#f5f5f5',
        color: theme === 'dark' ? '#ffffff' : '#000000',
        borderRadius: '12px',
        padding: '20px',
        boxShadow: '0 0 10px rgba(0,0,0,0.25)',
        transition: 'background-color 0.3s ease, color 0.3s ease'
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2 style={{ margin: 0 }}>{selectedStock} Stock ({range})</h2>
        <button
          onClick={() => toggleWatch?.(selectedStock)}
          style={{
            fontSize: '1.5rem',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            color: watchlist?.includes(selectedStock) ? '#ffd700' : '#888'
          }}
          title="Toggle Watchlist"
        >
          {watchlist?.includes(selectedStock) ? '★' : '☆'}
        </button>
      </div>

      <div className="range-selector" style={{ marginTop: '10px' }}>
        {['1D', '1W', '1M', '6M', '1Y', 'MAX'].map((r) => (
          <button
            key={r}
            onClick={() => setRange(r)}
            className={range === r ? 'active' : ''}
          >
            {r}
          </button>
        ))}
      </div>

      <ResponsiveContainer width="100%" height={300}>
        <LineChart
          data={data}
          style={{
            backgroundColor: theme === 'dark' ? '#1c1c2b' : '#ffffff',
            padding: '10px',
            borderRadius: '10px'
          }}
        >
          <XAxis dataKey="date" stroke={theme === 'dark' ? '#e0e0e0' : '#000000'} />
          <YAxis stroke={theme === 'dark' ? '#e0e0e0' : '#000000'} />
          <Tooltip
            contentStyle={{
              backgroundColor: theme === 'dark' ? '#2e2e3d' : '#ffffff',
              border: theme === 'dark' ? '1px solid #444' : '1px solid #ccc',
              borderRadius: '8px'
            }}
            labelStyle={{
              color: theme === 'dark' ? '#cccccc' : '#000000',
              fontWeight: 'bold'
            }}
            itemStyle={{
              color: theme === 'dark' ? '#a0f0a0' : '#006400',
              fontWeight: 500
            }}
          />
          <Line
            type="monotone"
            dataKey="close"
            dot={false}
            stroke={theme === 'dark' ? '#82ca9d' : '#ff6347'}
          />
        </LineChart>
      </ResponsiveContainer>
    </section>
  );
};

export default TrendsChart;
