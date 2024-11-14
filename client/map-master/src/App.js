import React from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import TrafficMap from './components/TrafficMap';
import Notices from './components/Notices';
import Navbar from './components/Navbar';

function App() {
  return (
    <div>
      <Header />
      <Navbar />
      <div style={{ display: 'flex' }}>
        <TrafficMap />
        <Notices />
      </div>
      <Footer />
    </div>
  );
}

export default App;