const SellProductModal = () => {
    return (
      <>
        <button className="button button-white" id="sellProductsButton">Sell Products</button>
  
        <div id="sellProductModal" className="modal hide">
          <div className="modal-content">
            <span className="close-button" id="closeModal">&times;</span>
            <h2>Sell Your Product</h2>
            <form id="sellProductForm">
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
      </>
    );
  };
  
  export default SellProductModal;
  