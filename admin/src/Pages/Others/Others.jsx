import { useState } from "react";
import axios from 'axios';
import { useEffect } from "react";
import { toast } from 'react-toastify';
import { assets } from './../../assets/assets';

function Others() {

  const [allOrders, setAllOrders] = useState([]);
  const [orderStatus, setOrderStatus] = useState("");
  const token = window.localStorage.getItem("token");

  // Get All Orders
  const getAllOrders = async () => {
    try {
      const response = await axios.post("http://localhost:4000/api/order/list", {},
        { headers: { authorization: "Bearer " + token } }
      );
      if (response.data.success) {
        setAllOrders(response.data.allOrders);
      } else {
        toast.error(response.response.data.message || response.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllOrders();
  }, [token]);

  // Change 
  const onChangeHandler = async (event, orderId) => {
    try {
      const response = await axios.post("http://localhost:4000/api/order/status", { orderId: orderId, status: event.target.value },
        { headers: { authorization: "Bearer " + token } }
      );
      if (response.data.success) {
        await getAllOrders();
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message || error.message);
    }
  };

  return (
    <div>
      <h1 className="mb-5">Orders Page</h1>
      {/* Show Orders */}
      <div className="flex flex-col gap-3">
        {
          allOrders.map((order, index) => (
            <div className="grid grid-cols-[0.5fr_3fr_1fr_1fr_1fr] gap-2 border p-3" key={index}>
              {/* Image */}
              <img src={assets.parcel_icon} className="w-12" />
              {/* Details */}
              <div>
                {
                  order.items.map((item, index) => (
                    <p key={index} className="text-sm text-gray-600">{item.title} x {item.quantity} {item.size}</p>
                  ))
                }
                {/* Name [FirstName LastName]*/}
                <p className="my-2">{order.address.firstName + " " + order.address.lastName}</p>
                {/* City */}
                <p className="mb-2">{order.address.city}.</p>
                <p className="mb-2">{order.address.street}, {order.address.state}, {order.address.country}, {order.address.zipCode}.</p>
              </div>
              {/* Items and order info */}
              <div>
                <p className="mb-1 text-sm text-gary-600">Items: {order.items.length}</p>
                <p className="mb-1 text-sm text-gary-600">Order: {order.paymentMethod}</p>
                <p className="mb-1 text-sm text-gary-600">Payment: {order.payment ? "Delivered" : "Pending"}</p>
                <p className="mb-1 text-sm text-gary-600">Date: {new Date(order.date).toDateString()}</p>
              </div>
              {/* Total Price */}
              <p>${order.amount}</p>
              {/* Orderd Placed */}
              <div className="flex items-center justify-center">
                <select onChange={(event) => { onChangeHandler(event, order._id); }}
                  value={order.status} className="border p-2 bg-white rounded w-full">
                  <option value="Order Placed">Order Placed</option>
                  <option value="Paking">Paking</option>
                  <option value="Shipped">Shipped</option>
                  <option value="Out For delivery">Out For Delivery</option>
                  <option value="Delivered">Delivered</option>
                </select>
              </div>
            </div>
          ))
        }

      </div>
    </div>
  );
}

export default Others;