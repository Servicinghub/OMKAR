const { emailService, smtpUserName, smtpPassword, smtpHost, smtpPort } = require('../config/config');
const nodemailer = require('nodemailer');
const { loggers } = require('winston');
const eventJson = require('../event.json');
const httpStatus = require('http-status');
const handlebars = require('handlebars');
const fs = require('fs');

const compile = async(name,payload)=>{
   const eventConfig = eventJson.find((event)=>event.name==name);
   if(!eventConfig){
    throw new ApiError(httpStatus.NOT_FOUND,'event not found');
   }
   eventConfig.actions.forEach(async(action )=> {
    switch(action.type){
        case 'email':
        const template = handlebars.compile(fs.readFileSync(action.templateFile).toString())(payload);
        const subject = handlebars.compile(action.subject)(payload);
        const to=payload.to;
        const cc= payload.cc;
        const from=payload.from;
        await sendMail({
            to:to,
            cc:cc,
            html:template,
            subject:subject,
            from:from
        })
        break;

        default:
            break;
    }
    
   });
}

const transport = () => {
    switch (emailService) {
        case 'sendgrid':
            break;
        case 'smtp':
            default:
            const tp = nodemailer.createTransport({
                host: smtpHost,
                port: smtpPort,
                auth: {
                    user: smtpUserName,
                    pass: smtpPassword,
                },
            });
            // verify connection configuration
            tp.verify(function (error, success) {
                if (error) {
                    console.log(error);
                    throw new ApiError(httpStatus.BAD_REQUEST,error);

                } else {
                    // loggers.info(`connected to email server ${smtpPort}`)
                    console.log("Server is ready to take our messages");
                }
            });
            return tp;
    }
}

const sendMail=async(msg) => {
    switch(emailService){
        case 'smtp':
            await transport().sendMail(msg)
            break;
        case 'sendgrid':
            await transport.send(msg)
        }
}

module.exports={
    compile
}