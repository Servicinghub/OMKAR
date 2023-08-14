const {userService} =require('../services');
const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');

const queryUsers = catchAsync(async(req,res)=>{
    const users= await userService.queryUsers();
    if(users.length==0){
        throw new ApiError(httpStatus.NOT_FOUND ,'N');
    }
    res.send(users);
})
module.exports={
    queryUsers
}