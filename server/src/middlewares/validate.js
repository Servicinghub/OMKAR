const Joi =require('joi');
const httpStatus = require('http-status');
const pick = require('../utils/pick')
const ApiError = require('../utils/ApiError')

const validate = (schema) =>(req,res,next)=>{
  const validSchema = pick(schema,['body','params','query'])
  const reqObject = pick(req,Object.keys(validSchema))
  const {value,err} = Joi.compile(validSchema).prefs({errors:{label:'key'},abortEarly:false}) 
  .validate(reqObject);
  if(err){
    const errMessage= err.details.map((detail)=> detail.message.join(', '));
    return next(new ApiError(httpStatus.BAD_REQUEST,errMessage));
  }
  Object.assign(req,value);
  return next();
};

module.exports = validate;