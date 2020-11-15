import React from 'react';
import { Link } from 'react-router-dom';

const Nav = () => (
  <div className="nav">
    <ul className="main-title">
      <li>
        <Link to="/">sf bay film</Link>
      </li>
    </ul>
    <ul className="nav-links">
      <li>
        <Link to="/about/">about</Link>
      </li>
      <li>
        <Link to="/">showtimes</Link>
      </li>
      <li>
        <Link to="/venues/">venues</Link>
      </li>
    </ul>
  </div>
);

export default Nav;
