const mongoose = require('mongoose');
const bycrypt =require('bcrypt')


const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    _org: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'organizaion'
    },
    email: {
        type: String,
        trim: true,
        unique: true,
        required: true,
        lowerCase: true,
    },
    password: {
        type: String,
        required: true,
        trim: true,
        private: true,
        minLength:8,
        validate(value){
           if(!value.match(/\d/) || !value.match(/[A-Z]/) ||!value.match(/[a-z]/) || !value.match(/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/))
            throw new Error("Passward should have one number, one upercase letter,one lowercase letter and one special character ")
        }
    },
    tfa:{
       type: Boolean,
       default: false    
    },
    // phone:{
    //     type:mongoose.Types.phone
    // },
    isEmailVerified: {
        type: Boolean,
        default: false
    }
},{
    timestamps:true
})

userSchema.pre('save',async function (next){
    const user =this;
    if(user.isModified('password')){
        console.log('password');
        user.password=await bycrypt.hash(user.password,8);
    }
    next();
})

//works on schema
userSchema.statics.isEmailTaken=async function(email,excludeUserId){
    const user=await this.findOne({email,_id:{$ne:excludeUserId}});
    return !!user;
}

//works on doc
userSchema.methods.doesPasswordMatch= async function(password){
 return await bycrypt.compare(this.password,password)
}

const User=mongoose.model('User',userSchema);
module.exports = User;

