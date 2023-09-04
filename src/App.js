import logo from './logo.svg';
import './App.css';
import Home from './components/Home';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Product from './components/Product';
import Cart from './components/Cart';
import {createContext, useState, useEffect } from 'react';

export const CartContext = createContext();

function App() {
  const [cart, setCart] = useState(JSON.parse(window.sessionStorage.getItem('cart')) || []);
  useEffect(()=>{
    window.sessionStorage.setItem('cart', JSON.stringify(cart));
  },[])
  return (
    <BrowserRouter basename='/e-commerce-website'>
    <CartContext.Provider value={{cart, setCart}}>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/product/:id' element={<Product/>}/>
        <Route path='/cart' element={<Cart/>} />
      </Routes>
      </CartContext.Provider>
    </BrowserRouter>
  );
}

export default App;
