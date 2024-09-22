import React, { useEffect, useState } from 'react';
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Carousal from "../components/Carousal";
import CatCard from "../components/CatCard";
import '../styles/home.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Body from "../components/Body";
import PromoSection from '../components/PromoSection';

const Home = ({ isLogin, setIsLogin, cartItems, setCartItems }) => {
  const [showTitle, setShowTitle] = useState(true);

  useEffect(() => {
    sessionStorage.setItem('cartItems', JSON.stringify(cartItems));
    const timer = setTimeout(() => setShowTitle(false), 3500);
    return () => clearTimeout(timer);
  }, [cartItems]);

  const cartItemCount = cartItems.reduce((count, item) => count + item.qty, 0);

  return (
    <div>
      {showTitle && (
        <div className="fullscreen-title">
          <h1>Chenni's Kitchen</h1>
        </div>
      )}
      {!showTitle && (
        <div>
          
          <div className="navbarPos slide-up">
            <Navbar isLogin={isLogin} setIsLogin={setIsLogin} cartItemCount={cartItemCount} />
          </div>

          <div className="home-container">

            <div className="crsl zoom-in">
              <Carousal />
            </div>

            <div className="body slide-up">
              <Body />
            </div>

            <div className="title zoom-in">
              <h3>Categories</h3>
            </div>

            <div id="catCard" className="rotate-in">
              <CatCard isLogin={isLogin} />
            </div><br />

            <div className='rotate-in'>
              <PromoSection />
            </div>

          </div>
          <Footer className="footer fade-in" />
        </div>
      )}
    </div>
  );
};

export default Home;
