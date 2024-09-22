import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/bill.css';
import { toast } from 'react-toastify';

const Bill = ({ cartItems, setCartItems }) => {
  const [localCartItems, setLocalCartItems] = useState(cartItems || []);
  const navigate = useNavigate();
  const [finalTotal, setFinalTotal] = useState(0);
  const [date, setDate] = useState('');

  useEffect(() => {
    if (cartItems.length) {
      setLocalCartItems(cartItems);
    } else {
      const savedCartItems = JSON.parse(sessionStorage.getItem('cartItems')) || [];
      setLocalCartItems(savedCartItems);
    }
    const savedFinalTotal = sessionStorage.getItem('finalTotal') || '0';
    setFinalTotal(parseFloat(savedFinalTotal));

    setDate(new Date().toLocaleDateString());
  }, [cartItems]);

  const handleBackToHome = async () => {
    try {
      const token = sessionStorage.getItem('token');
      const userString = sessionStorage.getItem('user');
      let user;

      if (userString) {
        user = JSON.parse(userString);

      } else {
        alert('No user found in session. Please log in.');
        navigate('/login');
        return;
      }

      if (!user || !user._id) {
        alert('User ID is missing. Please log in again.');
        navigate('/login');
        return;
      }

      if (user && token) {
        await axios.post(
          'https://foodapp-mern-zkg0.onrender.com/api/purchase',
          {
            userId: user._id,
            items: localCartItems,
            total: finalTotal,
            date
          },
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );

        toast.success('Purchase was completed', { position: 'top-right',duration: 2000 });
        setCartItems([]);
        sessionStorage.removeItem('finalTotal');
        sessionStorage.removeItem('cartItems');
        navigate('/');
      }
    } catch (err) {
      console.error('Error saving purchase:', err);
      toast.error('Error saving purchase , Please try later', { position: 'top-right',duration: 2000 });
    }
  };

  return (
    <div className="bill-container">
      <h4>Chenni's Kitchen</h4>
      <h2>Your Bill</h2>
      <p>Date of Purchase: {date}</p>
      {localCartItems.length === 0 ? (
        <p>Your bill is empty.</p>
      ) : (
        <>
          <ul>
            {localCartItems.map((item, index) => (
              <li key={index}>
                <img src={item.img} alt={item.name} />
                <div>
                  <h3>{item.name}</h3>
                  {item.selectedOption ? (
                    <>
                      <p>{item.selectedOption.type} - ₹{item.selectedOption.price}</p>
                      <p>Quantity: {item.qty}</p>
                      <p>Total: ₹{item.selectedOption.price * item.qty}</p>
                    </>
                  ) : (
                    <p>No option selected</p>
                  )}
                </div>
              </li>
            ))}
          </ul>
          <div className="bill-total">
            {finalTotal > 2500 && <p>-15% discount</p>}
            <h3>Grand Total: ₹{finalTotal.toFixed(2)}</h3>
          </div>
          <p>Have a Good day</p>
          <button onClick={handleBackToHome} className="back-btn">Back to Home</button>
        </>
      )}
    </div>
  );
};

export default Bill;
