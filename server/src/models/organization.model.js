const mongoose = require('mongoose');

const orgSchema = mongoose.Schema({
    name:{
        type:String,
        trim:true,
    },
    email:{
        type:String,
        trim:true,
        required: true,
        lowercase:true
    },
    address:{
        type:String,
        trim:true,
    },
    // phone:{
    //     type:mongoose.Types.phone
    // },
    _createdBy:{
        type:mongoose.Types.ObjectId,
        ref:'User'
    }
},{
    timestamps:true
})

orgSchema.statics.isEmailTaken=async function(email,excludeOrg){
   const org= await this.findOne({email,_id:{$ne:excludeOrg}});
   return !!org;
}

const Org= mongoose.model('organizaion',orgSchema);
module.exports = Org;