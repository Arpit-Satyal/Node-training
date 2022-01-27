/* external & internal packages */

const fs = require("fs");
const path = require("path");
const express = require("express");
const app = express();
const router = new express.Router();
const mapContent = require('./utils/map');
const { validateBody } = require('./utils/validator');
const { updateTodoSchema } = require('./utils/schema');

/* variables */

const PORT = process.env.PORT || 4200;
let data = JSON.parse(fs.readFileSync("data.json"));

/* middlewares */

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/", router);

/* error handling middleware */ 
app.use((err, req, res, next) => res.status(400).json({ msg: err }))

/* custom functions */ 

function writeToFile(data) {
  fs.writeFile("data.json", data, (err) => {
    if (err) throw err;
  });
}

/* CRUD API endpoints */

router.get("/todos", (req, res) => res.status(200).json(data));

router.post("/todos", validateBody(updateTodoSchema), (req, res) => {
  const { title, description, status } = req.body;
  data.push({ title, description, status });
  const newData = JSON.stringify(data);
  writeToFile(newData);
  res.status(200).json(data);
});

router.put("/todos/:title", (req, res) => {
  const { title } = req.params;
  data.forEach((obj) => {
    if (obj.title === title) {
     mapContent(req.body, obj)
    }
  });

  const updatedData = JSON.stringify(data);
  writeToFile(updatedData);
  res.status(200).json(data);
});

router.delete("/todos/:title", (req, res) => {
  const { title } = req.params;
  const newData = data.filter((obj) => obj.title !== title);
  const remData = JSON.stringify(newData);
  writeToFile(remData);
  res.status(400).json(newData);
});

/* Login and register endpoints */

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


app.listen(PORT, () => console.log(`server listening at port ${PORT}`));
