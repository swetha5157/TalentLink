import { StatusCodes } from "http-status-codes";
import User from '../models/userModel.js'
import { UnauthenticatedError } from "../errors/customError.js";
import { comparePassword, hashPassword } from "../utils/passwordUtil.js";
import { createJWT } from "../utils/tokenUtils.js";
export const register=async(req,res)=>{
    const isFirstAcc=await User.countDocuments()===0
    req.body.role=isFirstAcc?'admin':'user';
    const hashedPassword=await hashPassword(req.body.password)
    req.body.password=hashedPassword;

    await User.create(req.body);
    res.status(StatusCodes.CREATED).json({msg:'User created'});
}

export const login = async (req, res) => {
  const user = await User.findOne({email:req.body.email});
  const isValidUser = user && (await comparePassword(req.body.password, user.password));
  if(!isValidUser) throw new UnauthenticatedError('invalid credentials');
  const token = createJWT({userId:user._id,role:user.role});
  const oneDay = 1000*60*60*24;
  res.cookie('token',token,{
    httpOnly:true,
    expires:new Date(Date.now()+oneDay),
    secure:process.env.NODE_ENV === 'production',
  });
 res.status(StatusCodes.OK).json({ msg: "user logged in successfully" });
};