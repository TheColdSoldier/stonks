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

const TrendsChart = ({ selectedStock }) => {
  const [data, setData] = useState([]);
  const [range, setRange] = useState('1M');
  const API_KEY = process.env.REACT_APP_FMP_API_KEY;

  const getDataPointsForRange = {
    '1D': 1,
    '1W': 5,
    '1M': 22,
    '6M': 132,
    '1Y': 260,
    'MAX': 1000
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
    <section className="TrendsChart">
      <h2>{selectedStock} Stock ({range})</h2>
      <div className="range-selector">
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
        <LineChart data={data}>
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="close" dot={false} stroke="#82ca9d" />
        </LineChart>
      </ResponsiveContainer>
    </section>
  );
};

export default TrendsChart;
