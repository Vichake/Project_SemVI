// import { User } from '../models/User.js';

// export const addUser = async (req, res) => {
//   try {
//     const { firebaseUID, name, email, password, phone, refreshToken } = req.body;

//     // Basic validation
//     if (!firebaseUID || !name || !email || !password || !phone) {
//       return res.status(400).json({ message: "All required fields must be provided." });
//     }

//     const existingUser = await User.findOne({ email });
//     if (existingUser) {
//       return res.status(400).json({ message: "User with this email already exists." });
//     }

//     const user = new User({
//       firebaseUID,
//       name,
//       email,
//       password,
//       phone,
//       refreshToken
//     });

//     await user.save();

//     res.status(201).json({ message: "User created successfully", user });
//   } catch (error) {
//     console.error("Error creating user:", error);
//     res.status(500).json({ message: "Server error while creating user" });
//   }
// };
