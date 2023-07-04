import React, { createElement } from 'react';
import './App.css';
import { Container, AppBar, Toolbar, Typography } from '@mui/material';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

import Offers from './pages/Offers';
import AddOffers from './pages/AddOffers';
import EditOffers from './pages/EditOffers';

import CarRentals from './pages/CarRentals';
import Cars from './pages/Cars';
import AddCar from './pages/AddCar';
import EditCar from './pages/EditCar';

import Events from './pages/Events';
import AddEvent from './pages/AddEvent';
import EditEvent from './pages/EditEvent';

import NavBar from './NavBar';
import Footer from './Footer';

// run npm install react-image-slider --force , to install onto your laptop tq
import ImageSlider from "./ImageSlider";

import Pricing from './pages/Pricing';
import Card from './pages/Card';
import EditCard from './pages/edit_card';
import Display from './pages/display_card';


function App() {
  const slides = [
    {
      url: "https://picsum.photos/200/300"
    },
    {
      url: "https://picsum.photos/400/600"
    },
    {
      url: "https://picsum.photos/300/500"
    },
  ];
  const containerStyles = {
    width: "100%",
    height: "500px",
    margin: "0 auto",
  };
  return (
    <Router>
      <NavBar />
      <div style={containerStyles}>
        <ImageSlider slides={slides} />
      </div>
      <Container>
        <Routes>
          <Route path={"/"} />
          <Route path={"/offers"} element={<Offers />} />
          <Route path={"/addOffers"} element={<AddOffers />} />
          <Route path={"/editOffers/:id"} element={<EditOffers />} />

          <Route path={"/"} element={<CarRentals />} />
          <Route path={"/carrentals"} element={<CarRentals />} />

          <Route path={"/"} element={<Cars />} />
          <Route path={"/cars"} element={<Cars />} />
          <Route path={"/addcar"} element={<AddCar />} />
          <Route path={"/editcar/:id"} element={<EditCar />} />

          <Route path={"/"} element={<Events />} />
          <Route path={"/events"} element={<Events />} />
          <Route path={"/addevent"} element={<AddEvent />} />
          <Route path={"/editevent/:id"} element={<EditEvent />} />
          <Route path="/" element={<ImageSlider />} />
        </Routes>
      </Container>
      <Footer/>
    </Router>

  );
}
export default App;
