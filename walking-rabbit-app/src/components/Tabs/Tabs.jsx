import React from 'react';
import './Tabs.css';

const Tabs = () => {
  return (
    <nav className="Tabs">
      <div className="container">
        <div className="Tabs__logo">Walking Rabbit</div>
        <ul className="Tabs__nav">
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

export default Tabs;
