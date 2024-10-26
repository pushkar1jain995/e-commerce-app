// models/products.js
import mongoose from 'mongoose';

const ProductSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide a name for this product.'],
    maxlength: [60, 'Name cannot be more than 60 characters'],
  },
  category: {
    type: String,
    required: [true, 'Please specify the category of this product.'],
    maxlength: [40, 'Category cannot be more than 40 characters'],
  },
  price: {
    type: Number,
    required: [true, 'Please provide a price for this product.'],
    maxlength: [6, 'Price cannot be more than 6 characters'],
  },
  image: {
    type: String,
    required: [true, 'Please provide an image URL for this product.'],
  },
  description: {
    type: String,
    required: [true, 'Please provide a description for this product.'],
    maxlength: [200, 'Description cannot be more than 200 characters'],
  },
});

const Product = mongoose.models.Product || mongoose.model('Product', ProductSchema);

export default Product;