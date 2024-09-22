import React from "react";
import { useNavigate } from "react-router-dom";
import './admin.css'

const Admin = ({ isLogin, setIsLogin }) => {
  const nav = useNavigate();

  const handleLogout = () => {
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('user'); 
    setIsLogin(false);
    nav('/');
  };

  const handleCategory = () => {
    nav('/admin/category');
  };

  const handleUser = () => {
    nav('/admin/users');
  };

  return (
    <div className="admin-container">
      <button onClick={handleLogout}>Logout</button>
      <div>
        <h2>Categories</h2>
        <button onClick={handleCategory}>View Categories</button>
      </div>
      <div>
        <h2>Users</h2>
        <button onClick={handleUser}>View Users</button>
      </div>
    </div>
  );
};

export default Admin;
