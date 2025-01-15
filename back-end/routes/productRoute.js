import express from "express";
import upload from './../middleware/multer.js';
import {
  addProduct,
  getAllProducts,
  getProduct,
  deleteProduct
} from "../controllers/productControllers.js";
import AdminAuth from "../middleware/adminAuth.js";

const productRouter = express.Router();


// Route For Add Product
productRouter.post("/add", AdminAuth, upload.fields([{ name: "image1", maxCount: 1 }, { name: "image2", maxCount: 1 }, { name: "image3", maxCount: 1 }, { name: "image4", maxCount: 1 }]), addProduct);


// Route For Get All Products
productRouter.get("/list", getAllProducts);


// Route For Get Single Product
productRouter.post("/product", getProduct); // body id: 1


// Route For Delete Single Product
productRouter.post("/remove", AdminAuth, deleteProduct); // body id: 1



export default productRouter;