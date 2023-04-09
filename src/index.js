import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import DashBoardScreen from './screens/DashBoardScreen';
import ProductsScreen from './screens/ProductsScreen';
import CategoryScreen from './screens/CategoryScreen';
import OrdersScreen from './screens/OrdersScreen';
import CouponsScreen from './screens/CouponsScreen';
import Layout from './Layout/layout';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <Routes>
      
        <Route path='/' element={<Layout screen={'dashboard'} />} />
        <Route
          path='/products'
          element={<Layout screen={'products'} />}
        />
        <Route
          path='/category'
          element={<Layout screen={'category'} />}
        />Layout
        <Route path='/orders' element={<Layout screen={'orders'} />} />
        <Route path='/coupons' element={<Layout screen={'coupons'} />} />
     
    </Routes>
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
