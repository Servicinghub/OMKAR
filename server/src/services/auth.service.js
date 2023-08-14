const { jwts } = require("../config/config");
const {User,Org} = require("../models");
const jwt = require('jsonwebtoken');
const {generateAuthToken} =require('./token.service');
const ApiError = require('../utils/ApiError');
const httpStatus= require('http-status');

// register user
const register = async({_org,...rest})=>{
const org=await Org.create({name:_org,email:rest.email})
try{
    const user=await (await User.create({_org:org._id,...rest})).populate('_org','name _id')
    const token = generateAuthToken({_id:user._id})
    return {token,user}  
}
catch(err){
    org.remove();
    throw err;
}
}
// login with email
const login = async(email,password)=>{
  const user= await (await User.findOne({email:email})).populate({path:"_org",select:'name _id'});
  if(!user || user.deleted || !user.doesPasswordMatch(password)){
    throw new ApiError(httpStatus.BAD_REQUEST,"Incorrect email or password")
  }else{
    const token = generateAuthToken({_id:user._id})
    return {token,user}
  }
}

module.exports={
    register,
    login
}