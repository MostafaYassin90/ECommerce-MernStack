import { createContext, useState } from "react";

export const WishlistContext = createContext();


const WishlistContextProvider = (props) => {

  const [wishlistItems, setWishlistItems] =
    useState(window.localStorage.getItem("Wishlist") ? JSON.parse(window.localStorage.getItem("Wishlist")) : []);

  // Add To Wishlist
  const addToWishlist = (singleProduct) => {
    let wishlistItemsClone = wishlistItems.slice(); // [{}, {}, {}]
    wishlistItemsClone.push(singleProduct);
    window.localStorage.setItem("Wishlist", JSON.stringify(wishlistItemsClone));
    setWishlistItems(wishlistItemsClone);
  };

  // Remove Item From Wishlist
  const removeItem = (productId) => {
    let wishListCopy = wishlistItems.slice(); // [ {}, {}, {}, {} ]
    wishListCopy = wishListCopy.filter((product) => product._id !== productId);
    window.localStorage.setItem("Wishlist", JSON.stringify(wishListCopy));
    setWishlistItems(wishListCopy);
  };

  console.log(wishlistItems);

  const value = {
    addToWishlist: addToWishlist,
    removeItem: removeItem,
    wishlistItems: wishlistItems
  };

  return (
    <WishlistContext.Provider value={value}>
      {props.children}
    </WishlistContext.Provider>
  );
};

export default WishlistContextProvider;