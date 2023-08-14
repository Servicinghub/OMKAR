const express = require('express')
const router = express.Router()
const authRoute = require('./auth.route')
const userRoute = require('./user.route')


const defaultRoutes = [{
    path: '/auth',
    route: authRoute
},{
    path: '/user',
    route: userRoute
},
];
defaultRoutes.forEach(({ path, route }) => {
    router.use(path, route)
});

module.exports = router;