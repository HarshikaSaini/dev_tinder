const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors")
dotenv.config();
const connectDB = require("./connection");
const cookieParser = require("cookie-parser");
const authRouter = require("./routes/authRouter");
const profileRouter = require("./routes/profileRouter");
const connectionRouter = require("./routes/connectionRequestRouter");
const userRouter = require("./routes/userRouter");
const app = express();

const corsOptions={
  origin:"http://localhost:5173",
  credentials:true,
  optionsSuccessStatus: 200
}

app.use(express.json());
app.use(cookieParser());
app.use(cors(corsOptions))

app.use("/", authRouter);
app.use("/",profileRouter);
app.use("/",connectionRouter);
app.use("/",userRouter)


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
