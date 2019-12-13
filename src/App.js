import React from 'react';
import Navbar from './components/Navbar'
import MainContainer from './containers/MainContainer';

function App() {
  return (
    <div className="main-page-container">
      <Navbar />
      <MainContainer />
    </div>
  );
}

export default App;
