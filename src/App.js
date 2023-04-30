import React from 'react';
import './App.css';
import Header from './components/Header';
import MintGCoin from './components/MintGCoin';

function App() {
  return (
    <div className="App">
      <Header />
      <div className="container mt-5">
        <MintGCoin />
        {/* Add other tabs or components later, this is just demo?  */}
      </div>
    </div>
  );
}

export default App;
