import React, { useState } from 'react';
import './App.css';
import logo from './images/EcoRide logo.png';
import { Typography } from '@mui/material';
import { Link } from 'react-router-dom'

const Footer = () => {
  const [isVisible, setVisible] = useState(false);

  const handleClick = () => {
    setVisible(!isVisible);
  };

  return (
    <div className="footer">
      <div className="footer-logo">
        <Link to="/"><img src={logo} alt="EcoRide" className='logoImgFooter'/></Link>
      </div>
      <div className="footer-links">
        <ul>
          <li><Link to="#" ><Typography variant="h6" fontWeight="bold">Terms of Service</Typography></Link></li>
          <li><Link to="#" ><Typography variant="h6" fontWeight="bold">Privacy Policy</Typography></Link></li>
          <li><Link to="#" ><Typography variant="h6" fontWeight="bold">Contact Us</Typography></Link></li>
        </ul>
      </div>
      <button
        className="go-to-top"
        onClick={handleClick}
        disabled={isVisible}
      >
        Go to top
      </button>
    </div>
  );
};

export default Footer;
