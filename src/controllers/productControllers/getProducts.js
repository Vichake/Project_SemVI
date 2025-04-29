import { Product } from "../../models/Products.js";
import { User } from "../../models/user.model.js";

export const getProducts = async(req,res)=>{
    try {
        const products = await Product.find().sort({createdAt: -1});

        if(!products.length){
            return res.status(404).json({message: "No products found"});
        }
        return res.status(200).json({
            message: "Products fetched successfully",
            data: products,
        });
    } catch (err) {
        console.error("Error fetching Products",err);
        return res.status(500).json({message: "Server error"});
    }
};