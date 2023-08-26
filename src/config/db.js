import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
const connectDB = async () => {
  const uri = process.env.URI;
  mongoose
    .connect(uri, {
      autoCreate: true,
      autoIndex: true,
    })
    .then((res) => {
      console.log("Connected db connection");
    })
    .catch((err) => {
      console.log("Error connecting db connection", err);
    });
};

export default connectDB;