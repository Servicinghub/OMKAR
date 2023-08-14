const {ExtractJwt,Strategy} =require('passport-jwt')
const {User} = require('../models')
const config= require('./config')

const jwtOptions= {
    secretOrKey:config.jwts.accessTokenSecret,
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    // algorithms: ["HS256"]
}

const jwtVerify=async (payload,done)=>{
   try{
    const user=await User.findOne(payload.user);
    if(!user){
        return done(null,false);
    }
    done(null,user);
   }catch(err)
   {
    done(err,false);
   }
}

const jwtStrategy= new Strategy(jwtOptions,jwtVerify)

module.exports= jwtStrategy;