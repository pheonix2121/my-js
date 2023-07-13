import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { ItemContextProvider } from './Store/item-context';
import { CartContextProvider } from './Store/cart-context';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ItemContextProvider>
    <CartContextProvider>
      <App />
    </CartContextProvider>
  </ItemContextProvider>
);