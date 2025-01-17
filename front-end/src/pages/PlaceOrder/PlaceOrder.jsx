import { useContext, useState } from "react";
import { assets } from "../../assets/assets";
import CartTotal from "../../components/CartTotal/CartTotal";
import Title from "../../components/Title/Title";
import { useNavigate } from "react-router-dom";
import { ShopContect } from "../../context/shopContect";
import axios from "axios";
import { toast } from "react-toastify";
import { backendUrl } from "../../App";
import "./PlaceOrder.css";


const PlaceOrder = () => {

  // Token
  const token = window.localStorage.getItem("Token");
  // Context
  const { cartItems, setCartItems, getCartAmount, delivery_fee, products } = useContext(ShopContect);
  // Navigation
  const navigate = useNavigate();
  // State
  const [method, setMethod] = useState("cod");
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipCode: "",
    country: "",
    phone: ""
  });

  // onChange Handler 
  const onChangeHandler = async (event) => {
    let name = event.target.name;
    let value = event.target.value;
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  // onSubmitHandler 
  const onSubmitHandler = async (event) => {
    event.preventDefault();

    let orderItems = []; // {aaaa: {S:0, M:1}, aaaab: {M : 1, L: 0}}

    for (const items in cartItems) {
      for (const item in cartItems[items]) {
        if (cartItems[items][item] > 0) {
          let itemInfo = structuredClone(products.find((product) => product._id === items));
          if (itemInfo) {
            itemInfo.size = item;
            itemInfo.quantity = cartItems[items][item];
            orderItems.push(itemInfo);
          }
        }
      }
    }
    const orderData = {
      address: formData,
      items: orderItems,
      amount: getCartAmount() + delivery_fee
    };

    switch (method) {
      case "cod":
        const response = await axios.post(backendUrl + "/api/order/place", orderData,
          { headers: { authorization: "Bearer " + token } }
        );
        console.log(response);
        if (response.data.success) {
          setCartItems({});
          navigate("/orders");
        } else {
          toast.error(response.data.message);
        }
        break;

      case "stripe":
        const responseSripe = await axios.post(backendUrl + "/api/order/stripe", orderData,
          {
            headers: {
              authorization: "Bearer " + token,
            }
          }
        );
        if (responseSripe.data.success) {
          const { session_url } = responseSripe.data;
          window.location.replace(session_url);
        } else {
          toast.error(responseSripe.data.message);
        }
        break;

      default:
        break;
    }


  };


  return (
    <form className="py-10 border-t" onSubmit={onSubmitHandler}>
      <div className="flex flex-col sm:flex-row gap-10 sm:gap-10">

        {/* Left Side */}
        <div className="w-full sm:w-1/2">
          <div className="flex justify-start mb-5">
            <Title text1={"DELIVERY"} text2={"INFORMATION"} />
          </div>
          {/* Form */}
          <div>
            {/* Name */}
            <div className="flex gap-3 mb-3">
              <input type="text" placeholder="First Name" className="w-1/2 block border border-gray-400 py-1 px-3 rounded" required name="firstName" onChange={onChangeHandler} value={formData.firstName} />
              <input type="text" placeholder="Last Name" className="w-1/2 block border border-gray-400 py-1 px-3 rounded" required name="lastName" onChange={onChangeHandler} value={formData.lastName} />
            </div>
            {/* Email */}
            <input type="email" placeholder="Email Address" className="w-full mb-3 block border border-gray-400 py-1 px-3 rounded" required name="email" onChange={onChangeHandler} value={formData.email} />
            {/* Street */}
            <input type="text" placeholder="Street" className="w-full mb-3 block border border-gray-400 py-1 px-3 rounded" required name="street" onChange={onChangeHandler} value={formData.street} />
            {/* City State */}
            <div className="flex gap-3 mb-3">
              <input type="text" placeholder="City" className="w-1/2 block border border-gray-400 py-1 px-3 rounded" required name="city" onChange={onChangeHandler} value={formData.city} />
              <input type="text" placeholder="State" className="w-1/2 block border border-gray-400 py-1 px-3 rounded" required name="state" onChange={onChangeHandler} value={formData.state} />
            </div>
            {/* ZipCode Country */}
            <div className="flex gap-3 mb-3">
              <input type="number" placeholder="Zipcode" className="w-1/2 block border border-gray-400 py-1 px-3 rounded" required name="zipCode" onChange={onChangeHandler} value={formData.zipCode} />
              <input type="text" placeholder="Country" className="w-1/2 block border border-gray-400 py-1 px-3 rounded" required name="country" onChange={onChangeHandler} value={formData.country} />
            </div>
            {/* Phone */}
            <input type="number" placeholder="Phone" className="w-full block border border-gray-400 py-1 px-3 rounded" required name="phone" onChange={onChangeHandler} value={formData.phone} />
          </div>
        </div>

        {/* Right Side */}
        <div className="w-full sm:w-1/2">
          {/* Cart Total */}
          <CartTotal />

          {/* Payment Methods */}
          <div className="w-full sm:w-[450px] ml-auto">
            <div className="flex justify-start mb-4">
              <Title text1={"PAYMENT"} text2={"METHOD"} />
            </div>
            {/* Methods */}
            <div className="flex flex-col lg:flex-row gap-3 lg:items-center items-start">
              {/* Stripe */}
              <div className={`border w-full sm:w-1/2 rounded flex items-center justify-between py-2 pl-2 pr-4 cursor-pointer border-gray-400`}
                onClick={() => { setMethod("stripe"); }}
              >
                <p className={`border rounded-full border-gray-900 w-4 h-4 ${method === "stripe" ? "bg-green-900" : ""}`}></p>
                <img src={assets.stripe_logo} alt="stripe_logo" className="h-6" />
              </div>
              {/* Razorpay */}
              <div className={`border w-full sm:w-1/2 rounded flex items-center justify-between py-2 pl-2 pr-4 cursor-pointer border-gray-400`}
                onClick={() => { toast.info("Sorry The Razorpay payment gateway is suspended"); }}
              >
                <p className={`border rounded-full border-gray-900 w-4 h-4 `}></p>
                <img src={assets.razorpay_logo} alt="stripe_logo" className="h-6 w-20" />
              </div>
              {/* Cash On Delivery */}
            </div>
            <div className={`border w-full sm:w-1/2 rounded flex items-center justify-between mt-3 py-2 pl-2 pr-4 cursor-pointer border-gray-400`}
              onClick={() => { setMethod("cod"); }}
            >
              <p className={`border rounded-full border-gray-900 w-4 h-4 ${method === "cod" ? "bg-green-900" : ""}`}></p>
              <p className="text-md text-gray-600">Cash On Delviery</p>
            </div>
          </div>
          {/* Place Order */}
          <button type="submit" className="bg-black py-2 px-5 text-white uppercase ms-auto block">Place Order</button>
        </div>
        {/* End Right Side */}




      </div>
    </form>
  );
};

export default PlaceOrder;
