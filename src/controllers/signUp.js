import admin from "../config/firebase.js";
import { User } from "../models/user.model.js";
import bcrypt from "bcrypt";

export const signUp = async (req,res) => {
    try {
        const { userName, email, password  } = req.body;

        if (!userName ||!email ||!password) {
            console.log(" Missing required fields");
            return res.status(400).json({ message: "All fields are required" });
        }

        console.log("🔍 Checking if user exists in Firebase...");
        let firebaseUser;
        try {
            firebaseUser = await admin.auth().getUserByEmail(email);
            console.log(" User already exists in Firebase.");
        } catch (error) {
            if (error.code === "auth/user-not-found") {
                console.log(" User does not exist in Firebase. Proceeding...");
            } else {
                console.error("Firebase Error:", error);
                return res.status(500).json({ message: "Firebase error: " + error.message });
            }
        }

        // Check if user already exists in MongoDB
         console.log("Checking if user already exists in MongoDB...");
         const existingUser = await User.findOne({ email });
         if (existingUser) {
             console.log(" User already exists");
             return res.status(400).json({ message: "User already exists" });
        }


        // Create user in Firebase Authentication
        let userRecord;
        let emailVerificationLink;
        if (!firebaseUser) {
            console.log("Creating user in Firebase...");
            userRecord = await admin.auth().createUser({
                email,
                password,
                displayName: userName,
                emailVerified: false, 
            });

            console.log("Sending email verification...");
            emailVerificationLink = await admin.auth().generateEmailVerificationLink(email);
            console.log("Verification link generated.");
        } else {
            console.log("User already exists in Firebase, skipping creation.");
            userRecord = firebaseUser;
        }

        // Hash password before saving
        console.log("Hashing password...");
        const hashedPassword = await bcrypt.hash(password, 10);

         // Generate JWT token for the user
         const token = await admin.auth().createCustomToken(userRecord.uid);

         // Store user in MongoDB
         console.log("Storing user in MongoDB...");
         const user = new User({
             firebaseUID: userRecord.uid, // Save Firebase UID
             userName,
             email,
             password: hashedPassword, 
             refreshToken: token,
         });
        await user.save();
        console.log("User saved to MongoDB:", user);

        // Send the verification link via response (you can send via frontend or email service)
        return res.status(201).json({
            message: "User created successfully. Verify email to activate account.",
            verifyEmail: emailVerificationLink
        });

    } catch (err) {
        console.error("Error registering user:", err);
        return res.status(500).json({ message: err.message });
    }
}