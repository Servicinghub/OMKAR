const { config } = require("dotenv");
const httpStatus = require("http-status");
const mongoose = require("mongoose");
const { logger } = require("../config");
const GotError = require("../utils/ApiError");

const errorFormater =(err,req,res,next)=>{
if(!(err instanceof GotError)){
 const statusCode = err.statusCode || err instanceof mongoose.Error ? httpStatus.BAD_REQUEST : httpStatus.INTERNAL_SERVER_ERROR;
 const message = err.message || httpStatus[statusCode];
 next(new GotError(statusCode,message,false,err.stack));
}
next(err);
}

const errorHandler=(err,req,res,next)=>{
    let {statusCode,message,isOperational}=err;
    if(config.env === 'production' && !isOperational){
        statusCode = httpStatus.INTERNAL_SERVER_ERROR;
        message = httpStatus[statusCode];
    }
    res.locals.errorMessage=err.message;
    const response ={
        code: statusCode,
        message,
        ...(config.env== 'development' && {stack: err.stack}),
    };
    if(config.env === 'development'){
        logger.error(err)
    }
    res.status(statusCode).send(response);
};

module.exports = {
errorFormater,
errorHandler
}