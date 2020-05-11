import React from 'react';
import { Link } from 'react-router-dom';

const NavBar = () => {
  return (
    <nav className="navbar navbar-dark bg-dark mb-5 text-center">
      <Link to="/" className="mx-auto">
        <span className="navbar-brand mb-0 h1">Lyrics Finder</span>
      </Link>
    </nav>
  );
};

export default NavBar;
