import mongoose from "mongoose";

    const otpSchema = new mongoose.Schema({
        email: {
          type: String,
          required: true,
        },
        otp: {
          type: String,
          required: true,
        },
        createdAt: {
          type: Date,
          default: Date.now,
          expires: 60 * 5, // deleted after 5 minutes 
        },
      });

const OTPModel = mongoose.model("otp", otpSchema);

export default OTPModel;