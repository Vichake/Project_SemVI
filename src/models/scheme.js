import mongoose from "mongoose";

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
    schemeEligibilty: {
    type: String,
    required: true,
  },
    startDate:{
    type:Date,
    required:true
},
    endDate:{
    type:Date,
},
    instrumentStatus:{
    type:String,
    required:true,
    enum: ['Active', 'Closing Soon', 'Closed'],
},
    currentBeneficiaries: {
    type: Number,
    required: true,
    min: 0,
},
}, {
  timestamps: true
});

const Scheme = mongoose.model("Scheme",schemeSchema)

export {Scheme};