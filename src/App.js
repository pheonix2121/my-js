import { Route, BrowserRouter, Routes } from 'react-router-dom';
import './App.css';
import Navbar from './components/Header/Navbar';
import AddProduct from './components/Pages/AddProduct';
import ShowProducts from './components/Pages/ShowProducts';
import { useState } from 'react';
import Cart from './components/Cart/Cart';

function App() {
  const [isCartOpen, SetIsCartOpen] = useState(false)
  const openCartHandler = () => {
    SetIsCartOpen(true)
  }

  const closeCartHandler = () => {
    SetIsCartOpen(false)
  }
  return (
    <BrowserRouter>
      {isCartOpen && <Cart closeCartHandler={closeCartHandler} />}
      <Navbar openCartHandler={openCartHandler} />
      <Routes>
        <Route path='/' element={<ShowProducts />} />
        <Route path='/add-products' element={<AddProduct />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;