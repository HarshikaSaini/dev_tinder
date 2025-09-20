const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
const connectDB = require("./connection");
const User = require("./models/user-model");
const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  try {
    res.send("user data !!");
  } catch (error) {
    console.log("error", error);
  }
});

app.post("/user", async (req, res) => {
  const data = req.body;
  console.log(data);
  const user = new User(data);
  await user.save();
  res.status(200).send("user added successfully !!");
});

connectDB()
  .then(() => {
    console.log("Database connected successfully..");
    app.listen(8080, () => {
      console.log("server is listening on port 8080");
    });
  })
  .catch((err) => {
    console.log(err);
  });
