import userModel from "../model/user.js";
import bcryptjs from "bcryptjs";
import OTPModel from "../model/otp.js";
const UserController = {

  getAlluser: async (req, res) => {
    const search = req.body.search;
    const { page = 1, limit = 5 } = req.query;
    try {
      const usersearch = await userModel.find({
        $or: [
          { name: { $regex: search, $options: 'i' } },
          { email: { $regex: search, $options: 'i' } }
        ]
      }).limit(limit * 1).skip((page - 1) * limit).exec();
      console.log(usersearch);
      const count = await userModel.countDocuments({
        $or: [
          { name: { $regex: search, $options: 'i' } },
          { email: { $regex: search, $options: 'i' } }
        ]
      });
  
      const totalPages = Math.ceil(count / limit);
      return res.json({usersearch,totalPages,currentPage: page});
    } catch (error) {
      console.error(error);
    }
  },

  getAll: async (req, res) => {
    // const users = await userModel.find();
    // return res.json(users);
    const { page = 1, limit = 5 } = req.query;
  
    try {
      const users = await userModel.find().limit(limit * 1).skip((page - 1) * limit).exec(); 
      const count = await userModel.countDocuments();
      const totalPages = Math.ceil(count / limit);
      res.json({users,totalPages, currentPage: page});
    } catch (err) {
      console.error(err.message);
    }
  },
  
  getSingle: async (req, res) => {
    const { id } = req.params;
    const user = await userModel.findById(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    return res.json(user);
  },

  signup: async (req, res) => {
    const name=req.body.name;
    const email=req.body.email;
    const Password=req.body.password;
    const role=req.body.role;
    const otp=req.body.otp;
       
    const response = await OTPModel.find({ email }).sort({ createdAt: -1 }).limit(1);
    if (response.length === 0 || otp !== response[0].otp) {
      return res.status(400).json({
        success: false,
        message: 'The OTP is not valid',
        });
        }

    const password= await bcryptjs.hash(Password,12);
    console.log(password);
    if (role=="user")
    {
    const user = await userModel.create({name,email,password,role});
    return res.json({ message: "User created successfully", user });
    }
    else{
      const admin=await userModel.create({name,email,password,role});
      return res.json({message:"Admin created successfully", admin});
    }
  },

  update: async (req, res) => {
    const body = req.body;
    const id = req.params.id;
    const user = await userModel.findById(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    user.name = body.name;
    user.email = body.email;
    await user.save();
    return res.status(200).json({ message: "User Updated successfully", user });
  },

  delete: async (req, res) => {
    const id=req.params.id;
    const user = await userModel.findById(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const del=await userModel.deleteOne({_id: id});
    return res.json({ message: "user deleted successfully",del });
  },
  
};

export default UserController;
