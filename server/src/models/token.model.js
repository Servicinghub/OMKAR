const mongoose =require('mongoose');
const {tokenTypes} = require('../config/token')

const tokenSchema = mongoose.Schema({
    token:{
        type: String,
        trim: true,
        required: true,
        index:true
    },
    refreshToken:{
        type: String,
        trim: true,
    },
    user:{
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'User',
        required: true
    },
    accessType:{
        type:String,
        enum:[
            tokenTypes.ACCESS,
            tokenTypes.RESET_PASSWORD,
            tokenTypes.TFA
        ]
    },
    expires:{
        type:Date,
        required:true
    }
},{
    timestamps:true
}
)

tokenSchema.methods.isExpired = async function(){
    return new Date(this.expires) < new Date()
}

const Token = mongoose.model('Token',tokenSchema);

module.exports = Token;