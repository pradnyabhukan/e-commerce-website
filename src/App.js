import logo from './logo.svg';
import './App.css';
import Home from './components/Home';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Product from './components/Product';
import Cart from './components/Cart';
import {createContext, useState, useEffect } from 'react';

export const CartContext = createContext();

function App() {
  const [cart, setCart] = useState(JSON.parse(localStorage.getItem('cart')) || []);
  useEffect(()=>{
    localStorage.setItem('cart', JSON.stringify(cart));
  },[])
  return (
    <BrowserRouter>
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
