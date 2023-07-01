import './App.css';
import { Container, AppBar, Toolbar, Typography } from '@mui/material';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Offers from './pages/Offers';
import CarRentals from './pages/CarRentals';
import Cars from './pages/Cars';
import AddCar from './pages/AddCar';

function App() {
  return (
    <Router>
      <AppBar position="static" className='AppBar'>
        <Container>
          <Toolbar disableGutters={true}>
            <Link to="/">
              <Typography variant="h6" component="div">
                EcoRide
              </Typography>
            </Link>
            <Link to="/offers" ><Typography>Offers</Typography></Link>
            <Link to="/CarRentals" ><Typography>Car Rentals</Typography></Link>
            <Link to="/Cars" ><Typography>Cars</Typography></Link>
          </Toolbar>
        </Container>
      </AppBar>
      <Container>
        <Routes>
          <Route path={"/"} element={<Offers />} />
          <Route path={"/offers"} element={<Offers />} />
          <Route path={"/"} element={<CarRentals />} />
          <Route path={"/carrentals"} element={<CarRentals />} />
          <Route path={"/"} element={<Cars />} />
          <Route path={"/cars"} element={<Cars />} />
          <Route path={"/addcar"} element={<AddCar />} />

        </Routes>
      </Container>
    </Router>
  );
}
export default App;