import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './admin.css'

const AdminUpdateItem = () => {
  const { id } = useParams(); 
  const [item, setItem] = useState({
    name: '',
    img: '',
    Description: '',
    option: [{ type: '', price: '' }]
  });
  const [loading, setLoading] = useState(true);
  const nav = useNavigate();

  useEffect(() => {
    
    const fetchItem = async () => {
      try {
        const res = await axios.get(`https://foodapp-mern-zkg0.onrender.com/api/item/${id}`);
        setItem(res.data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching item data:', err);
        setLoading(false);
      }
    };
    fetchItem();
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setItem({ ...item, [name]: value });
  };

  const handleOptionChange = (index, key, value) => {
    const newOptions = [...item.option];
    newOptions[index] = { ...newOptions[index], [key]: value };
    setItem({ ...item, option: newOptions });
  };

  const handleAddOption = () => {
    setItem({ ...item, option: [...item.option, { type: '', price: '' }] });
  };

  const handleRemoveOption = (index) => {
    const newOptions = item.option.filter((_, i) => i !== index);
    setItem({ ...item, option: newOptions });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`https://foodapp-mern-zkg0.onrender.com/api/updateItem/${id}`, item);
      alert('Item updated successfully!');
      nav(-1);
    } catch (err) {
      console.error('Error updating item:', err);
      alert('Failed to update the item.');
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div  className="admin-container">
      <h2>Update Item</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={item.name}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label>Image URL:</label>
          <input
            type="text"
            name="img"
            value={item.img}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Description:</label>
          <textarea
            name="Description"
            value={item.Description}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <h4>Options</h4>
          {item.option.map((opt, index) => (
            <div key={index}>
              <label>Type:</label>
              <input
                type="text"
                value={opt.type}
                onChange={(e) => handleOptionChange(index, 'type', e.target.value)}
                required
              />
              <label>Price:</label>
              <input
                type="number"
                value={opt.price}
                onChange={(e) => handleOptionChange(index, 'price', e.target.value)}
                required
              />
              <button type="button" onClick={() => handleRemoveOption(index)}>
                Remove Option
              </button>
            </div>
          ))}
          <button type="button" onClick={handleAddOption}>Add Option</button>
        </div>
        <button type="submit">Update Item</button>
      </form>
    </div>
  );
};

export default AdminUpdateItem;
