import { Typography } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'
import './App.css';
import logo from './images/EcoRide logo.png'

const NavBar = () => {
  return (
    <div className='NavBar'>
      <div className='logo'>
        <Link to="/"><img src={logo} alt="EcoRide" className="logoImg"></img></Link>
      </div>
      <div className="space"></div>
      <div className='LinkItems'>
        <ul>
          <li><Link to="/offers" ><Typography variant="h6" fontWeight="bold">Offers</Typography></Link></li>
          <li><Link to="/CarRentals" ><Typography variant="h6" fontWeight="bold">Car Rentals</Typography></Link></li>
          <li><Link to="/Cars" ><Typography variant="h6" fontWeight="bold">Cars</Typography></Link></li>
          <li><Link to="/Events" ><Typography variant="h6" fontWeight="bold">Events</Typography></Link></li>
        </ul>
      </div>
      <button className='LoginButton' >
        Login
      </button>
    </div>
  )
}

export default NavBar;
