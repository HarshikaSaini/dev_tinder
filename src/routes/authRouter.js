const express = require("express");
const authRouter = express.Router();
const {userValidator} = require("../utils/user");
const bcrypt = require("bcrypt");
const User = require("../models/user-model");

authRouter.post("/signup", async (req, res) => {
  try {
    const { error } = userValidator(req.body);
    if (error) {
      return res.status(400).json({ error });
    }
    const {
      firstName,
      lastName,
      age,
      email,
      contact,
      skills,
      photoUrl,
      password,
    } = req.body;
    const passwordHash = await bcrypt.hash(password, 10);
    const userData = new User({
      firstName,
      lastName,
      age,
      email,
      contact,
      skills,
      photoUrl,
      password: passwordHash,
    });
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

authRouter.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email });
    if (!user) {
      throw new Error("User does not exist");
    }
    const isValidPassword = await user.validatePassword(password);

    if (isValidPassword) {
      const token = await user.getJwt();
      res.cookie("token", token, {
        expires: new Date(Date.now() + 8 * 3600000),
      });
      res.send("Logged in successfully");
    } else {
      throw new Error("Please enter correct password");
    }
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal server error");
  }
});

authRouter.post("/logout", (req, res) => {
  res
    .cookie("token", null, { expires: new Date(Date.now()) })
    .status(200)
    .send("User logged out successfully !");
});


module.exports = authRouter;