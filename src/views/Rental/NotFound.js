import React from 'react';
import '../../style.css';
import logo from '../../images/FLIP_text.png';

export function NotFound() {
  return (
    <div className="container">
      <div className="topContainer">
        <div>
          <img src={logo} alt="FLIP Logo" />
        </div>
        <h3 className="header">Page Not Found!</h3>
        <p>We could not find the page you were looking for.</p>
      </div>
    </div>
  );
}
