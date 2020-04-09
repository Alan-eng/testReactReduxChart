import React from 'react';
import ChartF from './features/chart/ChartF'
import ChartTimeRange from './features/controls/ChartTimeRange'
import ChartParameter from './features/controls/ChartParameter'
import './App.css';

function App() {
  return (
    <div className="App">
        <ChartTimeRange />
        <ChartParameter />
        <ChartF />
    </div>
  );
}

export default App;
