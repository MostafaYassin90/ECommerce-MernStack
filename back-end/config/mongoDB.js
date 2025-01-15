import mongoose from "mongoose";


const connectDB = async () => {
  try {
    await mongoose.connect(`${process.env.MONGODB_URL}`);
    console.log("Connection Stublished.");

  } catch (error) {
    console.log(`Failed To Connect MongoDB => ${error}`);
  }
};

export default connectDB;