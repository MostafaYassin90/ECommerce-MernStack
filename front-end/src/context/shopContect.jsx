import { createContext, useEffect, useState } from "react";
import { toast } from 'react-toastify';
import axios from "axios";
import { backendUrl } from "../App";


// Context
export const ShopContect = createContext();

// Context Fn
function ShopContectProvider(props) {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [cartItems, setCartItems] = useState({});
  const currency = "$";
  const delivery_fee = 10;
  const token = window.localStorage.getItem("Token");

  // Get All Products 
  const getAllProducts = async () => {
    try {
      const response = await axios.get(backendUrl + "/api/products/list");
      if (response.data.success === true) {
        setProducts(response.data.productList);
      } else {
        toast.error(response.response.data.message || response.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error);
    }
  };
  useEffect(() => {
    getAllProducts();
  }, []);

  // Handle Add To Cart Cart Items
  const addToCart = async (itemId, size) => {
    let cartData = structuredClone(cartItems);
    if (cartData[itemId]) {
      if (cartData[itemId][size]) {
        cartData[itemId][size] += 1;
      } else {
        cartData[itemId][size] = 1;
      }
    } else {
      cartData[itemId] = {}; // { aaaa: {S: 1}}
      cartData[itemId][size] = 1;
    }
    setCartItems(cartData);
    if (token) {
      try {
        await axios.post(backendUrl + "/api/cart/add", { itemId, size }, {
          headers: { authorization: "Bearer " + token }
        });
      } catch (error) {
        console.log(error);
        toast.error(error.message);
      }
    }

  };

  // Handle Update Quantity
  const updateQuantity = async (itemId, size, quantity) => {
    let cartData = structuredClone(cartItems); // {aaaa: {S:1, M:1}}
    cartData[itemId][size] = quantity;
    setCartItems(cartData);
    if (token) {
      try {
        await axios.post(backendUrl + "/api/cart/update", { itemId, size, quantity }, {
          headers: { authorization: "Bearer " + token }
        });
      } catch (error) {
        console.log(error);
        toast.error(error.message);
      }
    }

  };


  // Get CartData
  const gettCartData = async () => {
    try {
      const response = await axios.post(backendUrl + "/api/cart/get", {}, {
        headers: { authorization: "Bearer " + token }
      });
      if (response.data.success === true) {
        setCartItems(response.data.cartData);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (token) {
      gettCartData();
    }
  }, []);

  // Get Cart Items Count
  const cartItemsCount = () => { // {aaaa: {S:1}}
    let cartCount = 0;
    for (const items in cartItems) {
      for (const item in cartItems[items]) {
        try {
          if (cartItems[items][item] > 0) {
            cartCount += cartItems[items][item];
          }
        } catch (error) {
          console.log(error);
        }
      };
    }
    return cartCount;
  };


  // Cart Total
  const getCartAmount = () => {
    if (products.length > 0) {
      let cartAmount = 0;

      for (const items in cartItems) {
        let findProduct = products.find((product) => product._id === items);
        for (const item in cartItems[items]) {
          try {
            if (cartItems[items][item] > 0) {
              cartAmount = cartAmount + findProduct.price * cartItems[items][item];
            }
          } catch (error) {
            console.log(error);
          }
        }
      }
      return cartAmount;
    }
  };


  // useEffect(() => {
  //   getCartAmount();
  // }, [cartItems, products]);

  const value = {
    products: products,
    currency: currency,
    delivery_fee: delivery_fee,
    search: search,
    setSearch: setSearch,
    showSearch: showSearch,
    setShowSearch: setShowSearch,
    cartItems: cartItems,
    setCartItems: setCartItems,
    addToCart: addToCart,
    cartItemsCount: cartItemsCount,
    updateQuantity: updateQuantity,
    getCartAmount: getCartAmount,
  };

  return (
    <ShopContect.Provider value={value}>
      {props.children}
    </ShopContect.Provider>

  );
}


export default ShopContectProvider;