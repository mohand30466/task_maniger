const mongoose = require('mongoose')


mongoose.connect(process.env.CONECTTOMONGO,{
    useNewUrlParser:true,
    useCreateIndex:true
})
