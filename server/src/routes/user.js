const express=require('express');
const User =require('../models/User');
const router=express.Router();
const bcrypt=require('bcrypt');
const ApiResponse=require('../core/ApiResponse');
const {BadRequestError, AuthenticationError} = require('../core/ApiError');
const jwt=require('jsonwebtoken');
const { isLoggedIn } = require('../middlewares/user');



const JWT_SECRET=process.env.JWT_SECRET;
//register route
router.post('/register',async(req,res)=>{
    const {email,password,username,role} =req.body;
    //if user with this username already exist
    const user=await User.findOne({username});
    if(user){
        throw new BadRequestError('user with this username already exist');
    }
    const hash=await bcrypt.hash(password,12);
   const newUser= await User.create({email, username,password:hash,role});
    res.json(ApiResponse.build(true, {email:newUser.email,username : newUser.username,role:newUser.role},'registered successfully'))

})

router.post('/login' , async (req,res)=>{
    const {username,password}=req.body;
    const user=await User.findOne({username})
    if(!user){
        throw new BadRequestError('invalid username or password');
    }
    //we have to verify if incoming password or stored password is same
    const isValid=await bcrypt.compare(password,user.password);
    if(!isValid){
        throw new BadRequestError('invalid username or password');
    }
    //generate the token
    const token=jwt.sign({userId:user._id},JWT_SECRET,{expiresIn:'7d'});

    res.json(ApiResponse.build(true,{token :token},'logged in successfully'));
})
//fetch profile
router.get('/profile',isLoggedIn ,async(req,res)=>{
   const {userId}=req;
   const user=await User.findById(userId);
   res.json(ApiResponse.build(true,{username:user.username,email:user.email,role:user.role},'user profile details'))
})

module.exports=router;