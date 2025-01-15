import { z } from "zod";
import UserModel from './../models/userModel.js';
import bcrybt from "bcrypt";
import jwt from "jsonwebtoken";

/* --------------------- Gnerate Token -------------------- */
// Generate Token 
const generateToken = (payload) => {
  return jwt.sign(payload, process.env.SECRET_KEY);
};
/* -------------------------------------------------------- */


/* ------------------------**----------------------------- */
// User Register 
const registerUser = async (req, res) => {
  const data = await req.body;

  // Schema 
  const schema = z.object({
    username: z.string({ required_error: "Username Is Required." }).min(2, { message: "Username Must Be At Least 2 Characters." }).max(200),
    email: z.string({ required_error: "Email Is Required." }).min(1, { message: "Email Is Required." }).email({ message: "Invalid Email." }),
    password: z.string({ required_error: "Password Is Required." }).min(6, { message: "Password Must Be At Least 6 Character." }).max(300)
  });

  const validation = schema.safeParse(data);

  if (!validation.success) {
    return res.status(400).json({ message: validation.error.errors[0].message });
  }

  // Checking If User Exists Or No
  const isUserExists = await UserModel.findOne({ email: data.email });

  if (isUserExists) {
    return res.status(400).json({ message: "Email Has Already Been Token." });
  };

  // Hashed Password
  const salt = await bcrybt.genSalt(10);
  const hashedPassword = await bcrybt.hash(data.password, salt);

  // Generate User User
  const newUser = new UserModel({
    username: data.username,
    email: data.email,
    password: hashedPassword
  });
  const user = await newUser.save();

  // Generate Token 
  const userJwtPayload = {
    id: user._id,
    username: user.username,
    email: user.email,
    isAdmin: user.isAdmin
  };

  const token = generateToken(userJwtPayload);

  // Destructuring User To UnSelect Password
  const { password, ...other } = user._doc;
  return res.status(201).json({ user: { ...other, token } });
};

/* ------------------------**----------------------------- */
// User Login
const loginUser = async (req, res) => {

  try {
    const data = await req.body; // {email: a@gmail.com, password: "123456"}

    const schema = z.object({
      email: z.string({ required_error: "Email Is Required." }).min(1, { message: "Email Is Required." }).email({ message: "Invalid Email." }),
      password: z.string({ required_error: "Password Is Required." }).min(6, { message: "Password Must Be At Least 6 Characters." }).max(300)
    });

    const validation = schema.safeParse(data);

    if (!validation.success) {
      return res.status(400).json({ message: validation.error.errors[0].message });
    };

    // Check Is Email Exist Or No
    const findEmail = await UserModel.findOne({ email: data.email });

    if (!findEmail) {
      return res.status(400).json({ message: "Email Or Password Is Wrong." });
    };

    // Compare HahedPassword With Login Password
    const comparePassword = await bcrybt.compare(data.password, findEmail.password);

    if (!comparePassword) {
      return res.status(400).json({ message: "Email Or Password Is Wrong." });
    };

    // Generate Token
    const userJwtToken = {
      id: findEmail._id,
      username: findEmail.username,
      email: findEmail.email,
      isAdmin: findEmail.isAdmin
    };

    const token = generateToken(userJwtToken);

    // Destructuring FindEmail
    const { password, ...other } = findEmail._doc;

    return res.status(200).json({ user: { ...other, token } });
  } catch (error) {
    return res.status(500).json({ message: `Internal Server ${error}` });
  }

};
/* ------------------------**----------------------------- */

/* ------------------------**----------------------------- */
// Admin Login
const adminLogin = async (req, res) => {
  try {
    const data = await req.body;
    if (data.email === process.env.ADMIN_EMAIL && data.password === process.env.ADMIN_PASSWORD) {
      const jwtPayload = {
        email: data.email,
        password: data.password
      };
      const token = jwt.sign(jwtPayload, process.env.SECRET_KEY);
      return res.status(200).json({ success: true, token });
    } else {
      return res.status(403).json({ message: "InValid Credentials" });
    }

  } catch (error) {
    return res.status(500).json({ message: `${error.message}` });
  }
};
/* ------------------------**----------------------------- */


export { registerUser, loginUser, adminLogin };