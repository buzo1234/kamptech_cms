import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Routes, Route } from "react-router-dom";

import DashBoardScreen from './screens/DashBoardScreen';
import ProductsScreen from './screens/ProductsScreen';
import CategoryScreen from './screens/CategoryScreen';
import OrdersScreen from './screens/OrdersScreen';
import CouponsScreen from './screens/CouponsScreen';



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
  <Routes>


  <Route path="/" element={<DashBoardScreen />}>
          <Route index element={<DashBoardScreen />} />
          <Route path="products" element={<ProductsScreen />} />
          <Route path="category" element={<CategoryScreen />} />
          <Route path="orders" element={<OrdersScreen />} />
          <Route path="coupons" element={<CouponsScreen />} />
        </Route>
      </Routes>

  
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
