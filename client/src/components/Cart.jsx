import React, { useEffect, useState } from 'react';
import Navbar from './Navbar';
import '../styles/cart.css';
import { Navigate, useNavigate } from 'react-router-dom';
import {toast} from 'react-toastify'

const Cart = ({ cartItems, setCartItems }) => {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(false);

  useEffect(() => {
    const token = sessionStorage.getItem('token');
    if (token) {      
      setIsLogin(true);
    } else {
      setIsLogin(false);
    }
  }, []);

  useEffect(() => {
    if (isLogin) {
      const savedCartItems = JSON.parse(sessionStorage.getItem('cartItems') || '[]');
      setCartItems(savedCartItems);
    } 
  }, [isLogin, setCartItems]);

  useEffect(() => {
   
    sessionStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems]);

  const calculateTotal = () => {
    return cartItems.reduce((acc, item) => 
      acc + ((item.selectedOption?.price || 0) * (item.qty || 0)), 0
    
    );
  };

  const calculateDiscountedTotal =()=>{
    const total = calculateTotal();
    return total > 2500 ? total * 0.85 : total
  }

  const total = calculateTotal();
  const discountedTotal = calculateDiscountedTotal()

  const handleCheckout = () => {
    if (cartItems.length === 0) {
      toast.error('Your cart is empty!', { position: 'top-center',duration: 2000 });
      return;
    }
    sessionStorage.setItem('finalTotal', discountedTotal.toFixed(2));
    toast.success('Proceeding to checkout', { position: 'top-center',duration: 2000 });
    navigate('/billing');
  };

  const handleRemoveItem = (index) => {
    const updatedCartItems = cartItems.filter((_, i) => i !== index);
    setCartItems(updatedCartItems);
  };

  if (!sessionStorage.getItem('token')) {
    return <Navigate to="/login" />;
  }

  return (
    <>
      <Navbar isLogin={true} setIsLogin={() => {}} />
      <div className="cart-container">
        <h2>Your Cart</h2>
        {cartItems.length === 0 ? (
          <p className="empty-cart">Your cart is empty.</p>
        ) : (
          <>
            <ul className="cart-items-list">
              {cartItems.map((item, index) => (
                <li key={index} className="cart-item">
                  <img src={item.img} alt={item.name} className="cart-item-img" />
                  <div className="cart-item-details">
                    <h3 className="cart-item-name">{item.name}</h3>
                    <p className="cart-item-option">
                      {item.selectedOption ? `${item.selectedOption.type} - ₹${item.selectedOption.price}` : 'No option selected'}
                    </p>
                    <p className="cart-item-quantity">Quantity: {item.qty}</p>
                    <p className="cart-item-total">
                      Total: ₹{item.selectedOption ? item.selectedOption.price * item.qty : 0}
                    </p>
                  </div>
                  <button onClick={() => handleRemoveItem(index)} className="remove-btn">Remove</button>
                </li>
              ))}
            </ul>
            <div className="cart-total">
            <h3>
                Total: ₹{discountedTotal.toFixed(2)}{' '}
                {total > 2500 && (
                  <span className="discount-info">(15% discount applied, Original: ₹{total.toFixed(2)})</span>
                )}
              </h3>
              <button onClick={handleCheckout} className="checkout-btn">Proceed to Checkout</button>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Cart;
