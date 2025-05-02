import mongoose from "mongoose";

const indianStates = [
  "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh", 
  "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka", 
  "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", "Mizoram", 
  "Nagaland", "Odisha", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu", 
  "Telangana", "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal",
  // Union Territories
  "Andaman and Nicobar Islands", "Chandigarh", "Dadra and Nagar Haveli and Daman and Diu", 
  "Delhi", "Jammu and Kashmir", "Ladakh", "Lakshadweep", "Puducherry"
];

const schemeSchema = new mongoose.Schema({
  schemeName: {
    type: String,
    required: true,
    trim: true,
  },
  schemeDescription: {
    type: String,
    trim: true,
  },
  schemeEligibility: {
    type: String,
    required: true,
  },
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
    default: null,
  },
  status: {
    type: String,
    required: true,
    enum: ["active", "closing", "closed"],
  },
  officialWebsite: {
    type: String,
    trim: true,
  },
  guidelinesUrl: {
    type: String,
    trim: true,
  },
  schemeType: {
    type: String,
    enum: ["national", "state", "specialized"],
    required: true,
  },
  stateName: {
    type: String,
    enum: [...indianStates, null], 
    default: null,
  },
}, {
  timestamps: true
});

const Scheme = mongoose.model("Scheme", schemeSchema);
export { Scheme };
