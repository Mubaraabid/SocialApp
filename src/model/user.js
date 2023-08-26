import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: "string",
      required: true,
    },
    email: {
      type: "string",
      required: true,
    },
    password :{
      type: "string",
      required: true,
    },
    role:{
      type:"string",
      required:true
    }
  },
  { 
    timestamps: true }
);

const userModel = mongoose.model("user", userSchema);

export default userModel;
