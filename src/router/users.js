const express = require("express")
const User = require("../model/user");


const router = new express.Router()

const app = express()
app.use(express.json());

app.use(router)

router.post("/users",async (req, res) => {
    const user = new User (req.body);
    try {
        await user.save()
        res.send(user)
        
    } catch (error) {
        res.status(500).send()
        
    }
  });
  
  router.get("/users",async (req, res) => {
      try {
          const user = await User.find({})
          res.send(user)
          
      } catch (error) {
          res.status(500).send()
          
      }
   
  });
  
  router.get("/users/:id",async (req, res) => {
      const _id = req.params.id
    try {
        const user = await User.findById(_id)
        if(!user){
            res.status(500).send()
        }
        res.send(user)
        
    } catch (error) {
        res.status(500).send()
        
    }
    });
  
    router.delete("/users/:id",async (req, res) => {
  
    try {
        const user = await User.findByIdAndDelete(req.params.id)
          if(!user){
              res.status(404).send()
          }
        res.send(user)
        
    } catch (error) {
        res.status(500).send()
        
    }
    });
  
    router.patch("/users/:id", async(req, res) => {
      const update = Object.keys(req.body)
     const allowedupdate = ["name","email","address","age"]
     const isallowed = update.every((update)=>{
         return allowedupdate.includes(update)
     })
     if(!isallowed){
         res.status(404).send("invalid key update")
     }
     try {
         const user = await User.findByIdAndUpdate(req.params.id)
         update.forEach((el)=>user[el]=req.body[el])
         await user.save()
      if(!user){
          return res.status(404).send()
      }
      res.send(user)
      
  } catch (error) {
      res.status(404).send()
      
  }
  
  })
  
  module.exports = router