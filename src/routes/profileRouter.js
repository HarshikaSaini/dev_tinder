const express = require("express");
const profileRouter = express.Router();
const { userAuth, userEditData } = require("../utils/user");
const bcrypt = require("bcrypt");

profileRouter.get("/profile/view", userAuth, (req, res) => {
  try {
    const user = req.user;
    res.status(200).send(user);
  } catch (error) {
    res.status(500).send("ERROR:" + error);
  }
});

profileRouter.patch("/profile/edit", userAuth, async (req, res) => {
  try {
    if (!userEditData(req)) {
      throw new Error("Invalid edit request");
    }
    const loggedInUser = req.user;
    Object.keys(req.body).forEach((key) => (loggedInUser[key] = req.body[key]));
    await loggedInUser.save();
    res
      .status(200)
      .json({ mess: "User updated sucessfull", data: loggedInUser });
  } catch (error) {
    console.log(error);
    res.status(500).send("internal server error");
  }
});

profileRouter.delete("/profile/remove", userAuth, async (req, res) => {
  try {
    const user = req.user;
    await user.deleteOne();
    res.status(200).json({ mess: "User deleted sucessfully", data: user });
  } catch (error) {
    console.log(error);
    res.status(500).send("internal server error");
  }
});

profileRouter.patch("/profile/forgot-password", userAuth, async (req, res) => {
  try {
    const { password, newPassword } = req.body;
    const user = req.user;
    const isValidPass = await user.validatePassword(password);
    
    if (!isValidPass) {
      throw new Error("Enter correct password");
    }
    else{
      const hashPassword = await bcrypt.hash(newPassword,10)
      await user.updateOne({password:hashPassword})
      res.status(200).send("Password changed successfully")
    }
  } catch (error) {
    console.log(error)
    res.status(500).send("Internal server error",error)
  }
});

module.exports = profileRouter;
