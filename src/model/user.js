
const mongoose = require('mongoose')
const validator = require('validator') 
const User = mongoose.model('User',{
    name:{
        type:String,
        required:true
    },
    age:{
        type:Number,
        validate(value){
            if(value < 0){
                throw new Error("the age must be more than posotive Number");
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
        validate(value){
            if(value.includes('password')){
                throw new Error("you have to write your password")
            }
        }
    }

})


module.exports = User