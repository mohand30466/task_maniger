const mongoose = require('mongoose')
const validator = require('validator') 
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')

const userSchema = mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    age:{
        type:Number,
        validate(value){
            if(value < 0){
                throw new Error("age must be  posotive Number");
            }
        },
        trim:true,
    },
    email:{
        type:String,
        unique:true,
        required:true,
        trim:true,
        lowercase:true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error(" invalid email ")
            }
        }
        
    },
    password:{
        type:String,
        required:true,
        trim:true,
        nimlength:6,
        trim:true,
        validate(value){
            if(value.includes('password')){
                throw new Error("you have to write your password")
            }
        }
    },
    tokens:[{
        token:{
            type:String,
            required:true
        }
    }]
})

userSchema.methods.toJSON = function(){
    const user = this
    const userObject = user.toObject()
    delete userObject.password
    delete userObject.tokens
    return userObject
}

userSchema.methods.generateAuthToken = async function(){
    const user = this
    const token = await jwt.sign({_id:user._id.toString()},"thisismynodejscourse")
    user.tokens = user.tokens.concat({token})
    await user.save()
    return token

}

userSchema.statics.findByCredentials = async (email,password)=>{
    const user = User.findOne({email})
    if(!user){
        throw new Error("unable to connect ")
    }

     const isMatch = bcrypt.compare(user.password , password)
    if(!isMatch){
    throw new Error("unable to connect ")}


    
    return user
}

userSchema.pre('save', async function(next){
    const user = this
    if(user.isModified('password')){
        return user.password = await bcrypt.hash(user.password, 8)
    }
    next()
})


const User = mongoose.model('User', userSchema)


module.exports = User