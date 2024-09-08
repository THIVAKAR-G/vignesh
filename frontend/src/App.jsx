import React, { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import StoreContextProvider from './Context/StoreContext';  // Correct import of StoreContextProvider
import Home from './pages/Home/Home';
import Footer from './components/Footer/Footer';
import Navbar from './components/Navbar/Navbar';
import Cart from './pages/Cart/Cart';
import LoginPopup from './components/LoginPopup/LoginPopup';
import PlaceOrder from './pages/PlaceOrder/PlaceOrder';
import MyOrders from './pages/MyOrders/MyOrders';
import Verify from './pages/Verify/Verify';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Initialize EmailJS with your public key
import emailjs from 'emailjs-com';
emailjs.init('Uy0deWtqZUoXz6Ys0');

const App = () => {
  const [showLogin, setShowLogin] = useState(false);

  return (
    <StoreContextProvider>
      <ToastContainer />
      
      {showLogin && <LoginPopup setShowLogin={setShowLogin} />}
      
      <div className='app'>
        <Navbar setShowLogin={setShowLogin} />

        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/order' element={<PlaceOrder />} />
          <Route path='/myorders' element={<MyOrders />} />
          <Route path='/verify' element={<Verify />} />
        </Routes>
      </div>

      <Footer />
    </StoreContextProvider>
  );
};

export default App;
