import React from 'react';
import './Footer.css';

function Footer() {
  return (
    <footer className="footer bg-dark text-white py-4">
      <div className="container">
        <div className="row">
          <div className="col-md-4">
            <h5>Chillax</h5>
            <p>Your ultimate destination for relaxation and entertainment.</p>
          </div>
          <div className="col-md-4">
            <h5>Quick Links</h5>
            <ul className="list-unstyled">
              <li><a href="/" className="text-white">Home</a></li>
              <li><a href="/about" className="text-white">About</a></li>
              <li><a href="/" className="text-white">Movies</a></li>
              <li><a href="/" className="text-white">TV Shows</a></li>
            </ul>
          </div>
          <div className="col-md-4">
            <h5>Contact Us</h5>
            <p className="sendmail"><a href="mailto:bharathdoli7@gmail.com">Email: bharathdoli7@gmail.com</a></p>
            <p>Phone: +91 7993940534</p>
          </div>
        </div>
        <div className="row mt-3">
          <div className="col text-center">
            <p>&copy; 2024 Chillax. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
