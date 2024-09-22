import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import '../styles/login.css';

const Login = ({ setIsLogin }) => {
  const nav = useNavigate();

  const [values, setValues] = useState({
    email: '',
    password: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`https://foodapp-mern-zkg0.onrender.com/api/userlogin`, {
        email: values.email,
        password: values.password,
      });

      if (res.status === 200) {
        const { user, token } = res.data;

        toast.success(`Welcome! ${user.name}`, { position: 'top-right', duration: 1000 });

        sessionStorage.setItem('token', token);
        sessionStorage.setItem('user', JSON.stringify(user));
        sessionStorage.setItem('isAdmin', user.isAdmin);

        setValues({ email: '', password: '' });
        setIsLogin(true);


        if (user.isAdmin) {
          nav('/admin');
        } else {
          nav('/');
        }
      }
    } catch (err) {
      toast.error('Invalid email or password', { position: 'top-right',duration: 2000 });
    }
  };

  const inputHandler = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  return (
    <div className="login-container">
      <div>
        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label htmlFor="email" className="form-label">Email :</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter your email"
              onChange={inputHandler}
              value={values.email}
              className="form-input"
            />
          </div>
          <div className="form-group">
            <label htmlFor="password" className="form-label">Password :</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Enter your password"
              onChange={inputHandler}
              value={values.password}
              className="form-input"
            />
          </div>
          <button type="submit" className="login-button">Login</button>
          <Link to={'/signup'} className="signup-link">New User</Link>
        </form>
      </div>
    </div>
  );
};

export default Login;
