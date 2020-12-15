const express = require('express')

const app = express()
const port = process.env.port || 300

app.post("/users",async (req,res)=>{
    try {
        const users = await req.query
        if(!users){
            res.send("please add users information")
        }
        users.save()
        res.send(users)
        console.log(users);
        
    } catch (error) {
        res.status(400).send()
        
    }
})

app.listen(()=>{
    console.log("server is up to data in port" + port);

})
