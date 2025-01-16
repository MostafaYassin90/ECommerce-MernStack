import express from "express";
import cors from "cors";
import userRoute from "./routes/userRoute.js";
import connectDB from "./config/mongoDB.js";
import connectCloudinary from "./config/cloudinary.js";
import productRouter from "./routes/productRoute.js";
import cartRouter from "./routes/cartRoute.js";
import orderRouter from "./routes/orderRoute.js";
import "dotenv/config";


// App Config
const app = express();
const port = 4000;

// Connect DB
connectDB();
connectCloudinary();

// MiddleWare
app.use(express.json());
app.use(cors());

// Routes
app.use("/api/users", userRoute);
app.use("/api/products", productRouter);
app.use("/api/cart", cartRouter);
app.use("/api/order", orderRouter);


app.use("/", (req, res) => {
  res.send("API Working.");
});


// Running Server
app.listen(port, () => {
  console.log("Server Is Working.");
});