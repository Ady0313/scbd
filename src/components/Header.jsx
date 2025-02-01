import React from 'react';
import { Link } from 'react-router-dom';
import logo from './logo.png'; // Import the logo

const Header = () => {
  return (
    <header className="header">
      <div className="logo-container">
        <img src={logo} alt="Logo" className="logo animated-logo" />
      </div>
      <nav className="nav-links">
        <Link to="/" className="nav-link">Home</Link>
        <Link to="/lessons" className="nav-link">Tutor</Link>
      </nav>
    </header>
  );
};

export default Header;
