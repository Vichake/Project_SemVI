import React, { useEffect, useState } from "react";
import axios from "axios";
import { useUser } from "../../context/userContext.jsx";

const ProductCardList = () => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState("");
  const url = 'http://localhost:5000';
  const fetchProducts = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      setError("No auth token found. Please log in.");
      return;
    }

    try {
        const response = await fetch(`${url}/user/getUsersProducts`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || "Failed to fetch products");
        }
      
        const data = await response.json();
        setProducts(data.data);
      } catch (err) {
        console.error(err);
        setError(err.message || "Failed to fetch products");
      }
      
  };

  const handleDelete = async (productId) => {
    // You can implement actual delete logic here using axios.delete
    const token = localStorage.getItem("token");
    if (!token) {
        setError("No auth token found. Please log in.");
        return;
    }

    try {
        const response = await fetch(`${url}/user/deleteProducts`, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ productId })
        });
        // Remove the deleted product from the state
        setProducts((prevProducts) =>
          prevProducts.filter((product) => product._id !== productId)
        );
  
        alert("Product deleted successfully!");
      } catch (err) {
        console.error(err);
        setError(err.response?.data?.message || "Failed to delete product");
      }
    console.log("Delete clicked for:", productId);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="pcl-container">
      <h2 className="pcl-title">Your Products on Sale</h2>
      {error && <p className="pcl-error">{error}</p>}
      <div className="pcl-grid">
        {products.map((product) => (
          <div className="pcl-card" key={product._id}>
            <h3 className="pcl-card-title">{product.productName}</h3>
            <p className="pcl-card-description">{product.productDescription}</p>
            <p className="pcl-info"><strong>Category:</strong> {product.productCategory}</p>
            <p className="pcl-info"><strong>Price:</strong> ₹{product.productPrice}</p>
            <p className="pcl-info"><strong>Quantity:</strong> {product.productQuantity}</p>
            <span className="pcl-timestamp">
              Created at: {new Date(product.createdAt).toLocaleString()}
            </span>
            <button
              className="pcl-delete-btn"
              onClick={() => handleDelete(product._id)}
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductCardList;
