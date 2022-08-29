import React, {  useContext} from 'react';
import { Routes, Route } from "react-router-dom";
import { GlobalState } from '../GlobalState';
import Product from "./product/Product";
import DetailProduct from './detailProduct/DetailProduct';
import Login from "./auth/Login";
import Register from './auth/Register';
import Cart from './cart/Cart';
import NotFound from './utils/NotFound';
import OrderHistory from './history/OrderHistory';
import OrderDetails from './history/OrderDetails';
import Categories from './categories/Categories';
import CreateProduct from './createProduct/CreateProduct';

const Pages = () => {
  const state = useContext(GlobalState);
  const [isLoggedIn] = state.UserAPI.isLoggedIn;
  const [isAdmin] = state.UserAPI.isAdmin;
  
  return (
    <Routes>
        <Route path='/' element={<Product />} />
        <Route path='/login' element={isLoggedIn ? <NotFound /> : <Login /> }/>
        <Route path='/register' element={isLoggedIn ? <NotFound /> : <Register />}/>
        <Route path='/category' element={isAdmin ? <Categories /> : <NotFound />}/>
        <Route path='/product' element={isAdmin ? <CreateProduct /> : <NotFound />}/>
        <Route path='/history' element={isLoggedIn ? <OrderHistory /> : <NotFound /> }/>
        <Route path='/history/:id' element={isLoggedIn ? <OrderDetails /> : <NotFound /> }/>
        <Route path='/cart' element={<Cart />} />
        <Route path='/detail/:id' element={<DetailProduct />} />

        <Route path='*' element={<NotFound />} />
    </Routes>
  )
}

export default Pages;