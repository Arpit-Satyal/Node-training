const fs = require("fs");
const express = require("express");
const app = express();
const router = new express.Router();
const path = require("path");
const map = require('./utils/map');
const PORT = process.env.PORT || 4200;

let data = JSON.parse(fs.readFileSync("data.json"));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

function writeFile(data) {
  fs.writeFile("data.json", data, (err) => {
    if (err) throw err;
  });
}

/* CRUD */

router.get("/todos", (req, res) => res.status(200).json(data));

router.post("/todos", (req, res) => {
  const { title, description, status } = req.body;
  data.push({ title, description, status });
  const newData = JSON.stringify(data);
  writeFile(newData);
  res.status(200).json(data);
});

router.put("/todos/:title", (req, res) => {
  const { title } = req.params;
  data.forEach((obj) => {
    if (obj.title === title) {
     map(req.body, obj)
    }
  });

  const updatedData = JSON.stringify(data);
  writeFile(updatedData);
  res.status(400).json(data);
});

router.delete("/todos/:title", (req, res) => {
  const { title } = req.params;
  const newData = data.filter((obj) => obj.title !== title);
  const remData = JSON.stringify(newData);
  writeFile(remData);
  res.status(400).json(newData);
});

/* Login and register */

router.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "frontEnd", "/todo.html"));
});

router.post("/login", (req, res) => {
  const username = "arpit";
  const password = "12345";

  req.body.username === username && req.body.password === password
    ? res.status(200).send("success")
    : res.status(404).send("failed.");
});

router.post("/register", (req, res) => res.send("hi"));

router.get("/logout", (req, res) => {
  res.json({ msg: "bye!" });
});

app.use("/", router);

app.listen(PORT, () => console.log(`server listening at port ${PORT}`));