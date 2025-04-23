import { Product } from '../models/Products.js';

export const addProduct = async (req, res)=> {
    try {
        const data = req.body;
        console.log("Received data:", data);
        if (!data) {
            return res.status(400).json({ message: "No data provided" });
        }
        const { productName, productCategory, productPrice, productQuantity, productDescription, user } = data;
        const product = new Product({
            productName: productName,
            productCategory: productCategory,
            productPrice : productPrice,
            productQuantity: productQuantity,
            productDescription: productDescription,
            user: user
        });
        const savedProduct = await product.save();
        // console.log("Product saved successfully:", savedProduct);

        const io = req.app.get('io');
        io.of('/sell').emit('productAdded',savedProduct);

        return res.status(201).json({ 
            message: "Product added successfully",
            product: savedProduct });
        
    } catch (error) {
        console.error("Error in adding product:", error);
        return res.status(500).json({ message: "MongoDB Error: " + error.message });
    }
}

