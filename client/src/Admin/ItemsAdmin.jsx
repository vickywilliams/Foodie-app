import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import './admin.css'

const Items = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const nav = useNavigate()

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const res = await axios.get(`https://foodapp-mern-zkg0.onrender.com/api/items/${id}`);
        setProducts(res.data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching product data:', err);
        setLoading(false);
      }
    };
    fetchItems();
  }, [id]);

  if (loading) return <p>Loading...</p>;

  const handleUpdate = (id) =>{
    nav(`/AdminupdateItem/${id}`)
  }
 
  const handleDelete = async (itemId) => {
    if (window.confirm("Are you sure you want to delete this item?")) {
      try {
        await axios.delete(`https://foodapp-mern-zkg0.onrender.com/api/deleteItem/${itemId}`);
        setProducts(products.filter(product => product._id !== itemId)); 
        console.log("Item deleted successfully!");
      } catch (err) {
        console.error("Error deleting item:", err);
      }
    }
  }

  return (
    <div  className="admin-container">
      <button onClick={()=>{
        nav('/additem')
      }}>Add Items</button>
      <h1>Food Items</h1>

      <table border="1" style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Image</th>
            <th>Description</th>
            <th>Options</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((prod) => (
            <tr key={prod._id}>
              <td>{prod.name}</td>
              <td>
                <img src={prod.img} alt={prod.name} style={{ width: '100px', height: '100px' }} />
              </td>
              <td>{prod.Description}</td>
              <td>
                <ul>
                  {prod.option.map((opt, index) => (
                    <li key={index}>
                      <p><strong>Type:</strong> {opt.type}</p>
                      <p><strong>Price:</strong> ₹{opt.price}</p>
                    </li>
                  ))}
                </ul>
              </td>
              <td>
                <button onClick={()=>handleUpdate(prod._id)}>Update</button>
                <button onClick={() => handleDelete(prod._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Items;
