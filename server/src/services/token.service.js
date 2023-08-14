const jwt = require('jsonwebtoken');
const { jwts } = require("../config/config");
const moment = require('moment');
const {tokenTypes} = require('../config/token')
 
// console.log(token.tokenTypes.ACCESS);

const generateAuthToken = (userId)=>{
    const expTime=moment().add(jwts.accessExpirationMin, "minutes");
    const token= generateToken(userId,expTime,tokenTypes.ACCESS);
    return token
}

const generateVerificationToken = (userId)=>{
    const expTime=moment().add(jwts.verifyEmailExpMin, "minutes");
    const token= generateToken(userId,expTime,tokenTypes.VERIFY_EMAIL);
    return token
}

const generateToken = (userId,expTime,type)=>{
    const jwtPayload={
        user:userId,
        exp:expTime.unix(),
        iat:moment().unix(),
        type,
    }
    return jwt.sign(jwtPayload,jwts.accessTokenSecret)
}



module.exports={
    generateAuthToken,
    generateVerificationToken
}