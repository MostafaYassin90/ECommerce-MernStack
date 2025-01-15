import { useContext } from "react";
import { WishlistContext } from "../../context/wishlistContext";


const Wishlist = () => {
  const { wishlistItems, removeItem } = useContext(WishlistContext);

  return (
    <div className="py-10 border-t">
      <p className="mb-10 text-2xl font-semibold">Your Wishlist</p>
      {/* Show Wishlist Items */}
      <div className="grid grid-cols-2  sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5">
        {
          wishlistItems.map((product, index) => (
            <div key={index} className="border rounded border-gray-400 overflow-hidden ">
              {/* Image */}
              <img src={product.image[0]} alt="product-image" className="block h-[200px] w-full bg-gray-200" />
              {/* title and price */}
              <div className="p-2 text-sm text-gray-700">
                <p className="text-sm whitespace-nowrap	overflow-hidden text-ellipsis">{product.title}</p>
                <p className="mt-1 font-semibold">${product.price}</p>
              </div>
              <div className="text-center">
                <button className="bloack my-2 mx-auto bg-black text-white py-1 px-3 rounded"
                  onClick={() => { removeItem(product._id); }}
                >Remove</button>
              </div>
            </div>
          ))
        }
      </div>
    </div>
  );
};

export default Wishlist;
