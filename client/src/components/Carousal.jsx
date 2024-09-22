import React from "react";
import Carousel from 'react-bootstrap/Carousel';
import 'bootstrap/dist/css/bootstrap.min.css';

function Carousal() {
  const carouselImgStyle = {
    filter: 'brightness(40%)',
    objectFit: 'cover',
    width: '100%',
    height: '65vh',
  };

  const overlayTextStyle = {
    position: 'absolute',
    top: '-500%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    color: '#F5F5F5',
    fontSize: '3rem',
    fontWeight: 'bold',
    fontFamily: '"Pacifico", cursive',
    textShadow: '0 0 10px rgba(0, 0, 0, 0.7)',
    zIndex: '20',
    whiteSpace: 'nowrap',
  };

  return (
    <Carousel fade>
      <Carousel.Item  interval={1000}>
        <img
          src="https://wallpaperaccess.com/full/8671591.jpg"
          className="d-block w-100"
          alt="First slide"
          style={carouselImgStyle}
        />
        <Carousel.Caption>
          <div style={overlayTextStyle}>Chenni's Kitchen</div>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item interval={1000}>
        <img
          src="https://wallpaperaccess.com/full/4622468.jpg"
          className="d-block w-100"
          alt="Second slide"
          style={carouselImgStyle}
        />
        <Carousel.Caption>
        <div style={overlayTextStyle}>Chenni's Kitchen</div>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item interval={1000}>
        <img
          src="https://images7.alphacoders.com/596/thumb-1920-596343.jpg"
          className="d-block w-100"
          alt="Third slide"
          style={carouselImgStyle}
        />
        <Carousel.Caption>
        <div style={overlayTextStyle}>Chenni's Kitchen</div>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item interval={1000}>
        <img
          src="https://wallpaperaccess.com/full/1317028.jpg"
          className="d-block w-100"
          alt="Fourth slide"
          style={carouselImgStyle}
        />
        <Carousel.Caption>
        <div style={overlayTextStyle}>Chenni's Kitchen</div>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item interval={1000}>
        <img
          src="https://images6.alphacoders.com/902/thumb-1920-902919.jpg"
          className="d-block w-100"
          alt="Fifth slide"
          style={carouselImgStyle}
        />
        <Carousel.Caption>
        <div style={overlayTextStyle}>Chenni's Kitchen</div>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
}

export default Carousal;
