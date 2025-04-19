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

const TrendsChart = () => {
  const [data, setData] = useState([]);
  const API_KEY = process.env.REACT_APP_FMP_API_KEY;

  useEffect(() => {
    const fetchTrend = async () => {
      try {
        const res = await axios.get(
//  Apple Stock for Debugging
 `https://financialmodelingprep.com/api/v3/historical-price-full/AAPL?serietype=line&apikey=${API_KEY}`
//          `https://financialmodelingprep.com/api/v3/historical-price-full/%5EGSPC?serietype=line&apikey=${API_KEY}`
        );
        console.log("Trend API response:", res.data);
        if (res.data && res.data.historical) {
          const hist = res.data.historical.slice(0, 30).reverse();
          setData(hist.map((item) => ({ date: item.date, close: item.close })));
        } else {
          console.warn("No historical data found");
        }
      } catch (error) {
        console.error('Error fetching market trends:', error);
      }
    };
    fetchTrend();
  }, [API_KEY]);

  return (
    <section className="TrendsChart">
      <h2>Apple Stock(Last 30 Days)</h2>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="close" dot={false} />
        </LineChart>
      </ResponsiveContainer>
    </section>
  );
};

export default TrendsChart;