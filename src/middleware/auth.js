const jwt = require("jsonwebtoken")
const User = require("../model/user")


const auth = async (req,res,next)=>{
try {
    const token = await req.header('authorization').replace('Bearer ','')
    const coded = jwt.verify(token,process.env.AUTHTOKEN)
    const user = await User.findOne({_id:coded._id,"tokens.token":token})

    if(!user){
        throw new Error()
    }
    req.token 
    req.user = user
    next()
    
} catch (error) {
    res.status(500).send({error:"please enter the correct token"})
    
}
   
}
module.exports = auth