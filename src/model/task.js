

const mongoose = require('mongoose')
const taskSchema = mongoose.Schema({
    description:{
        type:String,
        trim:true,
        require:true
        
    },
    completed:{
        type:Boolean,
        default:false
    },
    owner:{
        type: mongoose.Schema.Types.ObjectId,
        require:true,
        ref:"User"

    }
},{
    timestamps:true
})

const Task = mongoose.model('task',taskSchema)

module.exports = Task

 
