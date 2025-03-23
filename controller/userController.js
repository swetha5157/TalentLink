import { StatusCodes } from "http-status-codes";
import User from '../models/userModel.js'
import Job from "../models/jobModel.js"

export const getCurrentUser=async(req,res)=>{
   const userWithoutPassword = await User.findOne({
     _id: req.user.userId,
   }).lean();
   delete userWithoutPassword.password;
   res.status(200).json({ user: userWithoutPassword });
}

export const getApplicationStats = async (req, res) => {
    const users=await User.countDocuments();
    const jobs=await Job.countDocuments();
  res.status(StatusCodes.OK).json({users,jobs });
};

export const updateUser = async (req, res) => {
    const obj={...req.body};
    delete obj.password;
    const updatedUser=await User.findByIdAndUpdate(req.user.userId,obj);
  res.status(StatusCodes.OK).json({ msg:'update user'});
};