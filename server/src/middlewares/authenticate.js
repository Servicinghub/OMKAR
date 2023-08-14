const passport =require('passport')
const ApiError =require('../utils/ApiError')
const httpStatus = require('http-status')
const { resolve } = require('path')

const callback=(req,resolve,reject)=>{
  return  (err,user,info)=>{
        if(err || !user ||info){
            reject( new ApiError(httpStatus.UNAUTHORIZED,'authentication required'))
        }
        if(user.deleted){
            reject( new ApiError(httpStatus.UNAUTHORIZED,'this user has been deleted'))
        }
    
        req.user=user;
        resolve()
    
    }
}
const authenticate=(req,res,next)=>{
 return new Promise((resolve,reject)=>{
    passport.authenticate('jwt',{session:false},callback(req,resolve,reject))(req,res,next)
 }).then(()=> next() ).catch((err)=> next(err) ); 
}
module.exports=authenticate;