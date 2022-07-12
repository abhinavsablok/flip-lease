import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import logo from './images/FLIP_logo_rounded.png';
import './App.css';

import { Lease } from './views/Rental/Rental';
import { NotFound } from './views/Rental/NotFound';

function App() {
  return (
    <Router>
      <div>
        <div className="appHeader">
          <img className="logoImage" src={logo} alt="FLIP Logo" />
        </div>

        <div className="App">
        <Routes>
          <Route exact path="/lease/:id" element={<Lease />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
