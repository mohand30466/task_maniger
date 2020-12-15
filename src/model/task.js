

const mongoose = require('mongoose')

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

module.exports = Task

 
