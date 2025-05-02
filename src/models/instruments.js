import mongoose from "mongoose";

const instrumentSchema = new mongoose.Schema({
  instrumentName: {
    type: String,
    required: true
  },
  instrumentCategory: {
    type: String,
    required: true,
    enum: ['tractor', 'harvester', 'plow', 'planter', 'irrigation', 'fertilizer']
  },
  instrumentStatus: {
    type: String,
    required: true,
    enum: ['active', 'mantainance', 'inactive']
  },
  rentPerHour: {
    type: Number,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  
  farmer: {
    type: String,
    required: true
  },
  contactNumber: {
    type: String,
    required: true
  },
  lastServiceDate: {
    type: Date,
    required: true
  },
  quantity: {
    type: Number,
    required: true
  }
}, {
  timestamps: true
});

const Instrument = mongoose.model('Instrument', instrumentSchema);

export { Instrument };
