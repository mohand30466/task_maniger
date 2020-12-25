const express = require("express");
const User = require("../model/user");
const auth = require("../middleware/auth");
const multer = require("multer")
const sharp = require("sharp")
const {swelcomeMail,sdeleteMail} = require("../emilaccount/account")

const router = new express.Router();

const app = express();
app.use(express.json());

app.use(router);

router.post("/users", async (req, res) => {
  const user = new User(req.body);
  try {
    await user.save();
    swelcomeMail(user.email,user.name)

    const token = await user.generateAuthToken();
    res.send({ user, token });
  } catch (error) {
    res.status().send();
  }
});

router.post("/users/login", async (req, res) => {
  try {
    const user = await User.findByCredentials(
      req.body.email,
      req.body.password
    );
    const token = await user.generateAuthToken();

    res.send({ user, token });
  } catch (e) {
    res.status().send("unable to log in");
  }
});

router.post("/users/logout", auth, async (req, res) => {
  try {
    req.user.tokens = req.user.tokens.filter((token) => {
      return token.token == req.token;
    });

    await req.user.save();

    res.send();
  } catch (error) {
    res.status().send();
  }
});

router.post("/users/logoutAll", auth, async (req, res) => {
  try {
    req.user.tokens = [];
    await req.user.save();
    res.send();
  } catch (error) {
    res.status().send();
  }
});

router.get("/users/me", auth, async (req, res) => {
  res.send(req.user);
});

router.get("/users", async (req, res) => {
  try {
    const user = await User.find({});
    res.send(user);
  } catch (error) {
    res.status().send();
  }
});

router.delete("/users/me", auth, async (req, res) => {
  try {

    await req.user.remove();
    sdeleteMail(user.email,uaer.name)

    res.send(req.user);
  } catch (error) {
    res.status(500).send();
  }
});

router.patch("/users/me",auth, async (req, res) => {
  const update = Object.keys(req.body);
  const allowedupdate = ["name", "email", "age"];
  const isallowed = update.every((update) => {
    return allowedupdate.includes(update);
  });
  if (!isallowed) {
    res.status(404).send("invalid key update");
  }
  try {
    update.forEach((el) => (req.user[el] = req.body[el]));
    await req.user.save();
  
    res.send(req.user);
  } catch (error) {
    res.status(404).send();
  }
});

const upload = multer({
  // dest:"image",
  
  limits:{
    fileSize:1000000,
   
    },
    filterfile(req,file,cb){
      if(!file.originalname.match(/\.(jpg|jpeg|png)$/)){
       return cb( new Error('please enter image file'))
      }
      cb(undefined,true)}
})
router.post('/user/me/avatar',auth,upload.single('upload'), async (req,res)=>{
  const buffer = await sharp(req.file.buffer).resize({width:250,height:250}).png().toBuffer()

  req.user.avatar = buffer
  await req.user.save()
  res.send(req.user)
},(res,req,error,next)=>{
  res.status(400).send({error:error.message})

})

router.delete('/user/me/avatar',auth, async (req,res)=>{

  req.user.avatar = undefined
  await req.user.save()
  res.send()
})

router.get('/user/:id/avatar',auth, async (req,res)=>{
  try {
    const user = await User.findById(req.params.id)
    if(!user||!user.avatar){
      throw new Error()
    }
    res.send('Content-Tybe', 'image/png')
    res.send(user.avatar)
    
  } catch (error) {
    res.status(500).send()
    
  }
})

module.exports = router;
