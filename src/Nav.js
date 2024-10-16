// src/Nav.js
import React from 'react';
import { Link } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from './firebase-config';

const Nav = ({ isAuth, setIsAuth }) => {
  const signUserOut = () => {
    signOut(auth).then(() => {
      localStorage.clear();
      setIsAuth(false);
      window.location.pathname = "/login";
    });
  };

  return (
    <nav>
      <Link to="/">Home</Link>

      <form onSubmit={(e) => e.preventDefault()} className="searchForm"> {/* Add search form */}
        <input
          type="text"
          placeholder="Search..."
          className="searchInput" // Add class for styling
        />
        <button type="submit" className="searchButton">Search</button> {/* Optional button */}
      </form>

      {!isAuth ? (
        <Link to="/login">Login</Link>
      ) : (
        <>
          <Link to="/createpost">Create Post</Link>
          <Link to="/profile">Profile</Link>
          <button onClick={signUserOut}>Log Out</button>
        </>
      )}
    </nav>
  );
};

export default Nav;
