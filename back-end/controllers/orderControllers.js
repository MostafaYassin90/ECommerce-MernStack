import OrderModel from "../models/orderModel.js";
import UserModel from './../models/userModel.js';
import Stripe from "stripe";
import "dotenv/config";

// Global Variables
const currency = "USD";
const deliveryCharge = 10;

// Getaway Initialize
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2024-06-20"
});

// Place Order In COD
const placeOrder = async (req, res) => {

  try {

    const { userId, items, amount, address } = await req.body;

    const orderData = {
      userId: userId,
      items: items,
      amount: amount,
      address: address,
      paymentMethod: "COD",
      payment: false,
      date: Date.now()
    };
    const newOrder = new OrderModel(orderData);
    await newOrder.save();

    // Find User To Clear CartData After Procceed End
    await UserModel.findByIdAndUpdate(userId, { cartData: {} });

    return res.status(201).json({ order: newOrder, success: true, message: "Order Placed" });

  }
  catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message + "Order Controller error", success: false });
  }

};
/* ---------------------------------- */

// Place Order In Stripe Method
const placeOrderStripe = async (req, res) => {

  try {
    const { userId, items, amount, address } = await req.body;
    const { origin } = await req.headers;

    const orderData = {
      userId: userId,
      items: items,
      amount: amount,
      address: address,
      paymentMethod: "Stripe",
      payment: false,
      date: Date.now()
    };
    const newOrder = new OrderModel(orderData);
    await newOrder.save();

    const line_items = items.map((item) => ({
      price_data: {
        currency: currency,
        product_data: {
          name: item.title
        },
        unit_amount: item.price * 100
      },
      quantity: item.quantity
    }));

    line_items.push({
      price_data: {
        currency: currency,
        product_data: {
          name: "Delivery Charges"
        },
        unit_amount: deliveryCharge * 100
      },
      quantity: 1
    });

    const session = await stripe.checkout.sessions.create({
      success_url: `${origin}/verify?success=true&orderId=${newOrder._id}`,
      cancel_url: `${origin}/verify?success=false&orderId=${newOrder._id}`,
      line_items,
      mode: 'payment'
    });

    return res.status(200).json({ success: true, session_url: session.url });

  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, message: error.message });
  }

};
/* ---------------------------------- */
// Verify Stripe
const verifyStripe = async (req, res) => {
  const { orderId, success, userId } = await req.body;
  try {
    if (success) {
      await OrderModel.findByIdAndUpdate(orderId, { payment: true });
      await UserModel.findByIdAndUpdate(userId, { cartData: {} });
      return res.status(200).json({ success: true });
    } else {
      await OrderModel.findByIdAndDelete(orderId);
      return res.status(400).json({ success: false });
    }

  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, message: error.message });
  }

};
/* ---------------------------------- */
// Place Order In RazorPay
const placeOrderRazorpay = async (req, res) => {

};
/* ---------------------------------- */
// All Orders Data For AdminPanal
const allOrders = async (req, res) => {
  try {
    const allOrders = await OrderModel.find({});
    return res.status(200).json({ success: true, allOrders: allOrders });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, message: error.message });
  }
};
/* ---------------------------------- */
// Update Order Status From Admin Panel
const updateStatus = async (req, res) => {
  try {
    const { orderId, status } = await req.body;
    const orderUpdated = await OrderModel.findByIdAndUpdate(orderId, { status: status });
    return res.status(200).json({ orderUpdated: orderUpdated, success: true });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, message: error.message });
  }
};
/* ---------------------------------- */
// User Order Data For Frontend
const userOrders = async (req, res) => {
  try {

    const { userId } = await req.body;

    const userOrders = await OrderModel.find({ userId: userId });

    return res.status(200).json({ success: true, userOrders: userOrders });

  }
  catch (error) {
    console.log(error);
    toast.error(error.message);
  }
};
/* ---------------------------------- */

export {
  placeOrder,
  placeOrderStripe,
  placeOrderRazorpay,
  allOrders,
  userOrders,
  updateStatus,
  verifyStripe
};
