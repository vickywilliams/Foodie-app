import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './admin.css'

const Additems = () => {
  const [name, setName] = useState('');
  const [img, setImg] = useState('');
  const [Description, setDescription] = useState('');
  const [option, setOption] = useState([{ type: '', price: '' }]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const nav = useNavigate();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axios.get('https://foodapp-mern-zkg0.onrender.com/api/categories');
        setCategories(res.data);
      } catch (err) {
        console.error('Error fetching categories:', err);
      }
    };
    fetchCategories();
  }, []);

  const handleAddItem = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('https://foodapp-mern-zkg0.onrender.com/api/createItem', {
        name,
        img,
        Description,
        option,
        categoryName: selectedCategory 
      });
      alert('Item added successfully!');
      nav(-1); 
    } catch (err) {
      console.error('Error creating item:', err);
    }
  };

  return (
    <div  className="admin-container">
      <h2>Add Item</h2>
      <form onSubmit={handleAddItem}>
        <div>
          <label>Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Image URL:</label>
          <input
            type="text"
            value={img}
            onChange={(e) => setImg(e.target.value)}
          />
        </div>
        <div>
          <label>Description:</label>
          <textarea
            value={Description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Category:</label>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            required
          >
            <option value="">Select a category</option>
            {categories.map((cat) => (
              <option key={cat._id} value={cat._id}>
                {cat.categoryName}
              </option>
            ))}
          </select>
        </div>
        <div>
          <h4>Options</h4>
          {option.map((opt, index) => (
            <div key={index}>
              <label>Type:</label>
              <input
                type="text"
                value={opt.type}
                onChange={(e) => {
                  const newOptions = [...option];
                  newOptions[index].type = e.target.value;
                  setOption(newOptions);
                }}
                required
              />
              <label>Price:</label>
              <input
                type="number"
                value={opt.price}
                onChange={(e) => {
                  const newOptions = [...option];
                  newOptions[index].price = e.target.value;
                  setOption(newOptions);
                }}
                required
              />
            </div>
          ))}
          <button type="button" onClick={() => setOption([...option, { type: '', price: '' }])}>
            Add Option
          </button>
        </div>
        <button type="submit">Add Item</button>
      </form>
    </div>
  );
};

export default Additems;
