import { UnauthenticatedError } from "../errors/customError.js";
import { verifyJWT } from "../utils/tokenUtils.js";

export const authenticateUser=(req ,res ,next)=>{
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

export const authorizePermissions = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      throw new UnauthorizedError("Unauthorized to access this route");
    }
    next();
  };
};