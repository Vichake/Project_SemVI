import React from 'react';
import Axios from 'axios'
import { toast } from 'react-toastify';
import { useUser } from '../../context/userContext.jsx';

const url = 'http://localhost:5000/api'; // Replace with your API URL

function SellProductModal({ visible, onClose }) {
  const { userData } = useUser();
  const handleSubmit = async (event) => {
    event.preventDefault();
  
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData.entries());
  
    // Attach user ID
    if (userData?._id) {
      data.user = userData._id;
    } else {
      toast.error('User not authenticated.', { position: 'bottom-center' });
      return;
    }
  
    try {
      const response = await Axios.post(`${url}/user/addProduct`, data);
  
      if (response.status === 201) {
        toast.success('Product submitted successfully!', { position: 'bottom-center' });
        onClose(); // Close the modal only on success
      } else {
        toast.error(`Submission failed with status ${response.status}`, { position: 'bottom-center' });
      }
    } catch (error) {
      console.error('Submission error:', error);
      toast.error(error.response?.data?.message || 'Error submitting form', { position: 'bottom-center' });
    }
  };
  
  return (
    <div className={`modal ${visible ? 'modal-visible' : 'modal-hidden'}`} id="sellProductModal">
      <div className="modal-content">
        <span className="close-button" onClick={onClose}>&times;</span>
        <h2>Sell Your Product</h2>
        <form id="sellProductForm" onSubmit={handleSubmit}>
          <label htmlFor="productName">Product Name:</label>
          <input type="text" id="productName" name="productName" placeholder="Enter product name" required />

          <label htmlFor="productCategory">Category:</label>
          <select id="productCategory" name="productCategory" required>
            <option value="vegetables">Vegetables</option>
            <option value="fruits">Fruits</option>
            <option value="grains">Grains</option>
            <option value="pulses">Pulses</option>
            <option value="dairy">Dairy</option>
          </select>

          <label htmlFor="productPrice">Price (₹):</label>
          <input type="number" id="productPrice" name="productPrice" placeholder="Enter price per unit" required />

          <label htmlFor="productQuantity">Quantity:</label>
          <input type="number" id="productQuantity" name="productQuantity" placeholder="Enter quantity" required />

          <label htmlFor="productDescription">Description:</label>
          <textarea id="productDescription" name="productDescription" placeholder="Enter product description" rows="4"></textarea>

          <button type="submit" className="button button-yellow">Submit</button>
        </form>
      </div>
    </div>
  );
}

export default SellProductModal;