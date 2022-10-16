import React from 'react';
import './Navbar.css';

const Navbar = () => {
  return (
    <nav className="Navbar">
      <div className="container">
        <div className="Navbar__logo">Walking Rabbit</div>
        <ul className="Navbar__nav">
          <li>
            <a href="/">Home</a>
          </li>
          <li>
            <a href="/">Contact</a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
