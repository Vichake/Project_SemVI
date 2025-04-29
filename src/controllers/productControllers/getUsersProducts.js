import { Product } from "../../models/Products.js";
import { User } from "../../models/user.model.js";

export const getUsersProducts = async(req,res)=>{
    try {
        const firebaseUID = req.user.uid;

        const user = await User.findOne({ firebaseUID });

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const products = await Product.find({user: user._id}).sort({createdAt: -1});

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