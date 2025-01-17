import { v2 as cloudinary } from "cloudinary";
import ProductModel from './../models/productModel.js';
import "dotenv/config";


/* 
@ ** Method Post
@ ** Route http://localhost:4000/products/add
@ ** Desc Create A New Product 
@ ** Access Private
*/
const addProduct = async (req, res) => {
  try {
    const data = await req.body;
    const { title, description, price, sizes, category, subCategory, bestSeller } = data;

    const image1 = req.files.image1 && req.files.image1[0];
    const image2 = req.files.image2 && req.files.image2[0];
    const image3 = req.files.image3 && req.files.image3[0];
    const image4 = req.files.image4 && req.files.image4[0];

    const images = [image1, image2, image3, image4].filter((item) => item !== undefined);

    // Upload Image Into Cloudinary And Get ImagesURL
    const imagesUrl = await Promise.all(
      images.map(async (item) => {
        try {
          const result = await cloudinary.uploader.upload(item.path, { resource_type: "image" });
          return result.secure_url;
        } catch (error) {
          console.log(error);
          return null;
        }
      })
    );
    const productData = {
      title: data.title,
      description: data.description,
      price: Number(data.price),
      category: data.category,
      subCategory: data.subCategory,
      bestSeller: data.bestSeller === "true" ? true : false,
      size: JSON.parse(data.sizes),
      image: imagesUrl,
      date: Date.now()
    };

    const product = new ProductModel(productData);
    await product.save();

    res.status(201).json({ product, message: "Product Added", success: true });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: `Internal Server ${error.message}`, success: false });
  }

};

/* -------------------------------------------------------------------------------- */
/* 
@ ** Method Get
@ ** Route http://localhost:4000/products/list
@ ** Desc Get All Products 
@ ** Access Public
*/
const getAllProducts = async (req, res) => {
  try {
    const productList = await ProductModel.find({});
    return res.status(200).json({ productList, success: true });
  } catch (error) {
    return res.status(500).json({ success: false, message: `${error.message}` });
  }
};

/* -------------------------------------------------------------------------------- */
/* 
@ ** Method Post
@ ** Route http://localhost:4000/products/product
@ ** Desc Get Single Product
@ ** Access Public
*/
const getProduct = async (req, res) => {

  const id = req.body.id;

  const product = await ProductModel.findById(id);

  if (!product) {
    return res.status(404).json({ message: "Product Not Found." });
  }

  return res.status(200).json({ product });


};

/* -------------------------------------------------------------------------------- */
/* 
@ ** Method Post
@ ** Route http://localhost:4000/products/remove
@ ** Desc Delete Signle Product
@ ** Access Private
*/
const deleteProduct = async (req, res) => { // http://localhost:4000/api/products/remove
  try {
    const id = req.body.id;

    const findProduct = await ProductModel.findById(id);

    if (!findProduct) {
      return res.status(404).json({ message: "Product Not Found." });
    }
    const deletedProduct = await ProductModel.findByIdAndDelete(id);
    return res.status(200).json({ deletedProduct, message: "Deleted Successfully", success: true });
  } catch (error) {
    return res.status(500).json({ message: `${error.message}` });
  }
};


export { addProduct, getAllProducts, getProduct, deleteProduct };