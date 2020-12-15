const mongodb = require("mongodb")

const MongoClient = mongodb.MongoClient

const connectUrl = "mongodb://127.0.0.1:27017"
const mongoDataName = 'Task_manager'
MongoClient.connect(connectUrl,{useNewUrlParser:true},(error,client)=>{
   if(error){
       console.log("unable to connect");

   }

   const db = client.db(mongoDataName)
   db.collection('users').insertMany([
      { name:"mohand",
       age:"445"},
       {name:"adam",
    age:"33"},
   ])

   db.collection('task').insertMany([
      { description:"learn node js",
       completet:true},
       {description:"upload code to githup",
    completer:false},
   ])
})