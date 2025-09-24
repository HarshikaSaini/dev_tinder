const express = require("express");
const connectionRouter = express.Router();
const { userAuth } = require("../utils/user");
const ConnectionRequestModel = require("../models/connection-request");
const User = require("../models/user-model");


connectionRouter.post(
  "/request/:status/:toUserId",
  userAuth,
  async (req, res) => {
    try {
      const status = req.params.status;
      const toUserId = req.params.toUserId;
      const fromUserId = req.user._id;
    
      //check if user is in data base to whom we are sending request
      const toUser = await User.findById(toUserId);
      if (!toUser) {
        return res.status(404).json({ mess: "User not found" });
      }

      // check for the valid status as currently we are dealing with ignore and interest case
      const allowedStatus = ["ignore", "interested"];
      if (!allowedStatus.includes(status)) {
        return res.status(400).json({ mess: "Invalid Request" });
      }

      // check if users are not sending the reqest to each other again and again
      const existingUser = await ConnectionRequestModel.findOne({
        $or: [
          { fromUserId, toUserId },
          { fromUserId: toUserId, toUserId: fromUserId },
        ],
      });
      if (existingUser) {
        return res
          .status(400)
          .json({
            mess: `Connection request already sent to ${toUser.firstName}`,
          });
      }

      const connectionRequest = new ConnectionRequestModel({
        status,
        fromUserId,
        toUserId,
      });
      await connectionRequest.save();
      res
        .status(200)
        .json({ mess: "Connection Request sent successfully", data: toUser });
    } catch (error) {
      console.log(error);
      res.status(500), send("Internal server error", error);
    }
  }
);

module.exports = connectionRouter;