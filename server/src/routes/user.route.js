const express= require('express');
// const authenticate  = require('../middlewares/authenticate');
const router = express.Router();
const {userController} =require('../controllers');

// router.route(authenticate);
router.
route('/').get(userController.queryUsers);

module.exports=router;