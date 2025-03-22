import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  firebaseUID: { 
    type: String, required: true, unique: true // Added Firebase UID 
  },
  userName: {
    type: String, 
    required: true 
  },
  email: { 
    type: String, required: true, 
    unique: true 
  },
  password: { 
    type: String, 
    required: true 
  },
  // contactInfo : {
  //   type: String,
  // },
  refreshToken : {
    type : String,
  },
  createdAt: { 
    type: Date, 
    default: Date.now 
  },
});

export const User = mongoose.model("User", userSchema);
