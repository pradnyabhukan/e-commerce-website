import logo from './logo.svg';
import './App.css';
import Home from './components/Home';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Product from './components/Product';
import Cart from './components/Cart';
import {createContext, useState, useEffect } from 'react';
import AppNavbar from './components/Navbar';
import Footer from './components/Footer';
import "../src/components/styles.css"

export const CartContext = createContext();

function App() {
  const [cart, setCart] = useState(JSON.parse(window.sessionStorage.getItem('cart')) || []);
  useEffect(()=>{
    window.sessionStorage.setItem('cart', JSON.stringify(cart));
  },[])
  return (
    <BrowserRouter basename='/e-commerce-website'>
    <CartContext.Provider value={{cart, setCart}}>
      <AppNavbar/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/product/:id' element={<Product/>}/>
        <Route path='/cart' element={<Cart/>} />
      </Routes>
      <Footer/>
      </CartContext.Provider>
    </BrowserRouter>
  );
}

export default App;
