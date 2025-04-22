import { User } from "../models/user.model.js";

export const getUser = async (req, res) => {
    try {
        const { userId } = req.query;
        // console.log("Received userId:", userId);
        if( !userId) {
            return res.status(400).json({ message: "User ID is required" });
        }
        const user = await User.findOne({ email: userId.email });
        const response = {
            _id: user._id,
            name: user.name,
            email: user.email,
            phone: user.phone,
        };
        return res.status(200).json(response);
        // console.log("User data:", response);
    } catch (err) {
        console.error("Error in getting MongoDB user data", err);
        return res.status(500).json({ message: "MongoDB Error: " + err.message });
    }
};
