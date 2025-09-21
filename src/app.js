const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
const connectDB = require("./connection");
const User = require("./models/user-model");
const { default: mongoose, Error } = require("mongoose");
const { userValidator } = require("./utils/user");
const bcrypt = require("bcrypt")
const app = express();
app.use(express.json());

// getting single user
app.get("/user/:id", async (req, res) => {
  try {
    const userid = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(userid)) {
      res.status(400).send("Invalid user id");
    }

    const userData = await User.findOne({ _id: userid });

    if (!userData) {
      res.status(400).send("User doest not exist");
    } else {
      res.status(200).send(userData);
    }
  } catch (error) {
    console.log("error", error);
    res.status(500).send("internal server error");
  }
});

// added user
app.post("/user", async (req, res) => {
  try {
    const {error} = userValidator(req.body)
    if(error){
      return res.status(400).json({ error });
    }
    const {password} =  req.body;
    const passwordHash = await bcrypt.hash(password,10)
    const userData = new User({...req.body,password:passwordHash});
    await userData.save();
    res.status(200).send("User Added successfully");
  } catch (error) {
    if (error.name == "ValidationError") {
      const mess = Object.values(error.errors).map((err) => err.message);
      return res.status(400).json({ errors: mess });
    }
    res.status(500).send("Internall server error");
  }
});

//updated user
app.patch("/user/:id", async (req, res) => {
  try {
    const userId = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      res.status(400).send("Invalid user id");
    }
    const updatedUser = await User.findByIdAndUpdate(userId, req.body, {
      new: true,
      runValidators: true,
    });

    if (!updatedUser) {
      res.status(404).send("User not found");
    }else{
      res.status(200).send("User Updated ")
    }
  } catch (error) {
    console.log(error)
    res.status(500).send("internal server error")
  }
});

//delete user
app.delete("/user/:id", async (req, res) => {
  try {
    const userId = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      res.status(400).send("Invalid user id");
    }
    const deletedUser = await User.findByIdAndDelete(userId);
   
    if (!deletedUser) {
      res.status(404).send("User not found");
    }else{
      res.status(200).send("User Deleted ")
    }
  } catch (error) {
    console.log(error)
    res.status(500).send("internal server error")
  }
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
