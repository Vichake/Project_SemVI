import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  productName: {
    type: String,
    required: true,
    trim: true,
  },
  productCategory: {
    type: String,
    required: true,
    enum: ['vegetables', 'fruits', 'grains', 'pulses', 'dairy'],
  },
  productPrice: {
    type: Number,
    required: true,
    min: 0,
  },
  productQuantity: {
    type: Number,
    required: true,
    min: 0,
  },
  productDescription: {
    type: String,
    trim: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',  
    required: true
  }
}, {
  timestamps: true
});

const Product = mongoose.model('Product', productSchema);

export { Product };
