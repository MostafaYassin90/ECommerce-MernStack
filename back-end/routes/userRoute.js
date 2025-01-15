import express from 'express';
import { registerUser, loginUser, adminLogin } from "../controllers/userControllers.js";

const userRouter = express.Router();


// Register User Route 
userRouter.post("/register", registerUser);

// Login User Route 
userRouter.post("/login", loginUser);

// Admin Login User Route 
userRouter.post("/admin", adminLogin);

export default userRouter;