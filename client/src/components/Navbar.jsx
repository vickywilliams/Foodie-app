import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import "../styles/navbar.css";
import { FaShoppingCart } from 'react-icons/fa';
import 'bootstrap/dist/css/bootstrap.min.css';

const Navbar = ({ isLogin, setIsLogin ,setCartItems }) => {

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    if (token) {
      setIsLogin(true);
    } else {
      setIsLogin(false);
    }
  }, [setIsLogin]);

  const handleLogout = () => {
    const confirmLogout = window.confirm("Are you sure you want to logout?");
    if (confirmLogout) {
      sessionStorage.removeItem("token");
      sessionStorage.removeItem("user");
      sessionStorage.removeItem("cartItems");
      sessionStorage.removeItem("productData");
      setIsLogin(false);
      setCartItems([]);
    }
  };

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleScrollDown = () => {
    window.scrollTo({ top: 1200, behavior: 'smooth' });
  };

  const cartItemCount = 0;

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark" >
        <div className="container-fluid">
          <Link className="navbar-brand" to="/" onClick={handleScrollToTop}>
            Chenni's Kitchen
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link active" aria-current="page" to="/" onClick={handleScrollToTop}>
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link active" aria-current="page" to="/" onClick={handleScrollDown}>
                  Category
                </Link>
              </li>
              {isLogin ? (
                <>
                  <li className="nav-item">
                    <Link className="nav-link" to="/purchaseHistory">
                      Purchase History
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/" onClick={handleLogout}>
                      Logout
                    </Link>
                  </li>
                </>
              ) : (
                <>
                  <li className="nav-item">
                    <Link className="nav-link" to="/login">
                      Login
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/signup">
                      Signup
                    </Link>
                  </li>
                </>
              )}
              <li className="nav-item cart-icon">
                <Link className="nav-link" to="/cart">
                  <FaShoppingCart size={24} />
                  {cartItemCount > 0 && (
                    <span className="badge">{cartItemCount}</span>
                  )}
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>  
  );
};

export default Navbar;
