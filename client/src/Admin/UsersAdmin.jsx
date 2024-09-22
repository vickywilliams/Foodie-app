import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import './admin.css'

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const nav = useNavigate();

  useEffect(() => {
    (async () => {
      const token = sessionStorage.getItem("token");
      if (token) {
        try {
          const res = await axios.get('https://foodapp-mern-zkg0.onrender.com/api/user', {
            headers: {
              Authorization: `Bearer ${token}`
            }
          });
          const filteredUsers = res.data.filter(user => !user.isAdmin);
          setUsers(filteredUsers);
          setLoading(false);
        } catch (err) {
          console.error("Error fetching users:", err);
          setLoading(false);
        }
      }
    })();
  }, []);

  const handleViewHistory =(id) => {
   nav(`/userHistory/${id}`)
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div  className="admin-container">
      <h2>Users</h2>
      <table style={{ width: '100%', marginTop: '20px' }}>
        <thead>
          <tr>
            <th style={{ padding: '10px' }}>Email</th>
            <th style={{ padding: '10px' }}>Name</th>
            <th style={{ padding: '10px' }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id}>
              <td style={{ padding: '10px' }}>{user.email}</td>
              <td style={{ padding: '10px' }}>{user.name}</td>
              <td style={{ padding: '10px', textAlign: 'center' }}>
                <button
                  style={{ marginRight: '10px' }}
                  onClick={() => handleViewHistory(user._id)}
                >
                  View History
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Users;
