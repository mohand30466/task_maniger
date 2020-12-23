const express = require("express")
const Task = require("../model/task");
const auth = require("../middleware/auth")


const router = new express.Router()

const app = express()
app.use(express.json());

app.use(router)

router.post("/task",auth,async (req, res) => {
    const user = new Task({
        ...req.body,
        owner:req.user._id
    });
    try {
        await user.save()
        res.send(user)
        
    } catch (error) {
        res.status(500).send()
        
    }
  });
  
  router.get("/task",auth,async (req, res) => {
      try {
          const user = await Task.find({owner:req.user._id})
        // req.user.populate({
        //     path:'tasks',
        //     match:{
        //         completed:true
        //     }

        // }).exactPopulate()
        //   res.send(req.user.tasks)
        res.send(user)
          
      } catch (error) {
          res.status(500).send()
          
      }
   
  });
  
  router.get("/task/:id",auth,async (req, res) => {
      const _id = req.params.id
    try {
        const user = await Task.findById({_id, owner:req.user._id})
        if(!user){
            res.status(500).send()
        }
        res.send(user)
        
    } catch (error) {
        res.status(500).send()
        
    }
    });
  
 
  
    router.patch("/task/:id",auth, async(req, res) => {
      const update = Object.keys(req.body)
     const allowedupdate = ["description","completed"]
     const isallowed = update.every((update)=>{
         return allowedupdate.includes(update)
     })
     if(!isallowed){
         res.status(404).send("invalid key update")
     }
     try {
         const task = await Task.findOne({_id:req.params.id,owner:req.user.id})
      if(!task){
          return res.status(404).send()
      }
      update.forEach((updat)=>task[updat] = req.body[updat])
      await task.save()
      res.send(task)
      
  } catch (error) {
      res.status(404).send()
      
  }
  
  })
  router.delete("/task/:id",auth,async (req, res) => {
  
    try {
        const task = await Task.findByIdAndDelete({_id:req.params.id,owner:req.user.id})
          if(!task){
              res.status(404).send()
          }
          task.remove()
        res.send(task)
        
    } catch (error) {
        res.status(500).send()
        
    }
    });
  
  module.exports = router