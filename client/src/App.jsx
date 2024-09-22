import React, { useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './screens/Home';
import Login from './screens/Login';
import Signup from './screens/Signup';
import Card from './components/Card';
import Cart from './components/Cart';
import Bill from './components/Bill';
import Admin from './Admin/Admin'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import Category from './Admin/category';
import Users from './Admin/UsersAdmin';
import Items from './Admin/ItemsAdmin';
import UpdateItems from './Admin/UpdateItems';
import UserHistoryyy from './Admin/UserHistoryyy';
import UserHistory from './components/Userhistory';
import Addcat from './Admin/Addcat';
import AddItems from './Admin/Additems';


function App() {

  const [isLogin, setIsLogin] = useState(false);
  const [cartItems, setCartItems] = useState(() => {
    return JSON.parse(sessionStorage.getItem('cartItems')) || [];
  });

  useEffect(() => {
    sessionStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home isLogin={isLogin} setIsLogin={setIsLogin} cartItems={cartItems} setCartItems={setCartItems} />} />
        <Route path='/login' element={<Login setIsLogin={setIsLogin} />} />
        <Route path='/signup' element={<Signup setIsLogin={setIsLogin} />} />
        <Route path='/item/:id' element={<Card cartItems={cartItems} setCartItems={setCartItems} />} />
        <Route path='/cart' element={<Cart cartItems={cartItems} setCartItems={setCartItems} />} />
        <Route path='/billing' element={<Bill cartItems={cartItems} setCartItems={setCartItems} />} />
        <Route path='/admin' element={<Admin isLogin={isLogin} setIsLogin={setIsLogin}/>} />
        <Route path='/admin/category' element={<Category/>} />
        <Route path='/admin/users' element={<Users/>} />
        <Route path='/adminItems/:id' element={<Items/>} />
        <Route path='/AdminupdateItem/:id' element={<UpdateItems/>} />
        <Route path='/userHistory/:id' element={<UserHistoryyy/>} />
        <Route path='/purchaseHistory' element={<UserHistory/>} />
        <Route path='/addCategory' element={<Addcat/>} />
        <Route path='/additem' element={<AddItems/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
