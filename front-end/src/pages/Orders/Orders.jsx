import { useContext, useEffect, useState } from "react";
import { ShopContect } from "../../context/shopContect";
import Title from "../../components/Title/Title";
import "./Orders.css";
import axios from "axios";
import { backendUrl } from "../../App";

const Orders = () => {
  const { currency } = useContext(ShopContect);
  const [orderData, setOrderData] = useState([]);

  // Token
  const token = window.localStorage.getItem("Token");

  // Location
  // const location = useLocation();


  // useEffect(() => {
  //   setMethod(location.search.split("=")[1]);
  // }, [method]);

  // Get Cart Proudtcs
  const getCartProducts = async () => {
    // let cartData = [];
    // for (const items in cartItems) {
    //   for (const item in cartItems[items]) {
    //     if (cartItems[items][item] > 0) {
    //       cartData.push({
    //         _id: items,
    //         size: item,
    //         quantity: cartItems[items][item]
    //       });
    //     }
    //   }
    // }
    // setCartProducts(cartData);
    try {
      const response = await axios.post(backendUrl + "/api/order/userorders", {}, {
        headers: { authorization: "Bearer " + token }
      });
      if (response.data.success) {
        let allOrderItems = [];
        response.data.userOrders.map((order) => {
          order.items.map((item) => {
            item["status"] = order.status;
            item["payment"] = order.payment;
            item["paymentMethod"] = order.paymentMethod;
            item["date"] = order.date;
            allOrderItems.push(item);
            setOrderData(allOrderItems);
          });
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCartProducts();
  }, [token]);


  return (
    <div className="py-10 border-t">
      <div className="flex items-start text-2xl mb-5">
        <Title text1={"MY"} text2={"ORDERS"} />
      </div>

      {/* Shop Products Order */}
      <div>

        {
          orderData.map((item, index) => (
            <div className="grid grid-cols-[0.8fr_3fr_1fr_1fr] gap-3 py-3 border-t border-b" key={index} >
              {/* Image */}
              <img src={item.image[0]} />
              {/* Product Details */}
              <div>
                <p>{item.title}</p>
                <div className="flex items-center gap-3 my-1 text-base text-gray-600">
                  <p>{currency}{item.price}</p>
                  <p>Quantity: {item.quantity}</p>
                  <p>Size: {item.size}</p>
                </div>
                {/* Date */}
                <p>Date <span className="text-gray-600 text-sm">{new Date(item.date).toDateString()}</span></p>
                {/* Payment */}
                <p>Payment: <span className="text-gray-600 text-sm">{item.paymentMethod}</span></p>
              </div>
              {/* Order Placed */}
              <div className="flex items-center gap-2">
                <p className="w-3 h-3 border border-gray-200 rounded-full bg-green-700"></p>
                <p className="text-gray-700">{item.status}</p>
              </div>
              {/* Track Orders */}
              <div className="flex items-center justify-center">
                <button onClick={getCartProducts} className="py-2 px-3 border text-gray-700">Track Orders</button>
              </div>
            </div >
          ))
        }

      </div >

    </div >
  );
};

export default Orders;
