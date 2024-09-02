import React from 'react';
import { Link } from 'react-router-dom'; 
import './Navbar.css'; 
import text from '../../images/textlogo.png'; 

function Navbar() {
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-custom">
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
                <Link className="nav-link text-white" to="/">TV shows</Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
