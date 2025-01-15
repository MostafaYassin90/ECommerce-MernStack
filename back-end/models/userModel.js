import mongoose from "mongoose";

// User Schema
const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  isAdmin: { type: Boolean, default: false },
  cartData: { type: Object, default: {} }
}, { timestamps: true, minimize: false });


// User Model
const UserModel = mongoose.models.User || mongoose.model("User", userSchema);

export default UserModel;