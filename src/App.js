import React from 'react';
import './App.css';
import TopGainers from './components/TopGainers';
import TrendsChart from './components/TrendsChart';
import Advice from './components/Advice';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Stock Market Dashboard</h1>
      </header>
      <main>
        <TopGainers />
        <TrendsChart />
        <Advice />
      </main>
    </div>
  );
}

export default App;
