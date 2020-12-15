const express = require("express")
const Task = require("../model/task");


const router = new express.Router()

const app = express()
app.use(express.json());

app.use(router)

router.post("/task",async (req, res) => {
    const user = new Task(req.body);
    try {
        await user.save()
        res.send(user)
        
    } catch (error) {
        res.status(500).send()
        
    }
  });
  
  router.get("/task",async (req, res) => {
      try {
          const user = await Task.find({})
          res.send(user)
          
      } catch (error) {
          res.status(500).send()
          
      }
   
  });
  
  router.get("/task/:id",async (req, res) => {
      const _id = req.params.id
    try {
        const user = await Task.findById(_id)
        if(!user){
            res.status(500).send()
        }
        res.send(user)
        
    } catch (error) {
        res.status(500).send()
        
    }
    });
  
    router.delete("/task/:id",async (req, res) => {
  
    try {
        const user = await Task.findByIdAndDelete(req.params.id)
          if(!user){
              res.status(404).send()
          }
        res.send(user)
        
    } catch (error) {
        res.status(500).send()
        
    }
    });
  
    router.patch("/task/:id", async(req, res) => {
      const update = Object.keys(req.body)
     const allowedupdate = ["name","email","address","age"]
     const isallowed = update.every((update)=>{
         return update.includes(allowedupdate)
     })
     if(!isallowed){
         res.status(404).send("invalid key update")
     }
     try {
      const user = await User.findByIdAndUpdate(req.params.id,req.body,{new:true,runValidators:true})
      if(!user){
          return res.status(404).send()
      }
      res.send(user)
      
  } catch (error) {
      res.status(404).send()
      
  }
  
  })
  
  module.exports = router