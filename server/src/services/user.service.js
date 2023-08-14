const {User} = require('../models');

const queryUsers=async(req,res)=>{

    const users= User.find({})
    return users;

}
module.exports={
    queryUsers
}