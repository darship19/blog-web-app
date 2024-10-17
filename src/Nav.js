// src/Nav.js
import React from 'react';
import { Link } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from './firebase-config';
import './Nav.css';

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
      <Link to="/">
      <i className="fas fa-home"></i>{/*Home icon */}

      </Link>

      <form onSubmit={(e) => e.preventDefault()} className="searchForm"> {/* Add search form */}
        <input
          type="text"
          placeholder="Search..."
          className="searchInput" // Add class for styling
        />
        <button type="submit" className="searchButton">Search</button> {/* Optional button */}
      </form>

      {!isAuth ? (
        <Link to="/login">
          <i className='fas fa-sign-in-alt'></i>
        </Link>
      ) : (
        <>
          <Link to="/createpost" className='createPostButton'>
          <i className='fas fa-pen'></i>
            </Link>


          <Link to="/profile">
          <i className='fas fa-user'></i></Link>

          <button onClick={signUserOut}>
            <i className='fas fa-sign-out-alt'></i>
          </button>
        </>
      )}
    </nav>
  );
};

export default Nav;
