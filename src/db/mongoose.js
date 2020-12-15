const mongoose = require('mongoose')


mongoose.connect('mongodb://127.0.0.1:27017/task_managerApi',{
    useNewUrlParser:true,
    useCreateIndex:true
})
const Task = mongoose.model('task',{
    description:{
        type:String,
        
    },
    completed:{
        type:Boolean
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
        type:Number
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }

})

const me = new User({
    name:"mohand",
    age:88,
    email:"moji@io.com"
    ,password:"12345a"

    
})
  me.save().then((result) => {
  
    console.log(me);
    
}).catch((err) => {
    console.log("there is err" + err);
})

