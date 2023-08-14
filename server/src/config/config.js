const dotenv = require('dotenv');
const path = require('path');
const joi = require('joi');

dotenv.config({path: path.join(__dirname,'./../.env')})

const envVarsSchema = joi
  .object()
  .keys({
    NODE_ENV: joi
      .string()
      .valid("production", "development", "test")
      .required(),
    PORT: joi.number().required(),
    SITE_URL: joi.string().required().description("frontend url"), 
    MONGO_URL: joi.string().required().description("mongodb url"),
    JWT_ACCESS_SECRET:  joi.string().required().description("jwt secret key"),
    JWT_ACCESS_EXPIRATION_MIN: joi.number().default(750).description("token exxpiration time"),
    JWT_RESET_PASSWORD_EXPIRATION_MIN: joi.number().default(15).description(" reset_password token expiration time"),
    JWT_VERIFY_EMAIL_EXPIRATION_MIN: joi.number().default(15).description(" reset_password token expiration time"),
    EMAIL_SERVICE:joi.string().required().description("email provider"),
    SMTP_USER:joi.string().required().description("smtp user"),
    SMTP_PASSWORD:joi.string().required().description("smtp password"),
    SMTP_HOST:joi.string().required().description("smtp host"),
    SMTP_PORT:joi.string().required().description("smtp port"),
  })
  .unknown();

  const { value: envVars, error } = envVarsSchema
  .prefs({ errors: { label: 'key' } })
  .validate(process.env);

  if (error) {
    throw new Error(`Config validation error: ${error.message}`);
  }

  module.exports = {
    env: envVars.NODE_ENV,
    port: envVars.PORT,
    mongoose: {
      url: envVars.MONGO_URL,
      options:{
        useNewUrlParser:true,
        useUnifiedTopology:true,
      },
    },
    jwts:{
      accessTokenSecret:envVars.JWT_ACCESS_SECRET,
      accessExpirationMin: envVars.JWT_ACCESS_EXPIRATION_MIN,
      resetPasswordExpMin:envVars.JWT_RESET_PASSWORD_EXPIRATION_MIN,
      verifyEmailExpMin:envVars.JWT_VERIFY_EMAIL_EXPIRATION_MIN
    },
    emailService:envVars.EMAIL_SERVICE,
    smtpUserName:envVars.SMTP_USER,
    smtpPassword:envVars.SMTP_PASSWORD,
    smtpPort:envVars.SMTP_PORT,
    smtpHost:envVars.SMTP_HOST
  };