const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
const connectDB = require("./connection");
const cookieParser = require("cookie-parser");
const authRouter = require("./routes/authRouter");
const profileRouter = require("./routes/profileRouter");
const connectionRouter = require("./routes/connectionRequestRouter");
const app = express();

app.use(express.json());
app.use(cookieParser());

app.use("/", authRouter);
app.use("/",profileRouter);
app.use("/",connectionRouter);



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
