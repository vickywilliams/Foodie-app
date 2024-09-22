import React, { useEffect, useState } from "react";
import axios from 'axios';
import '../styles/userhistory.css'

const UserHistory = () => {
  const [user, setUser] = useState(null);
  const [purchaseHistory, setPurchaseHistory] = useState([]);

  useEffect(() => {
    const userData = JSON.parse(sessionStorage.getItem("user"));
    if (userData) {
      setUser(userData);
      fetchPurchaseHistory(userData._id);
    }
  }, []);

  const fetchPurchaseHistory = async (userId) => {
    try {
      const res = await axios.get(`https://foodapp-mern-zkg0.onrender.com/api/getHistoryadmin/${userId}`);
      setPurchaseHistory(res.data);
    } catch (error) {
      console.error("Failed to fetch purchase history:", error);
    }
  };

  if (!user) {
    return <p>Please log in to view your purchase history.</p>;
  }

  return (
    <div className="user-history-container">
      <h2>Purchase History for {user.name}</h2>
      {purchaseHistory.length > 0 ? (
        <ul>
          {purchaseHistory.map((purchase) => (
            <li key={purchase._id}>
              {/* <h3>Order ID: {purchase._id}</h3> */}
              <h3>Date: {new Date(purchase.date).toLocaleDateString()}</h3>
              <p>Total: ₹{purchase.total.toFixed(2)}</p>
              <h4>Items Purchased:</h4>
              <ul>
                {purchase.items.map((item, index) => (
                  <li key={index} className="item">
                    <p>Product: {item.name}</p>
                    <p>Quantity: {item.qty}</p>
                    <p>Price: ₹{item.selectedOption.price}</p>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      ) : (
        <p>No purchase history found.</p>
      )}
    </div>
  );
};

export default UserHistory;
