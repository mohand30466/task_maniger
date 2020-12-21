const express = require("express");
const User = require("../model/user");
const auth = require("../middleware/auth");

const router = new express.Router();

const app = express();
app.use(express.json());

app.use(router);

router.post("/users", async (req, res) => {
  const user = new User(req.body);
  try {
    await user.save();
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

module.exports = router;
