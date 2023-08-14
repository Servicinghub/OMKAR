const morgan =require('morgan');
const config =require('./config');
const logger = require('./logger')

morgan.token('message',(req,res)=> res.locals.errrorMessage || "");

const getIpFormat=()=>(config.env == "production"? ':remote-addr -':'');

const successRespnseFormat= `${getIpFormat()}:method :url :status - :response-time ms`;
const errorRespnseFormat= `${getIpFormat()}:method :url :status - :response-time ms message: :message`;

const successHandler= morgan(successRespnseFormat,{
    skip:(req,res)=> res.statusCode >= 400,
    stream: { write: (message)=> logger.info(message.trim())}
})
const errorHandler= morgan(errorRespnseFormat,{
    skip:(req,res)=> res.statusCode < 400,
    stream: { write: (message)=> logger.error(message.trim())}
})

module.exports={
    successHandler,
    errorHandler
}