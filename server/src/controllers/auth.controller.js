const {authService, tokenService,emailService} = require('../services');
const httpStatus= require('http-status');
const catchAsync = require('../utils/catchAsync');
const {User} =  require('../models');
const ApiError = require('../utils/ApiError');

// register user
const register= catchAsync(async(req,res)=>{
    const emailTaken=await User.isEmailTaken(req.body.email)
    if(emailTaken){
        throw new ApiError(httpStatus.BAD_REQUEST,'User with this email already exist.')
    }
    else{
        const user=await authService.register(req.body);
        res.status(httpStatus.CREATED).send(user)
    }
})

//login with email and password
const login = catchAsync(async(req,res)=>{
    const {email,password} = req.body
    const user = await authService.login(email,password);
    res.status(httpStatus.OK).send(user)
})

// sendVerificationEmail token
const sendVerificationEmail = catchAsync(async(req,res)=>{
    if(req.user.isEmailVerified){
     throw new ApiError(httpStatus.BAD_REQUEST,'This email is already verified')
    }
    const token=await tokenService.generateVerificationToken({_id:req.user._id});
    const emailPayload = {
        eventName:'Send verification Email',
        token:token,
        to:req.user.email,
        cc:[],
        bcc:[],
        user:req.user.name,
        subject:"send verification email",
        from:'pms@at.in'
    }
    await emailService.compile('Send verification Email',emailPayload);
    res.status(200).send('Email sent successfully')


})

module.exports={
    register,
    login,
    sendVerificationEmail
}