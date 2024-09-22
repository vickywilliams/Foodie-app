import React from 'react';
import '../styles/body.css'; 

const Body = () => {
  return (
    <div className="body-container">
      <div className="text-container">
        <h1 className="main-title">Welcome to Chenni's Kitchen</h1>
        <p className="description">
          Experience the best of restaurant dining with our easy-to-use food ordering app. Browse our delicious menu, place your order, and enjoy the finest meals delivered right to your door.
        </p>
      </div>
      <div className="image-gallery">
        <img
          src="https://images.deliveryhero.io/image/fd-pk/LH/v3ij-hero.jpg"
          alt="Delicious dish"
          className="gallery-image"
        />
        <img
          src="https://media.cntraveller.in/wp-content/uploads/2016/02/Hiltonshillim.jpg"
          alt="Restaurant ambiance"
          className="gallery-image"
        />
        <img
          src="https://ak.picdn.net/shutterstock/videos/1086192224/thumb/7.jpg"
          alt="Food preparation"
          className="gallery-image"
        />
      </div>
    </div>
  );
};

export default Body;
