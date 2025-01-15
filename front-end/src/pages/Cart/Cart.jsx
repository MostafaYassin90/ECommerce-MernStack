import { useContext, useEffect, useState } from "react";
import { ShopContect } from "../../context/shopContect";
import "./Cart.css";
import Title from "../../components/Title/Title";
import { assets } from "../../assets/assets";
import CartTotal from "../../components/CartTotal/CartTotal";
import { useNavigate } from "react-router-dom";

const Cart = () => {

  const { products, currency, delivery_fee, cartItems, updateQuantity } = useContext(ShopContect);
  const [cartData, setCartData] = useState([]);

  const navigate = useNavigate();

  const getProductCart = async () => {

    if (products.length > 0) {
      let tempData = [];
      for (const items in cartItems) { // {aaaa: {S :0, M: 1}}
        for (const item in cartItems[items]) { // S //
          if (cartItems[items][item] > 0) {
            tempData.push({
              _id: items,
              size: item,
              quantity: cartItems[items][item]
            });
          }
        }
      }
      setCartData(tempData);
    }
  };

  useEffect(() => {
    getProductCart();
  }, [cartItems, products]);



  return (
    <div className="py-10 border-t">
      {/* Title */}
      <div className="flex justify-start mb-10">
        <Title text1={"YOUR"} text2={"CART"} />
      </div>
      {/* Show Products Cart */}
      {
        cartData.map((item, index) => {
          const productCart = products.find((product) => product._id === item._id);
          return (
            <div className="grid grid-cols" key={index}>
              <div className="grid grid-cols-[0.5fr_3fr_1fr_1fr] gap-5 py-5 border-t border-b">
                {/* Image */}
                <img src={productCart.image[0]} alt="product-imged" />
                {/* Product Details Like [title, price, size] */}
                <div>
                  <p className="font-medium text-md">{productCart.title}</p>
                  <div className="flex items-center gap-3 mt-3">
                    <p className="font-bold text-xl">{currency}{productCart.price}</p>
                    <p className="bg-gray-200 py-2 px-3 font-semibold border rounded-md">{item.size}</p>
                  </div>
                </div>
                {/* Quantity */}
                <div className="flex items-center justify-center">
                  <input defaultValue={item.quantity} type="number" min={1} className="w-20 text-center border border-gray-800 rounded"
                    onChange={(event) => {
                      event.target.value === "" || event.target.value === "0" ? null :
                        updateQuantity(item._id, item.size, Number(event.target.value));
                    }
                    }
                  />
                </div>
                {/* Remove Icon */}
                <div className="flex items-center justify-center">
                  <img src={assets.bin_icon} alt="bin-icon" className="w-6 cursor-pointer"
                    onClick={() => {
                      updateQuantity(item._id, item.size, 0);
                      getProductCart();
                    }}
                  />
                </div>
              </div>
            </div>
          );

        })
      }
      {/* Cart Totals */}
      <>
        <CartTotal />
        <div className="text-right">
          <button className="mt-3 py-3 rounded px-5 bg-black text-white font-medium"
            onClick={() => navigate("/place-order")}
          >Proceed To CheckOut</button>
        </div>
      </>
      {/* Cart Totals */}
    </div>
  );
};

export default Cart;
