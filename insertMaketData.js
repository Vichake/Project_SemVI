import mongoose from "mongoose";
import csv from "csvtojson";

// Use the correct MongoDB connection URI
const uri = "mongodb+srv://patilsujal14:Jz4il2unJ5jFCqNA@sujal.xc46h8n.mongodb.net/TechKisan?retryWrites=true&w=majority";

// Mongoose Schema
const marketSchema = new mongoose.Schema({
  marketName: String,
  district: String,
  state: String,
  location: {
    type: { type: String, enum: ["Point"], default: "Point" },
    coordinates: [Number] // [longitude, latitude]
  }
});

// Add Geo Index for location-based queries
marketSchema.index({ location: "2dsphere" });

const Market = mongoose.model("Market", marketSchema);

async function importData() {
  try {
    // Connect to MongoDB
    await mongoose.connect(uri);
    console.log("✅ Connected to MongoDB");

    // Replace 'geolocated_market_dir.csv' with your correct CSV file path
    const jsonArray = await csv().fromFile("geolocated_market_dir.csv");

    const cleanedData = jsonArray.map((item) => {
      const lat = parseFloat(item.latitude);
      const lng = parseFloat(item.longitude);

      // Skip invalid lat/lng entries
      if (isNaN(lat) || isNaN(lng)) return null;

      return {
        marketName: item.market_name,
        district: item.district_name,
        state: item.state_name,
        location: {
          type: "Point",
          coordinates: [lng, lat] // [longitude, latitude] format
        }
      };
    }).filter(Boolean); // Filter out invalid data (nulls)

    // Insert cleaned data into MongoDB
    await Market.insertMany(cleanedData);
    console.log("✅ Data inserted successfully!");

    // Disconnect from MongoDB
    await mongoose.disconnect();
    console.log("🔌 Disconnected from MongoDB");

  } catch (error) {
    console.error("❌ Error:", error);
  }
}

// Execute the data import
importData();
