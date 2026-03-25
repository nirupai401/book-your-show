const { AuthenticationError, NotFoundError,AuthorizationError } = require("../core/ApiError");
const jwt=require('jsonwebtoken');
const User=require('../models/User');

const JWT_SECRET=process.env.JWT_SECRET;

 const isLoggedIn= (req,res,next)=>{
 const authorizationHeader=req.header('Authorization');
 if(!authorizationHeader)
{
    throw new AuthenticationError('you must be logged in to access this resource');
}
 const token = authorizationHeader.split(" ")[1];

   try {
    const { userId } = jwt.verify(token, JWT_SECRET);
    req.userId = userId;
    next();
  } catch (err) {
    throw new AuthenticationError("Invalid or expired token");
  }
 }

 const isPartner=async(req,res,next)=>{
    const {userId}=req;
     const user= await User.findById(userId);
     if(!user){
      throw new NotFoundError('user not found');
     }
     if(user.role !=="PARTNER"){
      throw new AuthorizationError('you do not have required access to this resource');
     }
   next();
 }

 module.exports={
    isLoggedIn,
    isPartner
 }