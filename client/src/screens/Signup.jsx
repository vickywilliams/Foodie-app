import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import {toast} from 'react-toastify'
import '../styles/signup.css';

const Signup = ({ setIsLogin }) => {
  const nav = useNavigate();
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!values.name || !values.email || !values.password) {
      toast.error("All fields are required", { position: "top-right" ,duration: 2000});
      return;
    }

    try {
      const emailCheckResponse = await axios.get(
        `https://foodapp-mern-zkg0.onrender.com/api/checkMail/${values.email}`
      );
      if (emailCheckResponse.data.exists) {
        toast.error("Email already in use", { position: "top-right" ,duration: 2000});
        return;
      }

      const res = await axios.post(
        "https://foodapp-mern-zkg0.onrender.com/api/createUser",
        values
      );

      toast.success(res.data.msg, { position: "top-right",duration: 2000 });

      sessionStorage.setItem("token", res.data.token);
      sessionStorage.setItem("user", JSON.stringify(res.data.user));

      setIsLogin(true);
      nav("/login");

    } 
    catch (error) {
      console.error(
        "Error creating user:",
        error.response ? error.response.data : error.message
      );
      toast.error("Failed to create user", { position: "top-right" ,duration: 2000});
    }
  };

  const inputHandler = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  return (
    <div className="signup-container">
      <div className="signup-form-container">
        <form onSubmit={handleSubmit} className="signup-form">
          <div className="form-group">
            <label htmlFor="name" className="form-label">Name :</label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="enter your name"
              onChange={inputHandler}
              className="form-input"
            />
          </div>
          <div className="form-group">
            <label htmlFor="email" className="form-label">Email :</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="enter your email"
              onChange={inputHandler}
              className="form-input"
            />
          </div>
          <div className="form-group">
            <label htmlFor="password" className="form-label">Password :</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="enter your password"
              onChange={inputHandler}
              className="form-input"
            />
          </div>
          <button type="submit" className="signup-button">Submit</button>
          <Link to={"/login"} className="login-link">Already a User</Link>
        </form>
      </div>
    </div>
  );
};

export default Signup;
