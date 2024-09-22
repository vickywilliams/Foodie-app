import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import '../styles/card.css';
import Navbar from './Navbar';
import {toast} from 'react-toastify'

const Card = ({ cartItems, setCartItems }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`https://foodapp-mern-zkg0.onrender.com/api/items/${id}`);
        const storedCartItems = JSON.parse(sessionStorage.getItem('cartItems')) || [];
        const updatedProducts = res.data.map((product) => {
          const cartItem = storedCartItems.find(item => item._id === product._id);
          return {
            ...product,
            selectedOption: cartItem?.selectedOption || null,
            qty: cartItem?.qty || 0,
            addedToCart: !!cartItem
          };
        });
        setProducts(updatedProducts);
      } catch (err) {
        console.error('Error fetching product data:', err);
        toast.error('Failed to fetch products.', { position: 'top-center' ,duration: 2000});
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchProduct();
    }
  }, [id]);


  useEffect(() => {
    sessionStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems]);

  const handleOptionChange = (index, event) => {
    const selectedId = event.target.value;
    const updatedProducts = [...products];
    const selected = updatedProducts[index].option.find((opt) => opt._id === selectedId);
    updatedProducts[index].selectedOption = selected;
    setProducts(updatedProducts);
  };

  const handleQtyInc = (index) => {
    const updatedProducts = [...products];
    if (updatedProducts[index].selectedOption) {
      updatedProducts[index].qty = (updatedProducts[index].qty || 0) + 1;
      setProducts(updatedProducts);
    }
  };

  const handleQtyDec = (index) => {
    const updatedProducts = [...products];
    if (updatedProducts[index].qty > 0) {
      updatedProducts[index].qty = (updatedProducts[index].qty || 0) - 1;
      if (updatedProducts[index].qty === 0) {
        updatedProducts[index].selectedOption = null;
      }
      setProducts(updatedProducts);
    }
  };

  const calculateTotal = (product) => {
    return product.selectedOption ? product.selectedOption.price * (product.qty || 0) : 0;
  };

  const handleAddtoCart = (index) => {
    const product = products[index];
    if (product.selectedOption && product.qty > 0) {
      setCartItems(prevCartItems => {
        const updatedCartItems = [...prevCartItems];
        const existingIndex = updatedCartItems.findIndex(item => item._id === product._id);

        if (existingIndex !== -1) {
          updatedCartItems[existingIndex] = { ...product };
        } else {
          updatedCartItems.push({ ...product });
        }

        sessionStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
        return updatedCartItems;
      });

      const updatedProducts = [...products];
      updatedProducts[index].addedToCart = true;
      setProducts(updatedProducts);

      toast.success('Added to cart', { position: 'top-center',duration: 2000 });
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (products.length === 0) {
    return <div>No products found.</div>;
  }

  return (
    <>
      <Navbar isLogin={true} setIsLogin={() => {}} />
      <div className="cards-container">
        {products.map((product, index) => (
          <div className="card" key={product._id}>
            <img src={product.img} alt={product.name} />
            <h3>{product.name}</h3>
            <p>{product.Description}</p>

            <div className="options-container">
              <h4>Select an Option:</h4>
              <select
                onChange={(e) => handleOptionChange(index, e)}
                value={product.selectedOption?._id || ""}
                disabled={product.addedToCart}
              >
                <option value="" disabled>Select an option</option>
                {product.option.map((opt) => (
                  <option key={opt._id} value={opt._id}>
                    {opt.type} - ₹{opt.price}
                  </option>
                ))}
              </select>
              <div>
                <button
                  className="add-to-cart"
                  onClick={() => handleAddtoCart(index)}
                  disabled={product.addedToCart}
                >
                  {product.addedToCart ? 'Added to Cart' : 'Add to Cart'}
                </button>
                <br />
                <button className="qty-btn" onClick={() => handleQtyDec(index)} disabled={product.addedToCart}>-</button>
                <span className="quantity-display">{product.qty || 0}</span>
                <button className="qty-btn" onClick={() => handleQtyInc(index)} disabled={product.addedToCart}>+</button>
              </div>

              {product.selectedOption && (
                <div className="selected-option">
                  <h5>Selected Option:</h5>
                  <p>Type: {product.selectedOption.type}</p>
                  <p>Price: ₹{product.selectedOption.price}</p>
                  <p>Total: ₹{calculateTotal(product)}</p>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Card;
