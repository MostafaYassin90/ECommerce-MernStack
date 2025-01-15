import { useContext } from "react";
import Title from "../Title/Title";
import { ShopContect } from "../../context/shopContect";

const CartTotal = () => {

  const { currency, delivery_fee, getCartAmount } = useContext(ShopContect);

  return (
    <div className="w-full py-12">
      <div className="flex justify-end">

        <div className="w-full sm:w-[450px]">

          <div className="text-2xl flex justify-start mb-5">
            <Title text1={"CART"} text2={"TOTAL"} />
          </div>
          {/* Subtotal */}
          <div className="flex justify-between py-2 border-b">
            <p>Subtotal</p>
            <p>{currency}{getCartAmount()}</p>
          </div>
          {/* Subtotal */}
          <div className="flex justify-between py-2 border-b">
            <p>Shipping fee</p>
            <p>{currency}{delivery_fee}</p>
          </div>
          {/* Subtotal */}
          <div className="flex justify-between py-2">
            <p className="text-xl font-medium">Total</p>
            <p>{currency}{getCartAmount() === 0 ? 0 : getCartAmount() + delivery_fee}</p>
          </div>

        </div>

      </div>
    </div>
  );
};

export default CartTotal;
