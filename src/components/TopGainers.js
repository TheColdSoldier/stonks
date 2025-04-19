import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TopGainers = () => {
  const [gainers, setGainers] = useState([]);
  const API_KEY = process.env.REACT_APP_FMP_API_KEY;

  useEffect(() => {
    const fetchGainers = async () => {
      try {
        // Use to debug the code when needed
//        console.log("API_KEY:", API_KEY)
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
    <div className="sidebar">
    <section className="TopGainers">
      <h2>Top Gainers of the Day</h2>
      <ul>
        {gainers.map((stock) => (
          <li key={stock.ticker}>
            {stock.ticker}: {stock.changesPercentage}
          </li>
        ))}
      </ul>
    </section>
    </div>
  );
};

export default TopGainers;