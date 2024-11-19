import React from 'react';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import ChartContainer from './components/ChartContainer/ChartContainer';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <div className="App">
      <Header />
      <ChartContainer />
      <Footer />
    </div>
  );
}

export default App;