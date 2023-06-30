import './App.css';
import CarRentals from './pages/CarRentals';
import { Container, AppBar, Toolbar, Typography } from '@mui/material';
import { BrowserRouter as Router, Routes, Route, Link }
  from 'react-router-dom';
function App() {
  return (
    <Router>
      <AppBar position="static" className='AppBar'>
        <Container>
          <Toolbar disableGutters={true}>
            <Link to="/">
              <Typography variant="h6" component="div">
                Learning
              </Typography>
            </Link>
            <Link to="/carrentals" ><Typography>Car Rental</Typography></Link>
          </Toolbar>
        </Container>
      </AppBar>
      <Container>
        <Routes>
          <Route path={"/"} element={< CarRentals/>}/>
          <Route path={"/carrentals"} element={< CarRentals/>}/>
        </Routes>
      </Container>
    </Router>
  );
}
export default App;