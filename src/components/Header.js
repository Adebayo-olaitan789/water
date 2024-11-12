import React, { useState, useEffect } from 'react';
import './Header.css'; // Assuming external CSS
import logo from './logo.jpg';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Track if user is logged in
  const [username, setUsername] = useState(''); // Store username
  const [showLogout, setShowLogout] = useState(false); // Track if logout popup should be shown
  const navigate = useNavigate(); // Initialize useNavigate

  useEffect(() => {
    // Check if the user is logged in by looking for an OAuth2 token in local storage
    const token = localStorage.getItem('oauth_token');
    const user = localStorage.getItem('username');
    if (token) {
      setIsLoggedIn(true);
      setUsername(user || '');
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const handleLogout = () => {
    // Clear OAuth2 token and username from localStorage
    localStorage.removeItem('oauth_token');
    localStorage.removeItem('username');
    setIsLoggedIn(false); // Set the user as logged out
    setUsername('');
    setShowLogout(false);
    navigate('/'); // Redirect to home page after logout
  };

  const handleUsernameClick = () => {
    setShowLogout(!showLogout);
  };

  const handleDashboardClick = () => {
    setShowLogout(false); // Close the popup
    navigate('/dashboard'); // Navigate to the dashboard
  };

  return (
    <header className="header">
      <div className="logo-section">
        <img src={logo} alt="Logo" className="logo" /> {/* Replace with your logo */}
        <h1 className="site-title">Atmospheric Water Generator</h1>
      </div>
      <nav className={`nav-links ${menuOpen ? 'mobile-menu-open' : ''}`}>
        <a href="/" className="nav-item">Home</a>
        {isLoggedIn ? (
          <div className="username-container">
            <div className="username" onClick={handleUsernameClick}>
              {username}
            </div>
            {showLogout && (
              <div className="logout-popup show">
                <button className="logout-button" onClick={handleLogout}>Logout</button>
                <button className="logout-button" onClick={handleDashboardClick}>Dashboard</button>
              </div>
            )}
          </div>
        ) : (
          <a href="/login" className="nav-item">Login</a>
        )}
        <a href="/about" className="nav-item">About Us</a>
        <a href="/contact" className="nav-item">Contact Us</a>
        <a href="/products" className="nav-item">Products</a>
      </nav>
      <div className="hamburger" onClick={toggleMenu}>
        <div className={`bar ${menuOpen ? 'open' : ''}`}></div>
        <div className={`bar ${menuOpen ? 'open' : ''}`}></div>
        <div className={`bar ${menuOpen ? 'open' : ''}`}></div>
      </div>
    </header>
  );
};

export default Header;
