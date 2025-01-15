import UserModel from "../models/userModel.js";


/* 
** @Method Post
** @Route http://localhost:4000/api/cart/add
** @Desc  Add Products To Cart
** @Access Private
*/
const addToCart = async (req, res) => {

  try {
    const { userId, itemId, size } = await req.body;

    // Get User 
    const userData = await UserModel.findById(userId);
    let cartData = await userData.cartData; // {aaaa: {S:1}}

    if (cartData[itemId]) {
      if (cartData[itemId][size]) {
        cartData[itemId][size] += 1;
      } else {
        cartData[itemId][size] = 1;
      }
    } else {
      cartData[itemId] = {};
      cartData[itemId][size] = 1;
    }

    // Update CartDate In User
    await UserModel.findByIdAndUpdate(userId, { cartData: cartData });

    return res.status(201).json({ user: userData, cartData: cartData, message: "Added To Cart", success: true });
  }
  catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message, success: false });
  }


};
/* ----------------------------------------------------------------- */

/* 
** @Method Post
** @Route http://localhost:4000/api/cart/update
** @Desc  Update Product Cart
** @Access Private
cartData = { aaaa:  {S:1, M:1}, aaab: {S:1, M:1}  }
*/
const updateCart = async (req, res) => {

  try {
    const { userId, itemId, size, quantity } = await req.body;

    // Find User
    const userData = await UserModel.findById(userId);
    let cartData = await userData.cartData;

    cartData[itemId][size] = quantity;

    await UserModel.findByIdAndUpdate(userId, { cartData: cartData });

    return res.status(200).json({ user: userData, cartData: cartData, message: "Cart Data Updated", success: true });
  }
  catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message, success: false });
  }

};
/* ----------------------------------------------------------------- */

/* 
** @Method Post
** @Route http://localhost:4000/api/cart/get
** @Desc  Get Products From Users Cart
** @Access Private
*/
const getUserCart = async (req, res) => {

  try {
    const { userId } = await req.body;
    const userData = await UserModel.findById(userId);
    const cartData = await userData.cartData;
    return res.status(200).json({ user: userData, cartData: cartData, success: true });
  }
  catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message, success: false });
  }

};
/* ----------------------------------------------------------------- */



export { addToCart, updateCart, getUserCart };