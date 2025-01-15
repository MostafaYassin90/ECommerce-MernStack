import express from 'express';
import { addToCart, getUserCart, updateCart } from '../controllers/cartControllers.js';
import userAuth from '../middleware/userAuth.js';
const cartRouter = express.Router();

/* 
** @Method Post
** @Route http://localhost:4000/api/cart/add
** @Desc  Add Products To Cart
** @Access Private
*/
cartRouter.post("/add", userAuth, addToCart);
/* ----------------------------------------------------------------- */
/* 
** @Method Post
** @Route http://localhost:4000/api/cart/update
** @Desc  Update Product Cart
** @Access Private
*/
cartRouter.post("/update", userAuth, updateCart);
/* ----------------------------------------------------------------- */
/* 
** @Method Post
** @Route http://localhost:4000/api/cart/get
** @Desc  Get Products From Users Cart
** @Access Private
*/
cartRouter.post("/get", userAuth, getUserCart);
/* ----------------------------------------------------------------- */


export default cartRouter;