const mongodb = require("mongodb")
const {MongoClient,ObjectID} = mongodb

const connectUrl = "mongodb://127.0.0.1:27017"
const mongoDataName = 'Task_manager'
const id = new ObjectID
console.log(id);
console.log(id.getTimestamp());
MongoClient.connect(connectUrl,{useNewUrlParser:true},(error,client)=>{
   if(error){
       console.log("unable to connect");

   }

   const db = client.db(mongoDataName)
   db.collection('users').insertMany([
      { _id:id,
         name:"mohand",
       age:"445"},
       {name:"adam",
    age:"33"},
   ]).then((data)=>{
      if(!data){
         console.log("there is err");
      }
      console.log(data);
   })

   db.collection('task').insertMany([
      { description:"learn node js",
       completet:true},
       {description:"upload code to githup",
    completer:false},
   ])
})