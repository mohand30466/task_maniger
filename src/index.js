const express = require("express");
const user = require("./router/users")
const tasks= require("./router/tasks")

require("./db/mongoose");

const app = express();

const port = process.env.PORT || 3000;

app.use(express.json());
app.use(user);
app.use(tasks);

app.listen(port, () => {
  console.log("server up to the port " + port);
});
