import { response } from "express";
import UserModel from "../models/userModel.js";
import { tokenCreation } from "../utils/authToken.js";
import catchErrorAsync from "../utils/catchErrorAsync.js";
import apiErrorsModel from "../utils/clientErrorsController.js"
import { verifyToken } from "../utils/verifyToken.js";

//REGISTER
const Register = catchErrorAsync(async (req, res, next) => {
  const { name, email, password, phoneNo, bio } = req.body;
  const user = await UserModel.create({
    name,
    email,
    password,
    phoneNo,
    bio,
  });
  const token = tokenCreation(user._id);
  
  res.cookie("jwt", token, {
    expires: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
    // secure:true,
    // httpOnly:true
  });

  res.status(201).json({
    message: "success",
    data: user,
  });
});

//LOGIN
const Login = catchErrorAsync(async (req, res, next) => {
  const user = await UserModel.findOne({ email: req.body.email });
  if (!user) {
 return next( new apiErrorsModel("user not found",404))
  }
  if(!(await user.verifyPassword(req.body.password,user.password))){
   return next (new apiErrorsModel("incorrect credentials",401));
  }
  const token = tokenCreation(user._id);

  const { password, ...info } = user._doc;
  res.cookie("token",token);
  res.status(200).json({
    message: "success",
    data: info,
    token
  });

});


const protect=catchErrorAsync( async(req,res,next)=>{
  let token="";
  if(req.headers?.token.startsWith("Bearer ")){
token=req.headers.token.split(" ")[1];
  }
  if(!token){
    return next(new apiErrorsModel("not authorized",401));
  }
  const payload=await verifyToken(token);
 
  const user=await UserModel.findById(payload.id);
  if(!user) return next(new apiErrorsModel("not authorized",401));
req.user=payload.id
  next();
})

//Update user
const UpdateUser=catchErrorAsync(async(req,res,next)=>{
const id =req.params.id;
if(id!==req.id) return next(new apiErrorsModel("not authorized",401));

const updatedUser = await User.findByIdAndUpdate(id,{$set:req.body},{
  new:true
}) 
res.status(200).json({
  message:"user updated successfully",
  data:updatedUser
})


})

//Delete user
const DeleteUser=catchErrorAsync(async(req,res,next)=>{})
//Get user
const getUser=catchErrorAsync(async (req,res,next)=>{
  console.log("from getuser",req.user)
const userFind =await UserModel.findById(req.user);
if(!userFind) return next(new apiErrorsModel("not found",404));
const {password,...info}=userFind._doc
res.status(200).json(info);
}
)

//Get all users
const getAllUsers =catchErrorAsync(async()=>{})

export { Register, Login,protect,getUser,UpdateUser };
