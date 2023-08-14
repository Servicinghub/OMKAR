const mongoose=require('mongoose');
const app=require('./app');
const {config,logger}= require('./config');
logger.info(`Node Environment => ${config.env}`)
let server; 
mongoose.set('strictQuery', false);
mongoose.connect(config.mongoose.url,config.mongoose.options,{
    useNewUrlParser: true,
    useUnifiedTopology: true
  }).then((db)=>{
server=app.listen(config.port,()=>{
    logger.info(`connected to port ${config.port}` )
});
});

// handle uncaughtError an unhandledRejection and close ther server
const exitHandler=(error)=>{
    logger.error(error);
    if(server){
        server.close(()=>{
          logger.info('Server Closed');
          process.exit(1);
        });
    }else {
        process.exit(1);
    }
};

//listen to uncaughtException and unhandledRejection
process.on('uncaughtException',exitHandler);
process.on('unhandledRejection',exitHandler);

// close the server on command(kill,pkill) received 
process.on('SIGTERM',()=>{
    logger.info('sigterm received')
    if(server){
        server.close();
    }
})

