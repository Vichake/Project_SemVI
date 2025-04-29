import { Product } from "../../models/Products.js";
import { User } from '../../models/user.model.js';

export const deleteProducts = async (req, res) => {
    try {
        const productId = req.body.productId;
        const userId = req.user.uid;

        if (!productId || !userId) {
            return res.status(400).json({ message: 'Missing productId or user ID' });
        }

        const user = await User.findOne({ firebaseUID: userId });

        if (!user) {
          return res.status(404).json({ message: 'User not found' });
        }

        const product = await Product.findById(productId);

        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        // Check if user is the owner
        if (product.user.toString() !== user._id.toString()) {
            return res.status(403).json({ message: 'Unauthorized: You do not own this product' });
        }

        await Product.findByIdAndDelete(productId);

        // Optional: Emit productDeleted event for real-time updates
        const io = req.app.get('io');
        io.of('/sell').emit('productDeleted', { productId });

        return res.status(200).json({ message: 'Product deleted successfully' });
    } catch (error) {
        console.error('Error deleting product:', error);
        return res.status(500).json({ message: 'Server error: ' + error.message });
    }
};
