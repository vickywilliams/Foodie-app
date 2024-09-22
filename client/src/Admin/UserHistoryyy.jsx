import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './admin.css'

const UserHistoryyy = () => {
  const { id } = useParams();
console.log('User ID:', id);

  const [purchaseHistory, setPurchaseHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPurchaseHistory = async () => {
      try {
        const token = sessionStorage.getItem("token");
        const res = await axios.get(`https://foodapp-mern-zkg0.onrender.com/api/getHistoryadmin/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setPurchaseHistory(res.data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching purchase history:", err);
        setLoading(false);
      }
    };

    if (id) {
      fetchPurchaseHistory();
    } else {
      console.error('User ID is undefined');
      setLoading(false);
    }
  }, [id]);

  if (loading) return <p>Loading...</p>;

  return (
    <div  className="admin-container">
      <h2>Purchase History</h2>
      {purchaseHistory.length === 0 ? (
        <p>No purchase history found for this user.</p>
      ) : (
        <ul>
          {purchaseHistory.map((purchase, index) => (
            <li key={index}>
              <p>Date: {new Date(purchase.date).toLocaleDateString()}</p>
              <p>Total: ₹{purchase.total.toFixed(2)}</p>
              <ul>
                {purchase.items.map((item, itemIndex) => (
                  <li key={itemIndex}>
                    <h4>{item.name}</h4>
                    <p>Quantity: {item.qty}</p>
                    <p>Price: ₹{item.selectedOption.price}</p>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default UserHistoryyy;
