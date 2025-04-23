import axios from "axios";
import admin from "../config/firebase.js";
import { User } from "../models/user.model.js";
import bcrypt from "bcrypt";

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required." });
    }

    let userRecord;
    try {
      userRecord = await admin.auth().getUserByEmail(email);
    } catch (error) {
      return res.status(400).json({ message: "Invalid email or password." });
    }

    if (!userRecord.emailVerified) {
      return res.status(403).json({ message: "Email not verified. Please check your inbox." });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User not found in database." });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(400).json({ message: "Invalid email or password." });
    }

    const customToken = await admin.auth().createCustomToken(userRecord.uid);

    const firebaseApiKey = process.env.VITE_FIREBASE_API_KEY;
    const response = await axios.post(
      `https://identitytoolkit.googleapis.com/v1/accounts:signInWithCustomToken?key=${firebaseApiKey}`,
      {
        token:customToken,
        returnSecureToken:true,
      }
    );

    const idToken = response.data.idToken;
    const refreshToken = response.data.refreshToken;

    return res.status(200).json({
      message: "Login successful",
      idToken,
      refreshToken,
      user: {
        userName: user.userName,
        email: user.email,
        firebaseUID: user.firebaseUID,
      }
    });

  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({ message: "Login failed." });
  }
};
