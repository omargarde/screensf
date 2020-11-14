import React from 'react';
import { Link } from 'react-router-dom';

const Nav = () => (
  <div className="nav">
    <ul className="main-title">
      <li>sf bay film</li>
    </ul>
    <ul className="nav-links">
      <li>
        <Link to="/">showtimes</Link>
      </li>
      <li>
        <Link to="/venues/">venues</Link>
      </li>
      <li>
        <Link to="/about/">about</Link>
      </li>
    </ul>
  </div>
);

export default Nav;
