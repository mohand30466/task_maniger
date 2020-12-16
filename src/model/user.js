const mongoose = require('mongoose')
const validator = require('validator') 
const bcrypt = require('bcryptjs');
const { response } = require('express');

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
        nimlength:7,
        trim:true,
        validate(value){
            if(value.includes('password')){
                throw new Error("you have to write your password")
            }
        }
    }
})

userSchema.pre('save', async function(next){
    const user = this
    if(user.isModified('password')){
        return user.password = await bcrypt.hash(user.password, 8)
    }
    next()
})


const User = mongoose.model('User', userSchema)


module.exports = User