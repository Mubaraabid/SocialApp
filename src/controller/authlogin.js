import userModel from "../model/user.js";
import bcryptjs from "bcryptjs";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import mail from "../email/auth/login.mail.js";
dotenv.config()
const jwtsecretkey=process.env.SECRETKEY;
const authController={

login: async (req, res) => {
    const name=req.body.name;
    const email=req.body.email;
    const password=req.body.password;
    const role=req.body.role;

    const verify = await userModel.findOne({name, email, role});
    if (!verify)
    {
        return res.status(401).json({message: "invalid credentials"});
    }
    const checkpassword = bcryptjs.compareSync(password, verify.password);
    if (!checkpassword)
    {  
       return res.status(401).json({ message: "invalid credentials" });
    }
    if (role=="user")
    {
    const data={
      name:verify.name,
      email:verify.email,
      password:verify.password,
      role:verify.role,
    }
    mail.loginmail(name, email);
  const token = jwt.sign(data,jwtsecretkey,{algorithm:"HS256", expiresIn:"24h"});
   return  res.status(200).json({message:"User login successfully",data, token});
  }
  if (role=="admin"){
    const data={
    name:verify.name,
    email:verify.email,
    password:verify.password,
    role:verify.role,
  }
  mail.loginmail(name,email);
  const token = jwt.sign(data,jwtsecretkey,{algorithm:"HS256", expiresIn:"24h"});
  console.log(token); 
  return  res.status(200).json({message:"admin login successfully",data, token}); 
}
      return res.status(401).json({message:"Invalid credentials"});
  }
};
export default authController;

