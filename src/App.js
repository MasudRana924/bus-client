import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Navbar from './components/shared/Navbar';
import Home from './pages/main/Home';
import BusSeatSelector from './pages/main/buses/BusSeatSelector';
import BusResults from './pages/main/buses/BusResults';
import BusCheckout from './pages/checkout/BusCheckout';
import Login from './pages/auth/Login';


function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/search" element={<BusSeatSelector />} />
          <Route path="/results" element={<BusResults />} /> 
          <Route path="/checkout" element={<BusCheckout />} /> 
          <Route path="/bus/:busId" element={<BusSeatSelector />} /> 
          <Route path="/user-login" element={<Login />} /> 
        </Routes>
      </Router>
    </div>
  );
}

export default App;
