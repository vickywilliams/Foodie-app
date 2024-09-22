import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import './admin.css'


const Addcat = () => {
  const [categoryName, setCategoryName] = useState("");
  const [img, setImg] = useState("");
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const nav = useNavigate();

  const handleAddCategory = async (e) => {
    e.preventDefault();

    if (!categoryName || !img) {
      setError("Both category name and image URL are required");
      return;
    }

    try {
      const res = await axios.post("https://foodapp-mern-zkg0.onrender.com/api/createCategory", {
        categoryName,
        img
      });

      if (res.status === 200) {
        setSuccessMessage("Category added successfully");
        setCategoryName("");
        setImg("");
        nav(-1)
      }
    } catch (err) {
      console.error("Error creating category:", err);
      setError("Failed to add category. Please try again.");
    }
  };

  return (
    <div  className="admin-container">
      <h2>Add Category</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {successMessage && <p style={{ color: "green" }}>{successMessage}</p>}
      <form onSubmit={handleAddCategory}>
        <div>
          <label>Category Name:</label>
          <input
            type="text"
            value={categoryName}
            onChange={(e) => setCategoryName(e.target.value)}
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
        <button type="submit">Add Category</button>
        <button onClick={() => nav(-1)}>Go Back</button>
      </form>
    </div>
  );
};

export default Addcat;
