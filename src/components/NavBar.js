
import React, { useState } from 'react';
import './NavbarStyle.css';

const NavBar = ({ onFilterChange }) => {
  const [showMenu, setShowMenu] = useState(false);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  const handleFilterClick = (filter) => {
    onFilterChange(filter);
  };

  return (
    <nav className="navbar">
      <div className="logo">
        <img src="logo2.png" alt="Logo" />
      </div>
      <ul className={`nav-links ${showMenu ? 'show' : ''}`}>
        <li>
          <a href="#todos" onClick={() => handleFilterClick('all')}>Todos</a>
        </li>
        <li>
          <a href="#pending" onClick={() => handleFilterClick('pending')}>Pending</a>
        </li>
        <li>
          <a href="#complete" onClick={() => handleFilterClick('completed')}>Completed</a>
        </li>
      </ul>
      <div className={`menu-icon ${showMenu ? 'hide' : ''}`} onClick={toggleMenu}>
        <i className="fas fa-bars"></i>
      </div>
      <div className={`close-icon ${showMenu ? '' : 'hide'}`} onClick={toggleMenu}>
        <i className="fas fa-times"></i>
      </div>
    </nav>
  );
};

export default NavBar;