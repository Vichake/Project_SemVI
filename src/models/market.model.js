import mongoose from "mongoose";

const marketSchema = new mongoose.Schema({
  marketName: String,
  district: String,
  state: String,
  location: {
    type: { type: String, enum: ["Point"], default: "Point" },
    coordinates: [Number] // [longitude, latitude]
  }
});

const Market = mongoose.model("Market", marketSchema);

export { Market };