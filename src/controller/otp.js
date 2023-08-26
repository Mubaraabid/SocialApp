// controllers/otpController.js
import otpGenerator from "otp-generator";
import OTPModel from "../model/otp.js";
import mail from "../email/auth/login.mail.js";

const OTPController={
 sendotp: async (req, res) => {
  try {
    const email = req.body.email;
    const name=req.body.name;
    console.log(email);

    let otp = otpGenerator.generate(4, {
      upperCaseAlphabets: false,
      lowerCaseAlphabets: false,
      specialChars: false,
    });
    mail.signupmail(name,email,otp);
    const otpPayload = { email, otp };

    const otpBody = await OTPModel.create(otpPayload);
    res.status(200).json({
      success: true,
      message: 'OTP sent successfully',
      otpBody,
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ success: false, error: error.message });
  }
},
}

export default OTPController;