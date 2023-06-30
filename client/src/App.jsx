import './App.css';
import { Container, AppBar, Toolbar, Typography } from '@mui/material';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Offers from './pages/Offers';

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
          </Toolbar>
        </Container>
      </AppBar>
      <Container>
        <Routes>
          <Route path={"/"} element={<Offers />} />
          <Route path={"/offers"} element={<Offers />} />
        </Routes>
      </Container>
    </Router>
  );
}
export default App;