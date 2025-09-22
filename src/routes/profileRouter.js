const express = require("express")
const profileRouter = express.Router();
const {userAuth,userEditData} = require("../utils/user")


profileRouter.get("/profile/view", userAuth, (req, res) => {
  try {
    const user = req.user;
    res.status(200).send(user);
  } catch (error) {
    res.status(500).send("ERROR:" + error);
  }
});

profileRouter.patch("/profile/edit", userAuth , async (req, res) => {
  try {
    if(!userEditData(req)){
        throw new Error("Invalid edit request");
    }
    const loggedInUser = req.user;
    Object.keys(req.body).forEach(key => loggedInUser[key] = req.body[key])
    await loggedInUser.save()
    res.status(200).json({mess:"User updated sucessfull", data:loggedInUser})
  } catch (error) {
    console.log(error);
    res.status(500).send("internal server error");
  }
});

profileRouter.delete("/profile/remove", userAuth , async (req, res) => {
  try {
    const user = req.user;
    await user.deleteOne();
    res.status(200).json({mess:"User deleted sucessfully", data:user})
  } catch (error) {
    console.log(error);
    res.status(500).send("internal server error");
  }
});

module.exports = profileRouter