import { UnauthenticatedError ,UnauthorizedError,BadRequestError} from "../errors/customError.js";
import { verifyJWT } from "../utils/tokenUtils.js";

export const authenticateUser=(req ,res ,next)=>{
    const {token}=req.cookies;
    if(!token) throw new UnauthenticatedError('auth failed')
    try{
const {userId,role}=verifyJWT(token);
const testUser = userId === "6800baf424ca210f8ec9c547";
// console.log({userId,role});
req.user = { userId, role ,testUser};
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

export const checkForTestUsers=(req,res,next)=>{
  if(req.user.testUser) throw new BadRequestError('Demo user. Read only!!');
  next();
}