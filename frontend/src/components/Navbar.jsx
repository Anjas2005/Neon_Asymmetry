import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import './navbar.css';

const Navbar = () => {
  const navigate = useNavigate();
  
  // Check if user is logged in
  const isLoggedIn = !!localStorage.getItem('access_token');

  const handleLogout = () => {
    // Navigate to the logout route where your logic resides
    navigate('/logout'); 
  };

  return (
    <nav className="navbar">
      <div className="nav-container">
        {/* Clicking Logo takes you Home */}
        <div className="nav-logo" onClick={() => navigate('/')}>
          NEO<span>ASM</span>
        </div>

        <div className="nav-links">
          <NavLink to="/home" className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}>
            Home
          </NavLink>
          <NavLink to="/stock" className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}>
            Collection
          </NavLink>
          <NavLink to="/cart" className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}>
            Cart
          </NavLink>

          {!isLoggedIn ? (
            <>
              <NavLink to="/login" className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}>
                Login
              </NavLink>
              <NavLink to="/register" className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}>
                Register
              </NavLink>
            </>
          ) : (
            <button className="logout-btn" onClick={handleLogout}>
              Logout
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
