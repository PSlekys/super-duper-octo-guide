const express = require("express");
const bp = require("body-parser");
const cors = require("cors");
const { v4: uuidv4 } = require("uuid");

const app = express();
app.use(bp.json());
app.use(cors());

const tasks = [];
const users = [];

app.post("/register", (req, res) => {
  if (req.body.email && req.body.pass) {
    if (
      users.some((x) => x.email.toLowerCase() === req.body.email.toLowerCase())
    ) {
      res.status(400).send({ status: "email already exists" });
    } else {
      const randomId = uuidv4();
      users.push({ id: randomId, email: req.body.email, pass: req.body.pass });
      res.send({ status: "registration OK" });
    }
  } else {
    res.status(400).send({ status: "incorrect data" });
  }
});

app.post("/login", (req, res) => {
  if (req.body.email && req.body.pass) {
    const user = users.find(
      (v) =>
        v.email.toLowerCase() === req.body.email.toLowerCase() &&
        v.pass === req.body.pass
    );
    if (user) {
      res.send({ status: "OK", userid: user.id });
    } else {
      res.status(400).send({ status: "incorrect email or password" });
    }
  } else {
    res.status(400).send({ status: "incorrect data" });
  }
});

app.get("/tasks/:id", (req, res) => {
  res.send(tasks.filter((x) => x.userid === req.params.id).map((v) => v.todo));
});

app.post("/addtask", (req, res) => {
  if (req.body.userid && req.body.content) {
    tasks.push({ userid: req.body.userid, todo: req.body.content });
    res.send({ status: "OK" });
  } else {
    res.status(400).send({ status: "incorrect data" });
  }
});

app.listen(5000, () => console.log("it works"));
