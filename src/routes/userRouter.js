const express = require("express");
const userRouter = express.Router();
const { userAuth } = require("../utils/user");
const ConnectionRequestModel = require("../models/connection-request");
const { populate } = require("dotenv");

// to get the list of all pending connection request
userRouter.get("/user/request/received", userAuth, async (req, res) => {
  try {
    const loggedIn = req.user;
    const connectionRequests = await ConnectionRequestModel.find({
      toUserId: loggedIn._id,
      status: "intrested",
    }).populate("fromUserId", ["firstName", "lastName", "age", "photoUrl"]);

    res
      .status(200)
      .json({ mess: "Data fetched successfully", data: connectionRequests });
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal server error", error);
  }
});

// get all the accepted connection of the user
userRouter.get("/user/connection", userAuth, async(req,res) => {
 try {
    const loggedIn = req.user;
    const connections = await ConnectionRequestModel.find({
        $or:[
            {toUserId:loggedIn._id,status:"accepted"},
            {fromUserId:loggedIn._id,status:"accepted"}
        ]
    }).populate("fromUserId",["firstName", "lastName", "age", "photoUrl"])

    // we dont want to send the entire info of the request model so we just sent fromuserId data
    const data = connections.map(item => item.fromUserId)

    res.status(200).json({
        mess:"Data fetched successfully",
       data
    })
    
 } catch (error) {
     console.log(error)
     res.status(500).json({mess:"Internal server error" , err:error})
 }
});

module.exports = userRouter;
