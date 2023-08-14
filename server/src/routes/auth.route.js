const express =require('express')
const router=express.Router()
const {authController} =require('../controllers')
const { authValidations   } = require('../validations');
const validate =require('../middlewares/validate');
const authenticate = require('../middlewares/authenticate')

router.post('/register',validate(authValidations.register) , authController.register);

router.post('/login',validate(authValidations.login) , authController.login);

router.use(authenticate);
router.post('/send-verfication-email', authController.sendVerificationEmail);

module.exports =router;