import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom'; 
import './Navbar.css'; 
import text from '../../images/textlogo.png'; 

function Navbar() {
  const [user, setUser] = useState(null);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const profileMenuRef = useRef(null); // Ref to profile menu div
  const navbarRef = useRef(null); // Ref to the entire navbar to handle clicks outside of it

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      fetchUserProfile(token);
    }

    // Close profile menu when clicking outside of the profile menu or navbar
    const handleClickOutside = (e) => {
      if (profileMenuRef.current && !profileMenuRef.current.contains(e.target) && !navbarRef.current.contains(e.target)) {
        setShowProfileMenu(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const fetchUserProfile = async (token) => {
    try {
      const response = await fetch('http://localhost:5000/api/profile', {
        method: 'GET',
        headers: { 'Authorization': `Bearer ${token}` }
      });

      const data = await response.json();
      if (response.ok) {
        setUser(data);
      } else {
        console.log('Error fetching user profile:', data.message);
      }
    } catch (error) {
      console.log('Error:', error);
    }
  };

  const handleLogout = () => {
    // Remove the token from local storage and reset user state
    localStorage.removeItem('token');
    setUser(null);
    setShowProfileMenu(false);
  };

  const toggleProfileMenu = () => {
    setShowProfileMenu(!showProfileMenu);
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-custom" ref={navbarRef}>
        <div className="container-fluid">
          <img src={text} className="img-fluid logoimg" alt="Chillax" />
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <li className="nav-item me-4">
                <Link className="nav-link text-white" to="/">Home</Link>
              </li>
              <li className="nav-item me-4">
                <Link className="nav-link text-white" to="/about">About</Link>
              </li>
              <li className="nav-item me-4">
                <Link className="nav-link text-white" to="/">Movies</Link>
              </li>
              <li className="nav-item me-4">
                <Link className="nav-link text-white" to="/">TV Shows</Link>
              </li>

              {!user ? (
                <>
                  <li className="nav-item me-4">
                    <Link className="nav-link text-white" to="/login">Login</Link>
                  </li>
                  <li className="nav-item me-4">
                    <Link className="nav-link text-white" to="/register">Register</Link>
                  </li>
                </>
              ) : (
                <li className="nav-item me-4">
                  <div className="nav-link text-white" onClick={toggleProfileMenu}>
                    {user.username}
                  </div>
                  {showProfileMenu && (
                    <div className="profile-menu" ref={profileMenuRef}>
                      <p><strong>Username:</strong> {user.username}</p>
                      <p><strong>Email:</strong> {user.email}</p>
                      <button onClick={handleLogout} className="btn btn-danger">Logout</button>
                    </div>
                  )}
                </li>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
