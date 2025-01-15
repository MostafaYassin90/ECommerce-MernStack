import mongoose from "mongoose";


// Product Schema
const productSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  description: { type: String, required: true, trim: true },
  price: { type: Number, required: true, trim: true },
  image: { type: Array, required: true },
  size: { type: Array, required: true },
  category: { type: String, required: true },
  subCategory: { type: String, required: true },
  bestSeller: { type: Boolean },
  date: { type: Number, required: true }
});

// Product Model
const ProductModel =
  mongoose.models.Product || mongoose.model("Product", productSchema);


export default ProductModel;