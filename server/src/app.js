const express = require('express');
const routes = require('./routes');
const helmet = require('helmet');
const cors = require('cors');
const {morgan,logger} = require('./config');
const passport = require('passport');
const jwtStrategy = require('./config/passport');
const ApiError = require('./utils/ApiError');
const httpStatus = require('http-status');
const { errorFormater,errorHandler } = require('./middlewares/error');
const compression = require('compression')
const app = express();

app.use(morgan.successHandler);
app.use(morgan.errorHandler);

app.use(helmet());

app.use(express.json());

app.use(express.urlencoded({extended : true}));

app.use(compression())

app.use(cors());
app.options('*',cors);

app.use(passport.initialize());
passport.use('jwt',jwtStrategy);

app.use('/',routes);
app.use((req,res,next)=>{
    next(new ApiError(httpStatus.NOT_FOUND,'Not Found'));
});

app.use(errorFormater);
app.use(errorHandler);

module.exports = app;