import { UnauthenticatedError } from "../errors/customError.js";
import { verifyJWT } from "../utils/tokenUtils.js";

export const authenticateUser=async(req ,res ,next)=>{
    const {token}=req.cookies;
    if(!token) throw new UnauthenticatedError('auth failed')
    try{
const {userId,role}=verifyJWT(token);
console.log({userId,role});
req.user = { userId, role };
next();
}catch(e){
throw new UnauthenticatedError('auth failed')
}
}