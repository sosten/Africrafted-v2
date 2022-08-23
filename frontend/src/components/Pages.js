import React from 'react';
import { Routes, Route } from "react-router-dom";
import Product from "./product/Product";
import DetailProduct from './detailProduct/DetailProduct';
import Login from "./auth/Login";
import Register from './auth/Register';
import Cart from './cart/Cart';
import NotFound from './utils/NotFound';

const Pages = () => {
  return (
    <Routes>
        <Route path='/' element={<Product />} />
        <Route path='/login' element={<Login /> }/>
        <Route path='/register' element={<Register />}/>
        <Route path='/cart' element={<Cart />} />
        <Route path='/detail/:id' element={<DetailProduct />} />

        <Route path='*' element={<NotFound />} />
    </Routes>
  )
}

export default Pages;