import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import './admin.css'

const Category = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const nav = useNavigate();

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const res = await axios.get("https://foodapp-mern-zkg0.onrender.com/api/categories");
      setCategories(res.data);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching categories:", err);
      setError("Failed to load categories");
      setLoading(false);
    }
  };

  const handleItems = (categoryId) => {
    nav(`/adminItems/${categoryId}`);
  };

  const handleDeleteCategory = async (categoryId) => {
    try {
      const confirmDelete = window.confirm("Are you sure you want to delete this category?");
      if (confirmDelete) {
        await axios.delete(`https://foodapp-mern-zkg0.onrender.com/api/deleteCategory/${categoryId}`);
        fetchCategories();
      }
    } catch (err) {
      console.error("Error deleting category:", err);
      setError("Failed to delete category.");
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div  className="admin-container">
      <button onClick={() => nav("/addCategory")}>Add Category</button>
      <h2>Categories</h2>
      <ul>
        {categories.map((category) => (
          <li key={category._id}>
            {category.categoryName}
            <button onClick={() => handleItems(category._id)}>View Items</button>
            <button onClick={() => handleDeleteCategory(category._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Category;
