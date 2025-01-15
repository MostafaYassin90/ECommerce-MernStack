import express from "express";
import { allOrders, placeOrder, placeOrderRazorpay, placeOrderStripe, updateStatus, userOrders, verifyStripe } from "../controllers/orderControllers.js";
import AdminAuth from "../middleware/adminAuth.js";
import userAuth from './../middleware/userAuth.js';

const orderRouter = express.Router();

// Route For Admin
orderRouter.post("/list", AdminAuth, allOrders);
orderRouter.post("/status", AdminAuth, updateStatus);

// Payment Features
orderRouter.post("/place", userAuth, placeOrder);
orderRouter.post("/stripe", userAuth, placeOrderStripe);
orderRouter.post("/rezorpay", userAuth, placeOrderRazorpay);

// Front End
orderRouter.post("/userorders", userAuth, userOrders);

// Verify Stripe
orderRouter.post("/verifyStripe", userAuth, verifyStripe);

export default orderRouter;