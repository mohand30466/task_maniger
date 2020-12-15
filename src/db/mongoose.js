const mongoose = require('mongoose')
const validator = require('validator')


mongoose.connect('mongodb://127.0.0.1:27017/task_managerApi',{
    useNewUrlParser:true,
    useCreateIndex:true
})
const Task = mongoose.model('task',{
    description:{
        type:String,
        trim:true,
        require:true
        
    },
    completed:{
        type:Boolean,
        default:false
    }
})

const mytask = new Task({
    description:"this is my node js course",
    completed:true
})
mytask.save().then(()=>{
    console.log(mytask);
}).catch((err)=>{
    console.log("some thing went wrong");


})

  

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

const me = new User({
    name:"mohand",
    age:8,
    email:"moji@"
    ,password:"12345a"

    
})
  me.save().then(() => {
  
    console.log(me);
    
}).catch((err) => {
    console.log("there is err" + err);
})

