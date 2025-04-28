import { User } from '../models/User.js';

export const updateUsers = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, password, phone, refreshToken } = req.body;

    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    // Update fields if they are provided
    if (name) user.name = name;
    if (email) user.email = email;
    if (password) user.password = password;
    if (phone) user.phone = phone;
    if (refreshToken) user.refreshToken = refreshToken;

    await user.save();

    res.status(200).json({ message: "User updated successfully", user });
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ message: "Server error while updating user" });
  }
};
